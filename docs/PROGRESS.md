# Santero Город — полный прогресс

**Пилот:** Новосибирск  
**Обновление:** 2026-10-16

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~92 |
| Визуальная оболочка | ~72 |
| Инфраструктура | ~72 |
| Публичный запуск | ~58 |

---

## H1–H5 — ✅ (см. историю ниже)

## Горизонт 6 — multi-city / ops / partner ✅ CODE-COMPLETE

- [x] City onboarding playbook (`docs/ops/CITY_ONBOARDING.md`)
- [x] Data SLA + source health API (`/api/v1/ops/sources`, `docs/ops/SLA.md`)
- [x] Partner API read-only (`/api/v1/partner/*`, optional `PARTNER_API_KEY`)
- [x] Ops runbook (`docs/ops/RUNBOOK.md`)
- [x] Push — docs only (`docs/backend/PUSH.md`) · без FCM ключей
- [x] OAuth — docs + account placeholder · без секретов
- [x] Community UGC demo + moderation path note
- [x] Family services catalog (каркас)
- [x] Commerce/Food — справочник без оплаты
- [x] Emergency / МЧС links + 112
- [x] PWA manifest + minimal SW (shell, не OSM tiles)
- [x] OSM full extract — pipeline docs (dump в Neon = ops)
- [ ] Owner: Neon schema apply *(если ещё не сделано)*
- [ ] Owner: real OAuth / Web Push keys *(секреты)*

**Итог:** все горизонты **H1–H6 закрыты по коду и документации**. Остались только owner-секреты и ops-применение schema/OAuth/Push.

---

## Горизонт 1–5 (кратко)

- H1: Geography, News/Jobs demo, CI, API
- H2: Map B1, search, hybrid news, mobile smoke, Neon connect
- H3: Alerts, RSS, places, weather, guest, moderation
- H4: Events/Transport/Orgs/Realty/Notifications/Business, Map B2, design-2
- H5: Map B3 layers, OSM pipeline, catalogs F/G/N/O/Q/R, a11y, account model

---

## Очередь владельца

1. `MIGRATE_SECRET` + apply schema на Neon
2. По желанию: OAuth app + `PARTNER_API_KEY` + Web Push VAPID
3. Полный OSM load в БД по `OSM_PIPELINE.md`
