import type { NewsRepository } from "./types";
import type {
  NewsArticle,
  NewsCategory,
  NewsFeedQuery,
  NewsFeedResult,
  NewsSource,
} from "../domain/types";

/**
 * HTTP client for /api/v1/news/*
 * Optional path — UI still defaults to InMemory until explicitly switched.
 */
export class HttpNewsRepository implements NewsRepository {
  constructor(private readonly baseUrl: string = "") {}

  async getFeed(query: NewsFeedQuery): Promise<NewsFeedResult> {
    const sp = new URLSearchParams();
    if (query.localityId) sp.set("localityId", query.localityId);
    if (query.regionId) sp.set("regionId", query.regionId);
    if (query.feedMode) sp.set("feedMode", query.feedMode);
    if (query.categoryId) sp.set("categoryId", query.categoryId);
    if (query.query) sp.set("query", query.query);
    if (query.limit != null) sp.set("limit", String(query.limit));
    if (query.offset != null) sp.set("offset", String(query.offset));

    const res = await fetch(`${this.baseUrl}/api/v1/news/feed?${sp}`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`news feed HTTP ${res.status}`);
    const data = (await res.json()) as NewsFeedResult;
    return {
      items: data.items ?? [],
      total: data.total ?? 0,
      isDemo: data.isDemo ?? true,
    };
  }

  async getById(id: string): Promise<NewsArticle | null> {
    const res = await fetch(`${this.baseUrl}/api/v1/news/${encodeURIComponent(id)}`, {
      cache: "no-store",
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`news article HTTP ${res.status}`);
    const data = (await res.json()) as { article: NewsArticle };
    return data.article ?? null;
  }

  async getSources(): Promise<NewsSource[]> {
    return [];
  }

  async getCategories(): Promise<NewsCategory[]> {
    return [];
  }
}
