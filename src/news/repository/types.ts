import type { NewsArticle, NewsFeedQuery, NewsFeedResult, NewsSource, NewsCategory } from "../domain/types";

export interface NewsRepository {
  getFeed(query: NewsFeedQuery): Promise<NewsFeedResult>;
  getById(id: string): Promise<NewsArticle | null>;
  getSources(): Promise<NewsSource[]>;
  getCategories(): Promise<NewsCategory[]>;
}
