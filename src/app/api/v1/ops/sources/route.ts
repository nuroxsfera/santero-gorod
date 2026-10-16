import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db/config";

type SourceStatus = {
  id: string;
  label: string;
  ok: boolean;
  detail: string;
  latencyMs?: number;
};

async function checkRss(url: string): Promise<{ ok: boolean; ms: number; detail: string }> {
  const t0 = Date.now();
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(6000),
      headers: { "User-Agent": "SanteroGorod-SLA/1.0" },
    });
    return {
      ok: res.ok,
      ms: Date.now() - t0,
      detail: `HTTP ${res.status}`,
    };
  } catch (e) {
    return {
      ok: false,
      ms: Date.now() - t0,
      detail: e instanceof Error ? e.message : "fail",
    };
  }
}

/** SLA dashboard data — honest source probes */
export async function GET() {
  const sources: SourceStatus[] = [];

  const rssA = await checkRss("https://toggazeta.ru/feed/");
  sources.push({
    id: "rss-toggazeta",
    label: "RSS toggazeta",
    ok: rssA.ok,
    detail: rssA.detail,
    latencyMs: rssA.ms,
  });

  const rssB = await checkRss("https://lenta.ru/rss/news");
  sources.push({
    id: "rss-lenta",
    label: "RSS Lenta.ru",
    ok: rssB.ok,
    detail: rssB.detail,
    latencyMs: rssB.ms,
  });

  let weatherOk = false;
  let weatherDetail = "";
  let weatherMs = 0;
  try {
    const t0 = Date.now();
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=55.03&longitude=82.92&current=temperature_2m",
      { signal: AbortSignal.timeout(6000) }
    );
    weatherMs = Date.now() - t0;
    weatherOk = res.ok;
    weatherDetail = `HTTP ${res.status}`;
  } catch (e) {
    weatherDetail = e instanceof Error ? e.message : "fail";
  }
  sources.push({
    id: "open-meteo",
    label: "Open-Meteo",
    ok: weatherOk,
    detail: weatherDetail,
    latencyMs: weatherMs,
  });

  let db: SourceStatus = {
    id: "postgres",
    label: "Postgres / Neon",
    ok: false,
    detail: "DATABASE_URL not set",
  };
  if (isDatabaseConfigured()) {
    try {
      const { probeDatabase } = await import("@/db/status");
      const p = await probeDatabase();
      const latency =
        "latencyMs" in p && typeof (p as { latencyMs?: number }).latencyMs === "number"
          ? (p as { latencyMs: number }).latencyMs
          : undefined;
      db = {
        id: "postgres",
        label: "Postgres / Neon",
        ok: p.connected,
        detail: p.message,
        latencyMs: latency,
      };
    } catch (e) {
      db = {
        id: "postgres",
        label: "Postgres / Neon",
        ok: false,
        detail: e instanceof Error ? e.message : "probe failed",
      };
    }
  }
  sources.push(db);

  const allCriticalOk = sources.filter((s) => s.id !== "postgres").every((s) => s.ok);

  return NextResponse.json({
    ok: allCriticalOk,
    checkedAt: new Date().toISOString(),
    sources,
    note: "Best-effort probes. Postgres optional.",
  });
}
