import type { NewsArticle, NewsScope } from "../domain/types";

export function dedupeByHash(articles: NewsArticle[]): NewsArticle[] {
  const seen = new Set<string>();
  const out: NewsArticle[] = [];
  for (const a of articles) {
    if (seen.has(a.contentHash)) continue;
    seen.add(a.contentHash);
    out.push(a);
  }
  return out;
}

export function matchesText(article: NewsArticle, q: string): boolean {
  const n = q.toLowerCase().trim();
  if (!n) return true;
  return (
    article.title.toLowerCase().includes(n) ||
    article.summary.toLowerCase().includes(n) ||
    article.body.toLowerCase().includes(n)
  );
}

/**
 * Feed rules:
 * - locality feed: articles for this locality + region of city + federal
 * - explicit scope=locality|region|federal: strict
 * - no geo filter: all
 */
export function matchesGeo(
  article: NewsArticle,
  opts: {
    localityId?: string | null;
    regionId?: string | null;
    scope?: NewsScope | "all";
  }
): boolean {
  if (opts.scope && opts.scope !== "all") {
    if (article.geo.scope !== opts.scope) return false;
    if (opts.scope === "locality" && opts.localityId) {
      return article.geo.localityId === opts.localityId;
    }
    if (opts.scope === "region" && opts.regionId) {
      return article.geo.regionId === opts.regionId;
    }
    if (opts.scope === "federal") return article.geo.scope === "federal";
    return true;
  }

  if (opts.localityId || opts.regionId) {
    if (article.geo.scope === "federal") return true;
    if (
      opts.localityId &&
      article.geo.localityId &&
      article.geo.localityId === opts.localityId
    ) {
      return true;
    }
    if (
      opts.regionId &&
      article.geo.regionId &&
      article.geo.regionId === opts.regionId
    ) {
      return true;
    }
    return false;
  }

  return true;
}
