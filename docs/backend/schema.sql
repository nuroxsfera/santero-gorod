-- Santero Город — schema H1–H4 (Neon / Postgres)
-- Safe to re-run (IF NOT EXISTS).

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

CREATE TABLE IF NOT EXISTS places (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  locality_id TEXT,
  region_id TEXT,
  address_text TEXT,
  lat DOUBLE PRECISION NOT NULL,
  lon DOUBLE PRECISION NOT NULL,
  source TEXT NOT NULL,
  is_demo BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS places_locality_idx ON places (locality_id);

CREATE TABLE IF NOT EXISTS city_events (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL,
  locality_id TEXT,
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  is_demo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS moderation_items (
  id TEXT PRIMARY KEY,
  target_type TEXT NOT NULL,
  target_id TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  is_demo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  decided_at TIMESTAMPTZ
);

CREATE TABLE IF NOT EXISTS schema_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO schema_meta (key, value)
VALUES ('version', '1.1.0')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
