# Santero Город — полный прогресс

**Источник истины по продукту:** [`MASTER_PLAN.md`](./MASTER_PLAN.md)  
**Smoke:** [`MOBILE_SMOKE.md`](./MOBILE_SMOKE.md)  
**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

**Правило галочки:** сделано **и** проверено (CI / контракт). Заглушка ≠ готово.  
**Дизайн:** улучшен, но **не** на уровне целевых продуктов — отдельная итерация позже (не блокирует план).

---

## Сводка готовности

| Измерение | % | Комментарий |
|-----------|---|-------------|
| Функции прототипа | ~42 | + alerts/events/transport skeletons |
| Визуальная оболочка | ~45 | Design pass 1; ещё «карточно», сыро |
| Инфраструктура | ~20 | CI + больше API routes; нет БД |
| Публичный запуск | ~12 | Demo ≠ live city OS |

---

## Горизонт 1 — прототип

- [x] Geography contract + city UX
- [x] Demo News UI + filters + article
- [x] Demo Jobs UI (feed, vacancy, resume, applications)
- [x] API v1 health / news / jobs / places (demo)
- [x] CI (typecheck, tests, lint, build)
- [x] MASTER_PLAN.md
- [x] Пилот Новосибирск
- [x] Nav «Новости»
- [x] Places domain + list + API
- [x] Home pilot + honest stubs
- [x] Map B1 MapLibre + OSM + markers
- [ ] Neon Postgres
- [ ] Live news metadata в публичной ленте
- [ ] Auth

---

## Горизонт 2 — цельная демонстрация

- [x] Честные demo-метки
- [x] Map B1
- [x] Universal search v0
- [x] Demo POI НСК (~8)
- [x] Экран «Ещё»
- [x] Иконки bottom nav
- [x] Shared empty / error / loading
- [x] Mobile smoke checklist (док)
- [x] Design system pass 1 (токены, home, nav, onboarding)
- [ ] Postgres news *(блокер: DATABASE_URL)*
- [ ] Owner mobile smoke на устройстве
- [ ] Design pass 2 (меньше «карточек», уровень Яндекс/Сбер) — **отложено по запросу**

**H2 code-complete** кроме Postgres и owner smoke / design-2.

---

## Горизонт 3 — польза жителям пилота

- [ ] 1–2 легальных live news source
- [x] Alerts domain skeleton (типы + InMemory + API + tests)
- [ ] Places catalog из OSM extract НСК
- [ ] Alerts UI read-only при наличии данных
- [ ] Weather widget (API после OK)
- [ ] Jobs: партнёр или явная политика «только demo»
- [ ] Auth для избранного
- [ ] Moderation basics (W минимум)

---

## Горизонт 4 — расширенная экосистема

- [x] Events domain skeleton (типы + InMemory + API + tests)
- [x] Transport domain skeleton (stops/routes demo + API + tests) — **без realtime**
- [ ] Events calendar UI (модуль M)
- [ ] Transport UI / GTFS live
- [ ] Organization profiles
- [ ] Map B2 (extrusions / richer layers)
- [ ] Business tools U
- [ ] Unified notifications V
- [ ] Realty / commerce reference catalogs

---

## Горизонт 5 — пространственная платформа

- [ ] Map B3 selective twin
- [ ] Deep spatial layers / analytics
- [ ] Partner 3D assets pipeline
- [ ] Offline/cache strategy для карты

---

## Горизонт 6 — масштабирование на города

- [ ] City onboarding playbook
- [ ] Standardized feeds & data SLAs
- [ ] Multi-city ops / support
- [ ] Partner API (Z) стабильный

---

## Модули A–AA

| ID | Модуль | % | Статус |
|----|--------|---|--------|
| A | Главная | ~55 | UI pass 1; визуал дорабатывать позже |
| B | Карта | ~18 | B1 done |
| C | Новости | ~45 | Demo |
| D | Алерты | ~10 | Domain + API |
| E | Погода | 0 | Stub |
| F–G | Медицина / образование | 0 | — |
| H | Работа | ~40 | Demo |
| I–K | Недвиж. / магазины / еда | 0 | — |
| L | Транспорт | ~8 | Domain skeleton |
| M | События | ~8 | Domain skeleton |
| N–S | Прочие | 0 | — |
| T | Поиск/профиль | ~30 | Search v0 |
| U–Y | Бизнес / уведомл. / админ / ЧС | 0–2 | — |
| Z | Developer API | ~16 | + alerts/events/transport |
| AA | Multi-city | 0 | — |
| — | Places / Geography | ~32 / ~70 | — |

---

## API

- [x] health, news, jobs, places
- [x] `/api/v1/alerts`
- [x] `/api/v1/events`
- [x] `/api/v1/transport`
- [ ] Postgres · write · auth · ingestion

---

## Блокеры владельца

- [ ] Neon `DATABASE_URL`
- [ ] Legal RSS OK
- [ ] Weather API
- [ ] Auth timing
- [ ] Mobile smoke на телефоне
- [ ] Design pass 2 (когда вернёмся)

---

## Очередь

1. Подтвердить CI
2. Дальше по плану без редизайна (Org skeleton / notifications event bus types)
3. Design-2 — только по твоему сигналу
