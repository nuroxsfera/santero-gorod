import type { NewsRepository } from "./types";
import type {
  NewsArticle,
  NewsCategory,
  NewsFeedQuery,
  NewsFeedResult,
  NewsSource,
  NewsCategoryId,
  NewsScope,
} from "../domain/types";
import { getDatabaseUrl } from "@/db";
import { NEWS_CATEGORIES, NEWS_SOURCES } from "../data/demo";
import { matchesGeo, matchesText } from "../service/filters";

type PgClient = {
  connect: () => Promise<void>;
  query: (text: string, params?: unknown[]) => Promise<{ rows: Record<string, unknown>[] }>;
  end: () => Promise<void>;
};

function rowToArticle(row: Record<string, unknown>): NewsArticle {
  return {
    id: String(row.id),
    title: String(row.title),
    summary: String(row.summary ?? ""),
    body: String(row.body ?? ""),
    categoryId: (row.category_id as NewsCategoryId) || "other",
    sourceId: String(row.source_id),
    sourceName: String(row.source_name),
    sourceUrl: row.source_url ? String(row.source_url) : null,
    originalUrl: row.original_url ? String(row.original_url) : null,
    publishedAt:
      row.published_at instanceof Date
        ? row.published_at.toISOString()
        : String(row.published_at),
    imageUrl: row.image_url ? String(row.image_url) : null,
    geo: {
      scope: (row.scope as NewsScope) || "federal",
      localityId: row.locality_id ? String(row.locality_id) : null,
      localityName: row.locality_name ? String(row.locality_name) : null,
      regionId: row.region_id ? String(row.region_id) : null,
      regionName: row.region_name ? String(row.region_name) : null,
      countryCode: "RU",
    },
    contentHash: String(row.content_hash),
    isDemo: Boolean(row.is_demo),
  };
}

async function withClient<T>(fn: (client: PgClient) => Promise<T>): Promise<T> {
  const url = getDatabaseUrl();
  if (!url) throw new Error("DATABASE_URL not configured");
  const { default: pg } = await import("pg");
  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: 5000,
    ssl:
      url.includes("neon.tech") || url.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
  }) as unknown as PgClient;
  await client.connect();
  try {
    return await fn(client);
  } finally {
    await client.end();
  }
}

/**
 * Postgres-backed news when DATABASE_URL is set.
 * Upsert supports live RSS metadata persistence (H2).
 */
export class PostgresNewsRepository implements NewsRepository {
  async getFeed(query: NewsFeedQuery): Promise<NewsFeedResult> {
    return withClient(async (client) => {
      const { rows } = await client.query(
        `SELECT * FROM news_articles ORDER BY published_at DESC LIMIT 500`
      );
      let items = rows.map(rowToArticle);
      items = items.filter((a) =>
        matchesGeo(a, {
          localityId: query.localityId,
          regionId: query.regionId,
          scope: query.scope,
          feedMode: query.feedMode,
        })
      );
      if (query.categoryId && query.categoryId !== "all") {
        items = items.filter((a) => a.categoryId === query.categoryId);
      }
      if (query.query?.trim()) {
        items = items.filter((a) => matchesText(a, query.query!));
      }
      const total = items.length;
      const offset = query.offset ?? 0;
      const limit = query.limit ?? 20;
      const page = items.slice(offset, offset + limit);
      return {
        items: page,
        total,
        isDemo: page.length === 0 || page.every((a) => a.isDemo),
      };
    });
  }

  async getById(id: string): Promise<NewsArticle | null> {
    return withClient(async (client) => {
      const { rows } = await client.query(`SELECT * FROM news_articles WHERE id = $1`, [id]);
      if (!rows[0]) return null;
      return rowToArticle(rows[0]);
    });
  }

  async getSources(): Promise<NewsSource[]> {
    return [...NEWS_SOURCES];
  }

  async getCategories(): Promise<NewsCategory[]> {
    return [...NEWS_CATEGORIES];
  }

  async upsertMany(articles: NewsArticle[]): Promise<number> {
    if (articles.length === 0) return 0;
    return withClient(async (client) => {
      let n = 0;
      for (const a of articles) {
        await client.query(
          `INSERT INTO news_articles (
            id, title, summary, body, category_id, source_id, source_name,
            source_url, original_url, published_at, image_url, scope,
            locality_id, locality_name, region_id, region_name, country_code,
            content_hash, is_demo
          ) VALUES (
            $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19
          )
          ON CONFLICT (id) DO UPDATE SET
            title = EXCLUDED.title,
            summary = EXCLUDED.summary,
            published_at = EXCLUDED.published_at,
            original_url = EXCLUDED.original_url`,
          [
            a.id,
            a.title,
            a.summary,
            a.body,
            a.categoryId,
            a.sourceId,
            a.sourceName,
            a.sourceUrl,
            a.originalUrl,
            a.publishedAt,
            a.imageUrl,
            a.geo.scope,
            a.geo.localityId,
            a.geo.localityName,
            a.geo.regionId,
            a.geo.regionName,
            a.geo.countryCode,
            a.contentHash,
            a.isDemo,
          ]
        );
        n += 1;
      }
      return n;
    });
  }
}

export function isPostgresNewsAvailable(): boolean {
  return Boolean(getDatabaseUrl());
}
