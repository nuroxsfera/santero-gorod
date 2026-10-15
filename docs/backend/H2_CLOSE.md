# Horizon 2 — закрытие (код)

## Сделано в коде

1. Клиентский feed → hybrid API (`fetchNewsFeedFromApi`)
2. Fallback на InMemory, если API недоступен
3. `PostgresNewsRepository` + upsert live-статей при наличии `DATABASE_URL`
4. UI: бейджи live/демо, ссылка на оригинал
5. Smoke checklist обновлён

## Действия владельца (не код)

1. Пройти `docs/MOBILE_SMOKE.md`
2. Neon: `DATABASE_URL` + выполнить `docs/backend/schema.sql`

## Design pass 2

Не входит в code-complete H2 — отдельный UX-этап.
