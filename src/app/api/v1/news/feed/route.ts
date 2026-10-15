import { NextRequest, NextResponse } from "next/server";
import { getNewsService } from "@/news";
import type { NewsCategoryId, NewsFeedQuery } from "@/news";

/**
 * GET /api/v1/news/feed
 * Query: localityId, regionId, feedMode, categoryId, query, limit, offset
 * Currently serves demo articles via NewsService (isDemo: true).
 */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const query: NewsFeedQuery = {
      localityId: sp.get("localityId") || null,
      regionId: sp.get("regionId") || null,
      feedMode: parseFeedMode(sp.get("feedMode")),
      categoryId: parseCategory(sp.get("categoryId")),
      query: sp.get("query") || undefined,
      limit: parseIntParam(sp.get("limit"), 30),
      offset: parseIntParam(sp.get("offset"), 0),
    };

    const result = await getNewsService().getFeed(query);
    return NextResponse.json({
      ...result,
      source: "server",
      warning: result.isDemo
        ? "Demo content only. Not a live news feed."
        : undefined,
    });
  } catch (e) {
    console.error("[api/v1/news/feed]", e);
    return NextResponse.json(
      { error: "FEED_FAILED", message: "Could not load news feed" },
      { status: 500 }
    );
  }
}

function parseFeedMode(
  v: string | null
): NewsFeedQuery["feedMode"] | undefined {
  if (v === "city" || v === "region" || v === "federal" || v === "all") return v;
  return undefined;
}

function parseCategory(v: string | null): NewsCategoryId | "all" | undefined {
  if (!v || v === "all") return v === "all" ? "all" : undefined;
  return v as NewsCategoryId;
}

function parseIntParam(v: string | null, fallback: number): number {
  if (v == null || v === "") return fallback;
  const n = Number.parseInt(v, 10);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}
