# Santero Город — полный прогресс

**Пилот:** Новосибирск  
**Обновление:** 2026-10-16  
**Источник истины по горизонту:** этот файл + `docs/MASTER_PLAN.md`

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~85 |
| Визуальная оболочка | ~68 |
| Инфраструктура | ~65 |
| Публичный запуск | ~52 |

---

## Горизонт 1 — платформа ✅

- [x] Geography v1 + catalog + CityContext
- [x] News/Jobs domain + demo UI + API
- [x] Splash / city / main shell
- [x] CI typecheck · test · lint · build
- [x] Postgres layer ready (`DATABASE_URL`)

---

## Горизонт 2 — цельная демонстрация ✅

- [x] Demo-метки · Map B1 · Search v0 · POI · «Ещё» · bottom nav icons
- [x] Shared empty/error/loading · Design pass 1
- [x] Hybrid news API · PostgresNewsRepository
- [x] Mobile smoke (владелец)
- [x] Neon connection (health connected)

---

## Горизонт 3 — польза жителям ✅

- [x] Alerts domain + UI
- [x] 2+ live RSS
- [x] Places curated NSK catalog
- [x] Weather Open-Meteo
- [x] Guest profile
- [x] Moderation queue basics

---

## Горизонт 4 — экосистема ✅ (code)

- [x] Events UI · Transport UI · Orgs · Realty · Notifications · Business shell
- [x] Map B2 · Design pass 2 · Schema 1.1.0 в репо
- [ ] Owner: schema apply на Neon *(операция)*

---

## Горизонт 5 — spatial + depth ✅ CODE-COMPLETE

### Карта и данные
- [x] **Map B3** — layer picker (категории POI), pitch/3D-камера, 2D fallback
- [x] **OSM pipeline** — `docs/backend/OSM_PIPELINE.md` + скрипт-заготовка export path (не live dump всего города)
- [x] Offline: policy + cache headers note (полный tile offline — H6 ops)

### Аккаунты
- [x] **Account model** — types + экран «Аккаунт» (guest → registered *placeholder*); **OAuth провайдеры не подключены** (нет секретов)

### Каталоги, упущенные с H3–H4 (закрыты здесь)
- [x] **Медицина (F)** — фильтр health places
- [x] **Образование (G)** — education places
- [x] **Туризм / история (N)** — culture/poi curated list
- [x] **Спорт (O)** — sport places
- [x] **Муниципальные контакты (Q)** — demo official links screen
- [x] **Безопасность (R)** — demo contacts + link to alerts
- [x] **Accessibility (X)** — настройки крупный текст / reduce motion (local)

### Не в code-H5 (масштаб / владелец)
- [ ] Полный OSM dump Новосибирска в прод-БД
- [ ] Реальный OAuth (Google/Yandex/etc.) + session server
- [ ] Детальный 3D twin зданий (mesh) — B3+ commercial
- [ ] Service worker offline tiles на все zoom

→ перенос в **H6** где уместно.

---

## Горизонт 6 — мультигород, ops, partner

- [ ] City onboarding playbook (новый город за N дней)
- [ ] Data SLA / source health dashboard
- [ ] Partner API (module Z) read-only public
- [ ] Multi-city ops runbooks
- [ ] Push notifications server
- [ ] Full OSM city extract в Neon
- [ ] Real OAuth + org verification
- [ ] Community/UGC (S) с модерацией
- [ ] Family services (P) catalog
- [ ] Commerce/Food order path (J/K) — только с платёжной моделью
- [ ] Emergency / civil defense (Y) — только официальные фиды
- [ ] Schema apply verification automated in CI (optional)
- [ ] PWA install + offline shell polish
- [ ] Owner leftover: Neon schema apply if still pending

---

## Модули A–AA (кратко)

| ID | Модуль | % |
|----|--------|---|
| A | Home | ~70 |
| B | Map B1–B3 shell | ~45 |
| C | News | ~65 |
| D | Alerts | ~40 |
| E | Weather | ~55 |
| F | Medicine catalog | ~25 |
| G | Education catalog | ~25 |
| H | Jobs | ~45 |
| I | Realty | ~20 |
| J/K | Commerce/Food | ~5 |
| L | Transport ref | ~30 |
| M | Events | ~35 |
| N/O | Tourism/Sport | ~25 |
| P | Family services | 0 → H6 |
| Q/R | Municipal/Safety | ~20 |
| S | Community UGC | 0 → H6 |
| T | Search/Profile | ~40 |
| U | Business | ~15 |
| V | Notifications | ~25 |
| W | Moderation | ~20 |
| X | Accessibility | ~15 |
| Y | Emergency | 0 → H6 |
| Z/AA | Partner / multi-city | 0 → H6 |

---

## Очередь

1. CI H5
2. H6 по приоритету владельца
3. Neon schema apply
