import { NextRequest, NextResponse } from "next/server";
import { runMigrations } from "@/db/migrate";
import { isDatabaseConfigured } from "@/db/config";

/**
 * POST /api/v1/admin/db/migrate
 * Authorization: Bearer <MIGRATE_SECRET>
 * Applies schema.sql statements idempotently.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.MIGRATE_SECRET?.trim();
  if (!secret || secret.length < 8) {
    return NextResponse.json(
      { error: "MIGRATE_SECRET not configured on server" },
      { status: 503 }
    );
  }

  const auth = req.headers.get("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7).trim() : "";
  if (token !== secret) {
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json(
      { error: "DATABASE_URL not set" },
      { status: 503 }
    );
  }

  try {
    const result = await runMigrations();
    if (!result.ok) {
      return NextResponse.json(result, { status: 500 });
    }
    return NextResponse.json(result);
  } catch (e) {
    const message = e instanceof Error ? e.message : "migrate failed";
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
