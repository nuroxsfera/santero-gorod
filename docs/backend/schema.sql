-- Santero Город — Horizon 1 schema (Neon / Postgres)
-- Apply when DATABASE_URL is set. Safe to re-run (IF NOT EXISTS).

CREATE TABLE IF NOT EXISTS news_articles (
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
);

CREATE UNIQUE INDEX IF NOT EXISTS news_articles_content_hash_uidx
  ON news_articles (content_hash);

CREATE INDEX IF NOT EXISTS news_articles_published_idx
  ON news_articles (published_at DESC);

CREATE INDEX IF NOT EXISTS news_articles_locality_idx
  ON news_articles (locality_id);

CREATE TABLE IF NOT EXISTS schema_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO schema_meta (key, value)
VALUES ('version', '1.0.0')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
