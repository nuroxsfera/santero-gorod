import { NextResponse } from "next/server";
import { parseRssMinimal } from "@/news/ingestion/parseRssMinimal";

/**
 * Optional metadata-only RSS preview.
 * Disabled unless ENABLE_RSS_PREVIEW=1 (set in Vercel by owner).
 * Does NOT merge into public feed. Does NOT store full article body.
 */
const ALLOWED: Record<
  string,
  { feedUrl: string; fallbackName: string; note: string }
> = {
  toggazeta: {
    feedUrl: "https://toggazeta.ru/rss",
    fallbackName: "Тогучинская газета",
    note: "Local district outlet. Not a Santero partner. Metadata only pending legal OK.",
  },
};

export async function GET(req: Request) {
  if (process.env.ENABLE_RSS_PREVIEW !== "1") {
    return NextResponse.json(
      {
        error: "PREVIEW_DISABLED",
        message:
          "RSS preview is off. Owner must set ENABLE_RSS_PREVIEW=1 after accepting source terms.",
      },
      { status: 403 }
    );
  }

  const url = new URL(req.url);
  const key = url.searchParams.get("source") || "toggazeta";
  const conf = ALLOWED[key];
  if (!conf) {
    return NextResponse.json(
      { error: "UNKNOWN_SOURCE", allowed: Object.keys(ALLOWED) },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(conf.feedUrl, {
      headers: { "User-Agent": "SanteroGorodRSSPreview/0.1 (+metadata-only)" },
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: "FETCH_FAILED", status: res.status },
        { status: 502 }
      );
    }
    const xml = await res.text();
    const parsed = parseRssMinimal(xml, conf.fallbackName);
    const limit = Math.min(
      20,
      Math.max(1, Number(url.searchParams.get("limit") || 10))
    );

    return NextResponse.json({
      sourceKey: key,
      attribution: conf.fallbackName,
      note: conf.note,
      isDemo: false,
      storesFullText: false,
      channel: {
        sourceName: parsed.sourceName,
        homeUrl: parsed.homeUrl,
      },
      items: parsed.items.slice(0, limit).map((it) => ({
        title: it.title,
        originalUrl: it.originalUrl,
        publishedAt: it.publishedAt,
        sourceName: it.sourceName,
      })),
    });
  } catch {
    return NextResponse.json({ error: "PREVIEW_FAILED" }, { status: 500 });
  }
}
