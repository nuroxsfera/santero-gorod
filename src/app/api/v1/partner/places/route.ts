import { NextRequest, NextResponse } from "next/server";
import { assertPartnerAccess } from "@/partner/auth";
import { getPlaceService } from "@/places";

export async function GET(req: NextRequest) {
  const denied = assertPartnerAccess(req);
  if (denied) return denied;
  const localityId = req.nextUrl.searchParams.get("localityId");
  const limit = Math.min(100, Number(req.nextUrl.searchParams.get("limit") || 30) || 30);
  const result = await getPlaceService().search({
    localityId: localityId || undefined,
    limit,
  });
  return NextResponse.json({
    items: result.items.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      localityId: p.localityId,
      lat: p.geo.lat,
      lon: p.geo.lon,
      isDemo: p.isDemo,
      source: p.source,
    })),
    total: result.total,
    isDemo: result.isDemo,
  });
}
