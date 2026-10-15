import type { NewsRepository } from "./types";
import type { NewsArticle, NewsFeedQuery, NewsFeedResult, NewsSource, NewsCategory } from "../domain/types";
import { DEMO_ARTICLES, NEWS_CATEGORIES, NEWS_SOURCES } from "../data/demo";
import { matchesGeo, matchesText, dedupeByHash } from "../service/filters";

export class InMemoryNewsRepository implements NewsRepository {
  private articles: NewsArticle[];

  constructor(articles: NewsArticle[] = DEMO_ARTICLES) {
    this.articles = dedupeByHash(articles);
  }

  async getFeed(query: NewsFeedQuery): Promise<NewsFeedResult> {
    let items = [...this.articles];

    if (query.scope && query.scope !== "all") {
      items = items.filter((a) => a.geo.scope === query.scope);
    }

    items = items.filter((a) =>
      matchesGeo(a, {
        localityId: query.localityId,
        regionId: query.regionId,
        scope: query.scope,
      })
    );

    if (query.categoryId && query.categoryId !== "all") {
      items = items.filter((a) => a.categoryId === query.categoryId);
    }

    if (query.query?.trim()) {
      items = items.filter((a) => matchesText(a, query.query!));
    }

    if (query.from) {
      items = items.filter((a) => a.publishedAt >= query.from!);
    }
    if (query.to) {
      items = items.filter((a) => a.publishedAt <= query.to!);
    }

    items.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

    const total = items.length;
    const offset = query.offset ?? 0;
    const limit = query.limit ?? 20;
    const page = items.slice(offset, offset + limit);

    return {
      items: page,
      total,
      isDemo: page.every((a) => a.isDemo) || page.length === 0,
    };
  }

  async getById(id: string): Promise<NewsArticle | null> {
    return this.articles.find((a) => a.id === id) ?? null;
  }

  async getSources(): Promise<NewsSource[]> {
    return [...NEWS_SOURCES];
  }

  async getCategories(): Promise<NewsCategory[]> {
    return [...NEWS_CATEGORIES];
  }
}
