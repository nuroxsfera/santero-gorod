# Santero Город — полный прогресс

**Продукт:** [`MASTER_PLAN.md`](./MASTER_PLAN.md) · **Smoke:** [`MOBILE_SMOKE.md`](./MOBILE_SMOKE.md)  
**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~38 |
| Визуальная оболочка | ~48 |
| Инфраструктура | ~18 |
| Публичный запуск | ~14 |

---

## Горизонт 1 — прототип

- [x] Geography + city UX
- [x] Demo News / Jobs
- [x] API v1 demo
- [x] CI
- [x] MASTER_PLAN
- [x] Пилот Новосибирск
- [x] Nav «Новости»
- [x] Places + list + API
- [x] Home pilot + stubs
- [x] Map B1
- [ ] Neon
- [ ] Live news in feed
- [ ] Auth

## Горизонт 2 — демонстрация

- [x] Честные demo-метки
- [x] Map B1
- [x] Universal search v0
- [x] Demo POI НСК (~8)
- [x] Экран «Ещё»
- [x] Иконки bottom nav
- [x] Shared empty / error / loading (`states.tsx`)
- [x] Mobile smoke checklist (док; прогон на устройстве — владелец)
- [ ] Postgres news metadata *(блокер: DATABASE_URL)*

**H2 без блокера владельца — закрыт по коду.** Postgres остаётся открытым до Neon.

## Горизонт 3 — польза жителям

- [ ] Live legal news
- [ ] OSM places extract
- [ ] Alerts v1
- [ ] Weather API
- [ ] Jobs real or demo-only policy
- [ ] Auth favorites
- [ ] Moderation basics

## Горизонт 4 — экосистема

- [ ] Events · Transport · Org · Map B2 · Business U · Notifications V · Realty ref

## Горизонт 5 — spatial

- [ ] Map B3 · layers · 3D pipeline · offline cache

## Горизонт 6 — мультигород

- [ ] Onboarding · SLAs · ops · partner API

---

## Модули A–AA (кратко)

| ID | % | ID | % |
|----|---|----|---|
| A Home ~62 | B Map ~20 | C News ~48 | D Alerts 0 |
| E Weather 0 | F–G 0 | H Jobs ~40 | I–S 0 |
| T Search ~30 | U–Y 0 | Z API ~12 | AA 0 |
| Places ~32 | Geography ~70 | | |

---

## Блокеры владельца

- [ ] Neon `DATABASE_URL`
- [ ] Legal RSS
- [ ] Weather API
- [ ] Auth timing
- [ ] Пройти `MOBILE_SMOKE.md` на телефоне

## Очередь после H2 code-complete

1. CI этого push
2. Начать H3-prep: Alerts domain skeleton **или** ждать Neon
3. Не заявлять H2 «production ready» без mobile smoke OK
