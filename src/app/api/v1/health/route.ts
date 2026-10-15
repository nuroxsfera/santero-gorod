import { NextResponse } from "next/server";

/** Liveness — no secrets, no paid deps. */
export async function GET() {
  return NextResponse.json({
    ok: true,
    service: "santero-gorod",
    version: "0.1.0",
    mode: "api-v1",
    data: "demo",
    note: "Responses may still use isDemo payloads until real stores and sources are connected.",
  });
}
