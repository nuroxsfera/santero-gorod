import { NextResponse } from "next/server";
import { probeDatabase, isDatabaseConfigured } from "@/db";

/** Liveness + H1 dependency status */
export async function GET() {
  const db = await probeDatabase();

  return NextResponse.json({
    ok: true,
    service: "santero-gorod",
    version: "0.1.0",
    horizon: 1,
    mode: "api-v1",
    database: {
      configured: db.configured,
      connected: db.connected,
      message: db.message,
      latencyMs: "latencyMs" in db ? db.latencyMs : undefined,
    },
    auth: {
      mode: "guest",
      note: "Anonymous guest session only in H1. Accounts deferred to H3.",
    },
    news: {
      liveRss: true,
      note: "Metadata-only RSS (title/link/date) merged in /api/v1/news/feed",
    },
    dataFallback: isDatabaseConfigured() ? "postgres-when-up" : "in-memory",
  });
}
