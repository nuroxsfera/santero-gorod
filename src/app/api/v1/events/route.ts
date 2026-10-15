import { NextRequest, NextResponse } from "next/server";
import { getEventService } from "@/events";
import type { EventCategory } from "@/events";

/** GET /api/v1/events — demo skeleton, not a real afisha */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const category = sp.get("category");
    const result = await getEventService().list({
      localityId: sp.get("localityId") || null,
      regionId: sp.get("regionId") || null,
      category:
        category && category !== "all"
          ? (category as EventCategory)
          : category === "all"
            ? "all"
            : undefined,
      limit: Math.min(50, Number(sp.get("limit") || 20) || 20),
      offset: Number(sp.get("offset") || 0) || 0,
    });
    return NextResponse.json({
      ...result,
      source: "server",
      warning: "Demo events only. Not a live calendar or ticket sales.",
    });
  } catch {
    return NextResponse.json({ error: "EVENTS_FAILED" }, { status: 500 });
  }
}
