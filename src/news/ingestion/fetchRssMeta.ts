import { parseRssMinimal, type RssMetaItem } from "./parseRssMinimal";
import type { NewsArticle } from "../domain/types";
import { createHash } from "crypto";

/** Allowed public RSS endpoints for Horizon 1 live metadata (title+link+date only). */
export const LIVE_RSS_SOURCES = [
  {
    id: "toggazeta",
    name: "Тогучинская газета",
    feedUrl: "https://toggazeta.ru/feed/",
    homeUrl: "https://toggazeta.ru/",
  },
] as const;

function hashContent(title: string, url: string): string {
  return createHash("sha256").update(`${title}|${url}`).digest("hex").slice(0, 32);
}

export function rssItemToArticle(
  item: RssMetaItem,
  sourceId: string
): NewsArticle {
  const publishedAt = item.publishedAt ?? new Date().toISOString();
  const contentHash = hashContent(item.title, item.originalUrl);
  return {
    id: `rss-${sourceId}-${contentHash}`,
    title: item.title,
    summary: "Краткое описание на стороне источника. Откройте оригинал по ссылке.",
    body: "Полный текст хранится у источника. В Santero — только заголовок, ссылка и дата (metadata).",
    categoryId: "other",
    sourceId,
    sourceName: item.sourceName,
    sourceUrl: null,
    originalUrl: item.originalUrl,
    publishedAt,
    imageUrl: null,
    geo: {
      scope: "federal",
      localityId: null,
      localityName: null,
      regionId: null,
      regionName: null,
      countryCode: "RU",
    },
    contentHash,
    isDemo: false,
  };
}

export async function fetchLiveRssArticles(limit = 20): Promise<NewsArticle[]> {
  const out: NewsArticle[] = [];
  for (const src of LIVE_RSS_SOURCES) {
    try {
      const res = await fetch(src.feedUrl, {
        headers: {
          Accept: "application/rss+xml, application/xml, text/xml, */*",
          "User-Agent": "SanteroGorod/0.1 (+https://github.com/nuroxsfera/santero-gorod)",
        },
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const channel = parseRssMinimal(xml, src.name);
      for (const item of channel.items.slice(0, limit)) {
        out.push(rssItemToArticle(item, src.id));
      }
    } catch {
      /* skip failed source */
    }
  }
  return out;
}
