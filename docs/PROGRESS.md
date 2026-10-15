# Santero Город — полный прогресс

**Пилот:** Новосибирск  
**Обновление:** 2026-10-16

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~52 |
| Визуальная оболочка | ~45 |
| Инфраструктура | ~55 |
| Публичный запуск | ~32 |

---

## Горизонт 1 — ✅ ЗАКРЫТ

---

## Горизонт 2 — ✅ ЗАКРЫТ

- [x] Code + mobile smoke
- [x] **Neon / Postgres** — `DATABASE_URL` на Vercel, health: `configured: true`, `connected: true`
- [ ] Design pass 2 — отдельный UX-этап

Проверка 2026-10-16: `GET https://santero-gorod.vercel.app/api/v1/health` → Postgres reachable.

---

## Горизонт 3 — польза жителям

- [x] Alerts domain skeleton
- [ ] Больше live news sources
- [ ] Places OSM extract НСК
- [ ] Alerts UI
- [ ] Weather API
- [ ] Auth accounts
- [ ] Moderation basics

---

## Горизонт 4 — экосистема

- [x] Events / Transport domain skeletons
- [ ] UI и live-слои

---

## Горизонт 5–6

По MASTER_PLAN.

---

## Очередь

1. Horizon 3
2. Design-2 по сигналу
3. Schema migrate — если ещё не гонял, SQL Editor или migrate API
