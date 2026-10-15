import { NextRequest, NextResponse } from "next/server";
import { getTransportService } from "@/transport";
import type { TransportMode } from "@/transport";

/** GET /api/v1/transport — demo stops/routes, no realtime */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const mode = sp.get("mode");
    const result = await getTransportService().catalog({
      localityId: sp.get("localityId") || null,
      mode:
        mode && mode !== "all"
          ? (mode as TransportMode)
          : mode === "all"
            ? "all"
            : undefined,
      query: sp.get("query") || undefined,
      limit: Math.min(50, Number(sp.get("limit") || 30) || 30),
    });
    return NextResponse.json({
      ...result,
      source: "server",
      warning:
        "Demo transport reference only. No live arrivals or official GTFS.",
    });
  } catch {
    return NextResponse.json({ error: "TRANSPORT_FAILED" }, { status: 500 });
  }
}
