import { NextRequest, NextResponse } from "next/server";

/**
 * Optional partner key. If PARTNER_API_KEY unset — open read (prototype).
 */
export function assertPartnerAccess(req: NextRequest): NextResponse | null {
  const expected = process.env.PARTNER_API_KEY?.trim();
  if (!expected) return null;
  const got = req.headers.get("x-partner-key")?.trim();
  if (got !== expected) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }
  return null;
}
