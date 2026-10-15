# Santero Город — рабочий отчёт

**Обновление:** 2026-10-15 13:50 CEST

---

## PostgreSQL

**Выбор: Neon Free** (см. `docs/backend/POSTGRES.md`).
Аккаунт и `DATABASE_URL` — только действия владельца. В коде секретов нет. Схема не накатывалась.

## RSS

Проверен рабочий feed: **https://toggazeta.ru/rss** (Тогучинская газета).
nso.ru / toguchin.nso.ru — 403 с нашей среды.

Интеграция: парсер **только метаданных** + тесты. Preview API **запрещён** без `ENABLE_RSS_PREVIEW=1`.
В публичную ленту RSS **не** подключён. Полный текст не сохраняем.

## API

Ранее: health, news feed/id, jobs vacancies (demo).
Новое: `/api/v1/news/rss-preview` (off by default).

## CI

Ожидается run после этого push.

## Реальные vs demo

| | Статус |
|--|--------|
| Новости в UI / `/api/v1/news/feed` | **demo** |
| Вакансии | **demo** |
| RSS live в ленте | **нет** |
| Postgres | **нет** |
| Auth | **нет** |
