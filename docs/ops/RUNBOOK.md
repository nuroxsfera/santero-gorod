# Multi-city ops runbook (H6)

## Инциденты

1. **Health red** — смотреть `/api/v1/health` и `/api/v1/ops/sources`
2. **RSS down** — лента остаётся на demo; не «чинить» скрейпингом
3. **DB down** — приложение на in-memory; не блокировать read UI
4. **Map tiles blocked** — показать error + список мест

## Деплой

- Vercel production + `DATABASE_URL` / `MIGRATE_SECRET` в env
- После schema change: migrate API или SQL Editor

## Partner API

- Public read: `/api/v1/partner/*`
- Optional header `X-Partner-Key` если задан `PARTNER_API_KEY`
