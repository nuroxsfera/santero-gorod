import { NextRequest, NextResponse } from "next/server";
import { HybridNewsRepository } from "@/news/repository/HybridNewsRepository";
import type { NewsCategoryId } from "@/news";
import { isDatabaseConfigured } from "@/db";

const hybrid = new HybridNewsRepository();

/** GET /api/v1/news/feed — hybrid live+demo; optional persist to Postgres */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const categoryId = sp.get("categoryId");
    const feedMode = sp.get("feedMode") as
      | "city"
      | "region"
      | "federal"
      | "all"
      | null;

    const query = {
      localityId: sp.get("localityId"),
      regionId: sp.get("regionId"),
      feedMode: feedMode ?? ("all" as const),
      categoryId:
        categoryId && categoryId !== "all"
          ? (categoryId as NewsCategoryId)
          : ("all" as const),
      query: sp.get("query") || undefined,
      limit: Math.min(50, Number(sp.get("limit") || 20) || 20),
      offset: Number(sp.get("offset") || 0) || 0,
    };

    const result = await hybrid.getFeed(query);
    const liveCount = result.items.filter((a) => !a.isDemo).length;

    let persisted = 0;
    if (isDatabaseConfigured() && liveCount > 0) {
      try {
        const { PostgresNewsRepository } = await import(
          "@/news/repository/PostgresNewsRepository"
        );
        const pg = new PostgresNewsRepository();
        const liveOnly = result.items.filter((a) => !a.isDemo);
        persisted = await pg.upsertMany(liveOnly);
      } catch {
        /* DB optional */
      }
    }

    return NextResponse.json({
      ...result,
      source: "server",
      liveCount,
      persisted,
      postgres: isDatabaseConfigured(),
      note:
        liveCount > 0
          ? "Feed includes live RSS metadata (title, link, date). Full text at source."
          : "Live RSS empty or unreachable; demo items may appear.",
    });
  } catch {
    return NextResponse.json({ error: "NEWS_FEED_FAILED" }, { status: 500 });
  }
}
