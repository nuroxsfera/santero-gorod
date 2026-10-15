import { NextRequest, NextResponse } from "next/server";
import { getAlertService } from "@/alerts";
import type { AlertStatus } from "@/alerts";

/** GET /api/v1/alerts — demo skeleton only */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const status = sp.get("status") as AlertStatus | "all" | null;
    const result = await getAlertService().list({
      localityId: sp.get("localityId") || null,
      regionId: sp.get("regionId") || null,
      status: status || "all",
      limit: Math.min(50, Number(sp.get("limit") || 20) || 20),
      offset: Number(sp.get("offset") || 0) || 0,
    });
    return NextResponse.json({
      ...result,
      source: "server",
      warning:
        "Demo alerts only. Not official. Do not treat as real disruptions.",
    });
  } catch {
    return NextResponse.json({ error: "ALERTS_FAILED" }, { status: 500 });
  }
}
