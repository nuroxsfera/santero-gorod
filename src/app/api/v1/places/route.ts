import { NextRequest, NextResponse } from "next/server";
import { getPlaceService } from "@/places";
import type { PlaceCategory } from "@/places";

/** GET /api/v1/places — pilot demo POI list */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const category = sp.get("category");
    const result = await getPlaceService().search({
      localityId: sp.get("localityId") || null,
      regionId: sp.get("regionId") || null,
      category:
        category && category !== "all"
          ? (category as PlaceCategory)
          : category === "all"
            ? "all"
            : undefined,
      query: sp.get("query") || undefined,
      limit: Math.min(50, Number(sp.get("limit") || 30) || 30),
      offset: Number(sp.get("offset") || 0) || 0,
    });
    return NextResponse.json({
      ...result,
      source: "server",
      warning: result.isDemo
        ? "Demo places only. Not a live POI catalog."
        : undefined,
    });
  } catch {
    return NextResponse.json({ error: "PLACES_FAILED" }, { status: 500 });
  }
}
