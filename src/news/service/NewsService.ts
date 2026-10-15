import type { NewsRepository } from "../repository/types";
import type { NewsArticle, NewsFeedQuery, NewsFeedResult, NewsCategory } from "../domain/types";
import { InMemoryNewsRepository } from "../repository/InMemoryNewsRepository";

export class NewsService {
  constructor(private readonly repo: NewsRepository) {}

  getFeed(query: NewsFeedQuery): Promise<NewsFeedResult> {
    return this.repo.getFeed(query);
  }

  getArticle(id: string): Promise<NewsArticle | null> {
    return this.repo.getById(id);
  }

  getCategories(): Promise<NewsCategory[]> {
    return this.repo.getCategories();
  }

  /** City home feed: locality + region + federal */
  getCityFeed(params: {
    localityId: string | null;
    regionId: string | null;
    categoryId?: NewsFeedQuery["categoryId"];
    query?: string;
    limit?: number;
  }): Promise<NewsFeedResult> {
    return this.repo.getFeed({
      localityId: params.localityId,
      regionId: params.regionId,
      categoryId: params.categoryId,
      query: params.query,
      limit: params.limit ?? 30,
    });
  }
}

let singleton: NewsService | null = null;

export function getNewsService(): NewsService {
  if (!singleton) {
    singleton = new NewsService(new InMemoryNewsRepository());
  }
  return singleton;
}
