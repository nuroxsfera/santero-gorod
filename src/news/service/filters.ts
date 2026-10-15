import type { NewsArticle, NewsScope } from "../domain/types";

export type FeedMode = "city" | "region" | "federal" | "all";

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
 * City feed: this locality + same region + federal.
 * Region feed: region-scoped + localities in region (no federal).
 * Federal feed: only federal.
 */
export function matchesGeo(
  article: NewsArticle,
  opts: {
    localityId?: string | null;
    regionId?: string | null;
    scope?: NewsScope | "all";
    feedMode?: FeedMode;
  }
): boolean {
  const mode =
    opts.feedMode ??
    (opts.scope && opts.scope !== "all" ? (opts.scope as FeedMode) : undefined);

  if (mode === "federal") {
    return article.geo.scope === "federal";
  }

  if (mode === "region") {
    if (!opts.regionId) return false;
    if (article.geo.scope === "federal") return false;
    return article.geo.regionId === opts.regionId;
  }

  if (mode === "city") {
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

  if (opts.scope && opts.scope !== "all") {
    if (article.geo.scope !== opts.scope) return false;
    if (opts.scope === "locality" && opts.localityId) {
      return article.geo.localityId === opts.localityId;
    }
    if (opts.scope === "region" && opts.regionId) {
      return article.geo.regionId === opts.regionId;
    }
    if (opts.scope === "federal") return true;
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
