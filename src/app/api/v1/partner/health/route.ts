import { NextRequest, NextResponse } from "next/server";
import { assertPartnerAccess } from "@/partner/auth";

export async function GET(req: NextRequest) {
  const denied = assertPartnerAccess(req);
  if (denied) return denied;
  return NextResponse.json({
    ok: true,
    surface: "partner",
    version: "1.0",
    readOnly: true,
  });
}
