export type {
  NewsArticle,
  NewsCategory,
  NewsCategoryId,
  NewsFeedQuery,
  NewsFeedResult,
  NewsGeoTarget,
  NewsScope,
  NewsSource,
} from "./domain/types";

export { getNewsService, NewsService } from "./service/NewsService";
export { InMemoryNewsRepository } from "./repository/InMemoryNewsRepository";
export { HybridNewsRepository } from "./repository/HybridNewsRepository";
export {
  PostgresNewsRepository,
  isPostgresNewsAvailable,
} from "./repository/PostgresNewsRepository";
export { fetchNewsFeedFromApi } from "./client/fetchNewsFeed";
export { matchesGeo, matchesText, dedupeByHash, type FeedMode } from "./service/filters";
export { NEWS_CATEGORIES, DEMO_ARTICLES } from "./data/demo";
export { NewsFeedScreen } from "./ui/NewsFeedScreen";
export { NewsArticleScreen } from "./ui/NewsArticleScreen";
