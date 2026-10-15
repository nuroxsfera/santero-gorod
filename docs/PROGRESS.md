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
| Функции прототипа | ~40 | Geo, demo news/jobs, places, map B1, search |
| Визуальная оболочка | ~45 | Design pass 1; ещё «карточно», сыро |
| Инфраструктура | ~18 | CI + API; нет БД/auth |
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
- [x] Alerts domain skeleton (типы + InMemory + API + tests) — **без UI live, без фейковых угроз**
- [ ] Places catalog из OSM extract НСК
- [ ] Alerts UI read-only при наличии данных
- [ ] Weather widget (API после OK)
- [ ] Jobs: партнёр или явная политика «только demo»
- [ ] Auth для избранного
- [ ] Moderation basics (W минимум)

---

## Горизонт 4 — расширенная экосистема

- [x] Events domain skeleton (типы + InMemory demo + API) — **не календарь UI**
- [ ] Events calendar UI (модуль M)
- [ ] Transport layer (справочник)
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
| A | Главная | ~55 | UI pass 1; ещё дорабатывать визуал |
| B | Карта | ~18 | B1 done; B2/B3 нет |
| C | Новости | ~45 | Demo |
| D | Алерты | ~8 | Domain + API skeleton |
| E | Погода | 0 | Stub |
| F | Медицина | 0 | — |
| G | Образование | 0 | — |
| H | Работа | ~40 | Demo |
| I | Недвижимость | 0 | — |
| J | Магазины | 0 | — |
| K | Еда | 0 | — |
| L | Транспорт | 0 | Nav stub |
| M | События | ~8 | Domain skeleton |
| N–S | Прочие | 0 | — |
| T | Поиск/профиль | ~30 | Search v0 |
| U | Бизнес-кабинет | 0 | — |
| V | Уведомления | ~2 | Toast |
| W | Админка | 0 | — |
| X | Accessibility | 0 | — |
| Y | Emergency | 0 | — |
| Z | Developer API | ~14 | + alerts/events routes |
| AA | Multi-city | 0 | — |
| — | Places core | ~32 | — |
| — | Geography | ~70 | — |

---

## API

- [x] health, news, jobs, places
- [x] `/api/v1/alerts` (demo skeleton)
- [x] `/api/v1/events` (demo skeleton)
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

1. CI после skeletons
2. Transport domain skeleton (H4)
3. Не трогать массовый редизайн, пока не скажешь
