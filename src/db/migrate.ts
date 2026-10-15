import { getDatabaseUrl } from "./config";

/** Idempotent statements from schema.sql (no multi-statement driver needed). */
const STATEMENTS: string[] = [
  `CREATE TABLE IF NOT EXISTS news_articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  body TEXT NOT NULL DEFAULT '',
  category_id TEXT NOT NULL DEFAULT 'other',
  source_id TEXT NOT NULL,
  source_name TEXT NOT NULL,
  source_url TEXT,
  original_url TEXT,
  published_at TIMESTAMPTZ NOT NULL,
  image_url TEXT,
  scope TEXT NOT NULL DEFAULT 'federal',
  locality_id TEXT,
  locality_name TEXT,
  region_id TEXT,
  region_name TEXT,
  country_code TEXT NOT NULL DEFAULT 'RU',
  content_hash TEXT NOT NULL,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`,
  `CREATE UNIQUE INDEX IF NOT EXISTS news_articles_content_hash_uidx
  ON news_articles (content_hash)`,
  `CREATE INDEX IF NOT EXISTS news_articles_published_idx
  ON news_articles (published_at DESC)`,
  `CREATE INDEX IF NOT EXISTS news_articles_locality_idx
  ON news_articles (locality_id)`,
  `CREATE TABLE IF NOT EXISTS schema_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
)`,
  `INSERT INTO schema_meta (key, value)
VALUES ('version', '1.0.0')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
];

export type MigrateResult = {
  ok: boolean;
  version: string;
  statements: number;
  message: string;
};

export async function runMigrations(): Promise<MigrateResult> {
  const url = getDatabaseUrl();
  if (!url) {
    return {
      ok: false,
      version: "",
      statements: 0,
      message: "DATABASE_URL not set",
    };
  }

  const { default: pg } = await import("pg");
  const client = new pg.Client({
    connectionString: url,
    connectionTimeoutMillis: 8000,
    ssl:
      url.includes("neon.tech") || url.includes("sslmode=require")
        ? { rejectUnauthorized: false }
        : undefined,
  });

  try {
    await client.connect();
    for (const sql of STATEMENTS) {
      await client.query(sql);
    }
    const { rows } = await client.query(
      `SELECT value FROM schema_meta WHERE key = 'version'`
    );
    const version = rows[0]?.value ? String(rows[0].value) : "1.0.0";
    return {
      ok: true,
      version,
      statements: STATEMENTS.length,
      message: "Schema applied",
    };
  } finally {
    await client.end().catch(() => undefined);
  }
}
