# Santero Город — рабочий отчёт

**Обновление:** 2026-10-15 13:30 CEST

---

## Состояние

- Этап 1 CI: закрыт
- Этап 2 UI shell: в основном закрыт
- **Этап 3 backend: старт** — API v1 поверх demo-хранилища

---

## Этап 3 — что сделано

- `GET /api/v1/health`
- `GET /api/v1/news/feed`, `GET /api/v1/news/:id`
- `GET /api/v1/jobs/vacancies`, `GET /api/v1/jobs/vacancies/:id`
- `HttpNewsRepository` (опционально, UI ещё на InMemory)
- `docs/backend/README.md`

**Важно:** данные по-прежнему **demo** (`isDemo` / warning в JSON). Это не live-новости и не реальные вакансии.

---

## CI

Ожидается прогон после push. Предыдущие runs #8–#9 были success.

---

## Следующее по backend (нужны решения владельца)

1. Согласие на хостинг БД (бесплатный tier) или self-hosted
2. Согласие на конкретный легальный источник новостей
3. Auth (провайдер / email magic link / и т.д.)

Без этого API остаётся контрактом над demo.
