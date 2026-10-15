import type { NewsArticle, NewsFeedQuery, NewsFeedResult } from "../domain/types";

/**
 * Client → server hybrid feed (demo + live RSS metadata).
 */
export async function fetchNewsFeedFromApi(
  query: NewsFeedQuery
): Promise<NewsFeedResult & { liveCount?: number }> {
  const sp = new URLSearchParams();
  if (query.localityId) sp.set("localityId", query.localityId);
  if (query.regionId) sp.set("regionId", query.regionId);
  if (query.feedMode) sp.set("feedMode", query.feedMode);
  if (query.categoryId) sp.set("categoryId", String(query.categoryId));
  if (query.query) sp.set("query", query.query);
  if (query.limit != null) sp.set("limit", String(query.limit));
  if (query.offset != null) sp.set("offset", String(query.offset));

  const res = await fetch(`/api/v1/news/feed?${sp.toString()}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`NEWS_HTTP_${res.status}`);
  }
  const data = (await res.json()) as NewsFeedResult & {
    liveCount?: number;
    items: NewsArticle[];
  };
  return data;
}
