import { NextRequest, NextResponse } from "next/server";
import { getModerationService } from "@/moderation";
import type { ModerationStatus } from "@/moderation";

/** GET /api/v1/moderation — demo queue only, no public admin UI */
export async function GET(req: NextRequest) {
  try {
    const status = req.nextUrl.searchParams.get("status") as
      | ModerationStatus
      | "all"
      | null;
    const result = await getModerationService().list({
      status: status || "all",
      limit: Math.min(50, Number(req.nextUrl.searchParams.get("limit") || 20) || 20),
    });
    return NextResponse.json({
      ...result,
      warning: "Demo moderation queue. Not a production admin panel.",
    });
  } catch {
    return NextResponse.json({ error: "MODERATION_FAILED" }, { status: 500 });
  }
}
