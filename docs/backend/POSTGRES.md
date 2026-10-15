# PostgreSQL: Neon vs Supabase (free) — выбор для Santero Город

Актуальность лимитов: октябрь 2026 (публичные страницы провайдеров).

## Сравнение free-планов

| | **Neon Free** | **Supabase Free** |
|--|---------------|-------------------|
| Активные проекты | до **100** | **2** |
| Хранилище Postgres | **1 GB / проект** (до 20 GB на аккаунт) | **500 MB / проект** |
| Compute | 100 CU-часов/проект/мес, scale-to-zero ~5 мин | shared, пауза после **~1 недели** без активности |
| Сеть (egress) | 5 GB / проект / мес | 5 GB (+ cached) |
| Auth из коробки | Managed Better Auth (позже) | встроенный Auth |
| Vercel | connection string + serverless driver | то же + JS client |
| Пауза «на неделю» | нет (scale to zero, но проект жив) | **да** — неудобно для публичного API |
| Карта / платный апселл | free без карты | free обычно без карты |

## Рекомендация: **Neon**

Почему:

1. Лучше стыкуется с **Vercel + Next.js API routes** (serverless Postgres, ветки preview).
2. Нет недельной паузы проекта — критично для health/news API.
3. Больше места и проектов на free для экспериментов.
4. Auth пока **не** внедряем — лишний Auth Supabase не нужен.

Минус Neon: «холодный» старт после idle (первые запросы медленнее). Для прототипа приемлемо.

**Платные тарифы не подключаем.** Аккаунты от имени владельца не создаём.

## Что сделать вам (точные шаги)

1. Зайти на https://neon.tech и зарегистрироваться **своим** email.
2. Create project → регион ближе к Vercel (например Frankfurt / Frankfurt-like EU).
3. Postgres 16+ → скопировать **pooled** connection string (`…-pooler…`).
4. В Vercel → Project → Settings → Environment Variables:
   - `DATABASE_URL` = connection string (**Secret**, не коммитить).
   - Не добавлять строку в Git, `.env.local` только локально.
5. Написать мне: «DATABASE_URL добавлен в Vercel» — тогда можно миграции и запись статей.

Пока `DATABASE_URL` нет: API работает на demo-памяти, схема ниже только заготовка.

## Черновик схемы (не применялась)

```sql
-- news_sources / news_articles — без PII
CREATE TABLE IF NOT EXISTS news_sources (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  home_url TEXT NOT NULL,
  feed_url TEXT,
  attribution TEXT NOT NULL,
  enabled BOOLEAN NOT NULL DEFAULT false
);

CREATE TABLE IF NOT EXISTS news_articles (
  id TEXT PRIMARY KEY,
  source_id TEXT NOT NULL REFERENCES news_sources(id),
  title TEXT NOT NULL,
  summary TEXT,
  body TEXT, -- только если есть права; иначе NULL
  original_url TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  content_hash TEXT NOT NULL UNIQUE,
  locality_id TEXT,
  region_id TEXT,
  geo_scope TEXT NOT NULL DEFAULT 'region',
  is_demo BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS news_articles_published_idx ON news_articles (published_at DESC);
```
