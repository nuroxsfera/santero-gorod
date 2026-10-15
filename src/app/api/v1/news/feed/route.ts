import { NextRequest, NextResponse } from "next/server";
import { HybridNewsRepository } from "@/news/repository/HybridNewsRepository";
import type { NewsCategoryId } from "@/news";

const repo = new HybridNewsRepository();

/** GET /api/v1/news/feed — demo + live RSS metadata when sources respond */
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

    const result = await repo.getFeed({
      localityId: sp.get("localityId"),
      regionId: sp.get("regionId"),
      feedMode: feedMode ?? "all",
      categoryId:
        categoryId && categoryId !== "all"
          ? (categoryId as NewsCategoryId)
          : "all",
      query: sp.get("query") || undefined,
      limit: Math.min(50, Number(sp.get("limit") || 20) || 20),
      offset: Number(sp.get("offset") || 0) || 0,
    });

    const liveCount = result.items.filter((a) => !a.isDemo).length;

    return NextResponse.json({
      ...result,
      source: "server",
      liveCount,
      note:
        liveCount > 0
          ? "Feed includes live RSS metadata (title, link, date). Full text stays at source."
          : "Live RSS unavailable or empty; demo items may still appear.",
    });
  } catch {
    return NextResponse.json({ error: "NEWS_FEED_FAILED" }, { status: 500 });
  }
}
