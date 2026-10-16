import { NextRequest, NextResponse } from "next/server";
import { assertPartnerAccess } from "@/partner/auth";

/** Partner news: reuses public feed contract shape */
export async function GET(req: NextRequest) {
  const denied = assertPartnerAccess(req);
  if (denied) return denied;
  const localityId = req.nextUrl.searchParams.get("localityId") || "";
  const limit = req.nextUrl.searchParams.get("limit") || "20";
  const origin = req.nextUrl.origin;
  try {
    const res = await fetch(
      `${origin}/api/v1/news/feed?localityId=${encodeURIComponent(localityId)}&limit=${limit}`,
      { signal: AbortSignal.timeout(15000) }
    );
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "NEWS_PROXY_FAILED" }, { status: 502 });
  }
}
