# Horizon 1 — закрытие

## 1. Postgres / Neon

- Схема: `docs/backend/schema.sql`
- Код: `src/db/*` — probe при `DATABASE_URL`
- Health: `GET /api/v1/health` → `database.configured` / `connected`
- Без URL приложение работает на in-memory (CI и локально)

**Подключение Neon:**
1. Создать проект Neon
2. Скопировать connection string
3. Vercel → Environment Variables → `DATABASE_URL`
4. Выполнить `schema.sql` в Neon SQL Editor

## 2. Live news metadata

- `HybridNewsRepository` + `GET /api/v1/news/feed`
- RSS: title + link + pubDate only (`parseRssMinimal`)
- Источник H1: toggazeta.ru feed
- `isDemo: false` для RSS; demo-статьи остаются помеченными

Клиентский `getNewsService()` по-прежнему demo in-memory; **публичный API-фид** — hybrid.

## 3. Auth (модель H1)

- Только **guest session** (`src/auth/guest.ts`)
- Без паролей / OAuth / аккаунтов
- Аккаунты и роли — Horizon 3+

## Критерий «H1 закрыт»

| Пункт | Done |
|-------|------|
| Geography + UX | да |
| Demo modules + CI | да |
| Map B1 | да |
| Postgres layer + schema | да |
| Live RSS metadata path | да |
| Auth model defined (guest) | да |
