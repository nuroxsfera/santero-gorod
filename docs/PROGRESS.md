# Santero Город — полный прогресс

**Источник истины:** [`MASTER_PLAN.md`](./MASTER_PLAN.md)  
**H1 close:** [`backend/H1_CLOSE.md`](./backend/H1_CLOSE.md)  
**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

**Правило галочки:** сделано **и** проверено (CI / контракт).

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~48 |
| Визуальная оболочка | ~45 |
| Инфраструктура | ~35 |
| Публичный запуск | ~18 |

---

## Горизонт 1 — прототип ✅ ЗАКРЫТ

- [x] Geography contract + city UX
- [x] Demo News UI + filters + article
- [x] Demo Jobs UI
- [x] API v1 health / news / jobs / places
- [x] CI
- [x] MASTER_PLAN.md
- [x] Пилот Новосибирск
- [x] Nav «Новости»
- [x] Places domain + list + API
- [x] Home pilot + honest stubs
- [x] Map B1 MapLibre + OSM + markers
- [x] **Postgres layer** — schema.sql + probe + health (`DATABASE_URL` опционален)
- [x] **Live news metadata** — Hybrid feed API (RSS title/link/date)
- [x] **Auth H1** — guest session only (аккаунты = H3+)

> Neon «подключён в проде» = владелец ставит `DATABASE_URL` и гоняет schema. Код и контракт H1 закрыты.

---

## Горизонт 2 — цельная демонстрация

- [x] Demo-метки · Map B1 · Search v0 · POI · Ещё · nav icons · states · smoke doc · design pass 1
- [ ] Postgres **заполненный** news table в Neon (нужен URL + apply schema)
- [ ] Owner mobile smoke
- [ ] Design pass 2 — отложено

---

## Горизонт 3 — польза жителям

- [x] Alerts domain skeleton
- [ ] Больше live news sources
- [ ] Places OSM extract НСК
- [ ] Alerts UI
- [ ] Weather API (после OK)
- [ ] Auth accounts (поверх guest)
- [ ] Moderation basics

---

## Горизонт 4 — экосистема

- [x] Events domain skeleton
- [x] Transport domain skeleton
- [ ] Events UI · Transport UI · Org · Map B2 · Business U · Notifications V · Realty

---

## Горизонт 5 — spatial

- [ ] Map B3 · layers · 3D pipeline · offline cache

---

## Горизонт 6 — мультигород

- [ ] Onboarding · SLAs · ops · partner API

---

## Модули A–AA (кратко)

| ID | % | ID | % |
|----|---|----|---|
| A ~55 | B ~18 | C ~55 (live meta API) | D ~10 |
| E 0 | H ~40 | L ~8 | M ~8 |
| T ~30 | Z ~22 | Places ~32 | Geography ~70 |
| Auth guest ~15 | Postgres layer ~40 | | |

---

## API

- [x] health (db + auth + news status)
- [x] news/feed hybrid
- [x] jobs, places, alerts, events, transport

---

## Блокеры владельца (после H1)

- [ ] Вставить `DATABASE_URL` в Vercel + выполнить schema.sql
- [ ] Mobile smoke
- [ ] Design pass 2
- [ ] Weather API choice

---

## Очередь

1. CI H1 close
2. Начать H2 остатки / H3 без дыр H1
