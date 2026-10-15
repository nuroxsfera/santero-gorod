import type { NewsRepository } from "./types";
import type {
  NewsArticle,
  NewsCategory,
  NewsFeedQuery,
  NewsFeedResult,
  NewsSource,
} from "../domain/types";
import { InMemoryNewsRepository } from "./InMemoryNewsRepository";
import { fetchLiveRssArticles } from "../ingestion/fetchRssMeta";
import { matchesGeo, matchesText, dedupeByHash } from "../service/filters";

/**
 * Server-side: demo articles + live RSS metadata (title/link/date).
 * Client-side should keep using InMemory; API routes use this hybrid.
 */
export class HybridNewsRepository implements NewsRepository {
  private memory = new InMemoryNewsRepository();
  private liveCache: { at: number; items: NewsArticle[] } | null = null;
  private readonly ttlMs = 5 * 60 * 1000;

  private async liveArticles(): Promise<NewsArticle[]> {
    const now = Date.now();
    if (this.liveCache && now - this.liveCache.at < this.ttlMs) {
      return this.liveCache.items;
    }
    const items = await fetchLiveRssArticles(25);
    this.liveCache = { at: now, items };
    return items;
  }

  async getFeed(query: NewsFeedQuery): Promise<NewsFeedResult> {
    const demo = await this.memory.getFeed({ ...query, limit: 100, offset: 0 });
    let live = await this.liveArticles();

    live = live.filter((a) =>
      matchesGeo(a, {
        localityId: query.localityId,
        regionId: query.regionId,
        scope: query.scope,
        feedMode: query.feedMode,
      })
    );
    if (query.categoryId && query.categoryId !== "all") {
      live = live.filter((a) => a.categoryId === query.categoryId);
    }
    if (query.query?.trim()) {
      live = live.filter((a) => matchesText(a, query.query!));
    }

    const merged = dedupeByHash([...live, ...demo.items]);
    merged.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

    const total = merged.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;
    const page = merged.slice(offset, offset + limit);
    const hasLive = page.some((a) => !a.isDemo);

    return {
      items: page,
      total,
      isDemo: !hasLive && page.every((a) => a.isDemo),
    };
  }

  async getById(id: string): Promise<NewsArticle | null> {
    const fromMem = await this.memory.getById(id);
    if (fromMem) return fromMem;
    const live = await this.liveArticles();
    return live.find((a) => a.id === id) ?? null;
  }

  async getSources(): Promise<NewsSource[]> {
    const base = await this.memory.getSources();
    return [
      ...base,
      {
        id: "toggazeta",
        name: "Тогучинская газета",
        url: "https://toggazeta.ru/",
        isDemo: false,
      },
    ];
  }

  async getCategories(): Promise<NewsCategory[]> {
    return this.memory.getCategories();
  }
}
