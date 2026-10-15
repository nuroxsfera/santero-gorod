# Новости → путь к backend

## Текущая граница

```
UI → NewsService → NewsRepository
  → InMemoryNewsRepository + DEMO_ARTICLES  // сейчас
  → HttpNewsRepository                     // позже
```

Geography v1.0 — единственный источник `localityId` / `regionId`.

## Минимальный следующий этап

1. Таблицы `news_sources`, `news_articles` (content_hash UNIQUE, geo refs).
2. `GET /api/v1/news/feed`, `GET /api/v1/news/:id`.
3. Ingestion job: normalize → dedupe → upsert.
4. Клиентский `HttpNewsRepository` + fallback на demo.

Не разворачивать БД без необходимости; не имитировать live-ingestion.
