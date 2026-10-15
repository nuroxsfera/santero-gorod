import { NextRequest, NextResponse } from "next/server";
import { getNewsService } from "@/news";

/** GET /api/v1/news/:id — article by id (demo store until real DB). */
export async function GET(
  _req: NextRequest,
  ctx: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await ctx.params;
    const article = await getNewsService().getArticle(id);
    if (!article) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json({
      article,
      source: "server",
      warning: article.isDemo
        ? "Demo content only. Not a live news article."
        : undefined,
    });
  } catch (e) {
    console.error("[api/v1/news/id]", e);
    return NextResponse.json(
      { error: "ARTICLE_FAILED" },
      { status: 500 }
    );
  }
}
