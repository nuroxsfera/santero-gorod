# Neon — подключение Santero Город

## Что уже в коде

- `DATABASE_URL` → Postgres
- `docs/backend/schema.sql` — таблицы `news_articles`, `schema_meta`
- `GET /api/v1/health` → `database.configured` / `connected`
- Live-новости при наличии URL могут писаться в `news_articles` (upsert)
- `POST /api/v1/admin/db/migrate` — применить schema (нужен секрет)

## Шаги владельца (5–10 минут)

### 1. Создать проект Neon

1. Открыть [https://console.neon.tech](https://console.neon.tech)
2. Sign up / login (GitHub удобно)
3. **New Project**
   - Name: `santero-gorod`
   - Region: ближе к пользователям (например Frankfurt / Frankfurt eu-central)
   - Postgres version: 16 (по умолчанию ок)
4. Create project

### 2. Скопировать connection string

В Neon Dashboard → **Connection Details**:

- Выбрать **Connection string**
- Режим: **URI**
- Включить **SSL** (обычно уже в строке `sslmode=require`)
- Скопировать строку вида:

```text
postgresql://USER:PASSWORD@ep-xxxx.region.aws.neon.tech/neondb?sslmode=require
```

> Не коммить строку в Git. Не светить в чатах.

### 3. Vercel — переменные окружения

1. [Vercel Dashboard](https://vercel.com) → проект **santero-gorod** (или как назван)
2. **Settings → Environment Variables**
3. Добавить:

| Name | Value | Environments |
|------|--------|----------------|
| `DATABASE_URL` | строка из Neon | Production, Preview, Development |
| `MIGRATE_SECRET` | случайная длинная строка (16+ символов) | Production (и Preview по желанию) |

4. **Redeploy** Production (Deployments → ⋮ → Redeploy), чтобы подхватить env.

### 4. Применить схему

**Вариант A — Neon SQL Editor (проще)**

1. Neon → SQL Editor
2. Вставить содержимое файла `docs/backend/schema.sql` из репозитория
3. Run

**Вариант B — через API после деплоя**

```bash
curl -X POST "https://ТВОЙ-ДОМЕН.vercel.app/api/v1/admin/db/migrate" \
  -H "Authorization: Bearer ТВОЙ_MIGRATE_SECRET"
```

Ответ `{"ok":true,"version":"1.0.0"}` — схема на месте.

### 5. Проверка

```bash
curl "https://ТВОЙ-ДОМЕН.vercel.app/api/v1/health"
```

Ожидаемо:

```json
"database": {
  "configured": true,
  "connected": true,
  "message": "Postgres reachable"
}
```

Открой в приложении **Новости** (вкладка федеральные / общий feed) — live-элементы могут попасть в БД при следующем запросе feed.

## Локально (опционально)

В `.env.local` (не в git):

```env
DATABASE_URL=postgresql://...
MIGRATE_SECRET=local-dev-secret
```

```bash
npm run dev
curl -X POST http://localhost:3000/api/v1/admin/db/migrate \
  -H "Authorization: Bearer local-dev-secret"
```

## Безопасность

- `MIGRATE_SECRET` не публиковать
- После первого migrate секрет можно ротировать
- Route migrate не для клиентов приложения
