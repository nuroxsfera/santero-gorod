import { NextResponse } from "next/server";
import { isDatabaseConfigured } from "@/db/config";

/** Liveness + dependency status */
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
    horizon: 6,
    mode: "api-v1",
    database: db,
    auth: {
      mode: "guest",
      note: "OAuth deferred until owner secrets (see docs/backend/OAUTH.md)",
    },
    news: {
      liveRss: true,
      clientViaApi: true,
    },
    partner: {
      readOnly: true,
      docs: "/docs/api/PARTNER.md",
    },
    dataFallback: isDatabaseConfigured() ? "postgres-when-up" : "in-memory",
  });
}
