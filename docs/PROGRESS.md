# Santero Город — полный прогресс

**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~52 |
| Визуальная оболочка | ~45 |
| Инфраструктура | ~48 |
| Публичный запуск | ~28 |

---

## Горизонт 1 — ✅ ЗАКРЫТ

---

## Горизонт 2 — ✅ (smoke + code)

- [x] Все code-пункты H2
- [x] Mobile smoke (владелец)
- [x] Neon: migrate API + guide (`docs/backend/NEON.md`)
- [ ] Owner: вставить `DATABASE_URL` + `MIGRATE_SECRET` в Vercel и применить schema
- [ ] Design pass 2 — отдельно

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

## Горизонт 4–6

См. MASTER_PLAN. Skeletons: events, transport.

---

## Neon — очередь владельца

1. Создать проект на console.neon.tech
2. `DATABASE_URL` + `MIGRATE_SECRET` в Vercel
3. Redeploy
4. SQL Editor **или** `POST /api/v1/admin/db/migrate`
5. Проверить `GET /api/v1/health` → `database.connected: true`

Инструкция: [`docs/backend/NEON.md`](./backend/NEON.md)
