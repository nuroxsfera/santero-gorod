# Santero Город — полный прогресс

**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~52 |
| Визуальная оболочка | ~45 |
| Инфраструктура | ~42 |
| Публичный запуск | ~28 |

---

## Горизонт 1 — ✅ ЗАКРЫТ

Все пункты H1 закрыты (см. `backend/H1_CLOSE.md`).

---

## Горизонт 2 — цельная демонстрация ✅

- [x] Честные demo-метки
- [x] Map B1
- [x] Universal search v0
- [x] Demo POI НСК
- [x] Экран «Ещё»
- [x] Иконки bottom nav
- [x] Shared empty / error / loading
- [x] Mobile smoke checklist (док)
- [x] Design system pass 1
- [x] Клиент новостей → hybrid API (live + demo в UI)
- [x] PostgresNewsRepository + upsert live при `DATABASE_URL`
- [x] Бейджи live/демо в ленте и статье
- [x] **Owner: mobile smoke на устройстве** — passed 2026-10-15 (`MOBILE_SMOKE.md`)
- [ ] Owner: `DATABASE_URL` + schema.sql в Neon *(операция)*
- [ ] Design pass 2 — отдельный этап по UX

**Итог H2:** code + mobile smoke закрыты. Остаётся опциональный Neon URL и design-2.

---

## Горизонт 3 — польза жителям

- [x] Alerts domain skeleton
- [ ] Больше live news sources
- [ ] Places OSM extract НСК
- [ ] Alerts UI
- [ ] Weather API
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

## Модули (кратко)

A ~55 · B ~18 · C ~62 · D ~10 · H ~40 · L/M ~8 · T ~30 · Z ~25 · Places ~32 · Geography ~70

---

## Очередь

1. Horizon 3 (Alerts UI, источники) — по готовности
2. Neon URL — когда будет
3. Design-2 — по сигналу
