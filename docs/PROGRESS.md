# Santero Город — полный прогресс

**Продукт:** [`MASTER_PLAN.md`](./MASTER_PLAN.md)  
**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

Галочка = сделано **и** проверено (CI / контракт).

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~35 |
| Визуальная оболочка | ~42 |
| Инфраструктура | ~18 |
| Публичный запуск | ~12 |

---

## Горизонт 1 — прототип

- [x] Geography + city UX
- [x] Demo News / Jobs
- [x] API v1 (demo)
- [x] CI
- [x] MASTER_PLAN
- [x] Пилот Новосибирск
- [x] Nav «Новости»
- [x] Places + list + API
- [x] Home pilot + honest stubs
- [x] Map B1 MapLibre+OSM
- [ ] Neon
- [ ] Live news in feed
- [ ] Auth

## Горизонт 2 — демонстрация

- [x] Честные demo-метки
- [x] Map B1
- [x] Universal search v0 (news+jobs+places)
- [x] Больше demo POI (~8 точек НСК)
- [x] Экран «Ещё» (roadmap stubs)
- [ ] Postgres news
- [ ] Mobile smoke checklist
- [ ] Иконки bottom nav
- [ ] Унификация empty/error

## Горизонт 3 — польза жителям

- [ ] Live legal news sources
- [ ] OSM places extract НСК
- [ ] Alerts v1
- [ ] Weather API (после OK)
- [ ] Jobs real or explicit demo-only region
- [ ] Auth favorites
- [ ] Moderation basics

## Горизонт 4 — экосистема

- [ ] Events
- [ ] Transport layer
- [ ] Org profiles
- [ ] Map B2
- [ ] Business tools U
- [ ] Notifications V
- [ ] Realty/commerce reference

## Горизонт 5 — spatial platform

- [ ] Map B3 selective twin
- [ ] Deep layers / analytics
- [ ] 3D assets pipeline
- [ ] Offline/cache map

## Горизонт 6 — мультигород

- [ ] City onboarding playbook
- [ ] Feeds & SLAs
- [ ] Ops/support
- [ ] Partner API stable

---

## Модули A–AA

| ID | Модуль | % |
|----|--------|---|
| A | Главная | ~60 |
| B | Карта | ~18 B1 |
| C | Новости | ~45 demo |
| D | Алерты | 0 |
| E | Погода | 0 stub |
| F | Медицина | 0 |
| G | Образование | 0 |
| H | Работа | ~40 demo |
| I–S | Прочие каталоги | 0 |
| T | Поиск/профиль | ~25 search v0 |
| U–Y | Бизнес/админ/ЧС | 0 |
| Z | API | ~12 |
| AA | Multi-city | 0 |
| Places | core | ~30 |
| Geography | | ~70 |

---

## Блокеры владельца

- [ ] Neon DATABASE_URL
- [ ] Legal RSS OK
- [ ] Weather API choice
- [ ] Auth timing

## Очередь

1. CI после search/more
2. Иконки nav
3. После OK — Neon / RSS
