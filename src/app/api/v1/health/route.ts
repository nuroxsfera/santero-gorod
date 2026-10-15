import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db/config";

/** Liveness + H1/H2 dependency status (probe only when configured) */
export async function GET() {
  let db: {
    configured: boolean;
    connected: boolean;
    message: string;
    latencyMs?: number;
  } = {
    configured: false,
    connected: false,
    message: "DATABASE_URL not set — using in-memory stores",
  };

  if (isDatabaseConfigured()) {
    try {
      const { probeDatabase } = await import("@/db/status");
      db = await probeDatabase();
    } catch (e) {
      db = {
        configured: true,
        connected: false,
        message: e instanceof Error ? e.message : "probe failed",
      };
    }
  }

  return NextResponse.json({
    ok: true,
    service: "santero-gorod",
    version: "0.1.0",
    horizon: 2,
    mode: "api-v1",
    database: db,
    auth: {
      mode: "guest",
      note: "Anonymous guest session only in H1/H2. Accounts deferred to H3.",
    },
    news: {
      liveRss: true,
      clientViaApi: true,
      note: "Metadata-only RSS merged in /api/v1/news/feed; UI uses API",
    },
    dataFallback: isDatabaseConfigured() ? "postgres-when-up" : "in-memory",
  });
}
