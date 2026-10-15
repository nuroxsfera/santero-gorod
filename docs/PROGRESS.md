# Santero Город — полный прогресс

**Источник истины по продукту:** [`MASTER_PLAN.md`](./MASTER_PLAN.md)  
**Этот файл:** чек-листы и статусы «что закрыто / что нет».  
**Пилот:** Новосибирск (`src/config/pilot.ts`)  
**Обновление:** 2026-10-15

**Правило галочки:** только если сделано **и** проверено (CI / контракт / браузер). Заглушка ≠ готово.

---

## Сводка готовности

| Измерение | % | Комментарий |
|-----------|---|-------------|
| Функции прототипа | ~30 | Geo + demo news/jobs + places + map B1 |
| Визуальная оболочка | ~40 | Splash…map; мало иконок |
| Инфраструктура | ~18 | CI + API; нет БД/auth |
| Публичный запуск | ~12 | Demo нельзя выдавать за live city OS |

---

## Горизонт 1 — текущий прототип

- [x] Geography contract + city UX
- [x] Demo News UI + filters + article
- [x] Demo Jobs UI (feed, vacancy, resume, applications)
- [x] API v1 health / news / jobs / places (demo payload)
- [x] CI (typecheck, tests, lint, build)
- [x] MASTER_PLAN.md
- [x] Пилот Новосибирск (default welcome/bootstrap)
- [x] Nav: вкладка «Новости» (не путаница с событиями)
- [x] Places domain + InMemory + list UI
- [x] Home: бейдж пилота, честные stubs (погода/события/демо)
- [x] Map B1: MapLibre + OSM + demo markers (CI green)
- [ ] Neon Postgres подключён
- [ ] Live news metadata в **публичной** ленте
- [ ] Auth

---

## Горизонт 2 — цельная публичная демонстрация

**Обязательно для «можно показывать» без обмана**

- [x] Честные метки demo везде, где demo
- [x] Map B1 для пилота (2D + markers)
- [ ] Universal search v0 (news + jobs + places)
- [ ] Больше demo POI Новосибирска (10–30 точек)
- [ ] Раздел «Ещё»: экран-заглушка со списком будущих модулей
- [ ] Postgres для news metadata (после DATABASE_URL)
- [ ] Mobile smoke checklist (документ + прогон)
- [ ] Иконки bottom nav (не цветные квадраты)
- [ ] Пустые/error состояния унифицированы

**Не обязательно в H2:** auth, 3D buildings, payments, live alerts.

---

## Горизонт 3 — польза жителям пилота

- [ ] 1–2 **легальных** live news source (metadata)
- [ ] Places catalog из открытых данных (OSM extract) для НСК
- [ ] Alerts v1 (модель + UI) при наличии официальных фидов
- [ ] Weather widget (API после OK владельца)
- [ ] Jobs: партнёр **или** явный «только demo»
- [ ] Auth для избранного / подписок
- [ ] Moderation basics (модуль W минимум)
- [ ] Push — только после OK

---

## Горизонт 4 — расширенная экосистема

- [ ] Events calendar (модуль M)
- [ ] Transport layer (справочник остановок/маршрутов)
- [ ] Organization profiles
- [ ] Map B2 (extrusions / richer layers где данные есть)
- [ ] Business tools U (claimed profiles)
- [ ] Unified notifications V
- [ ] Realty / commerce **reference** catalogs

---

## Горизонт 5 — пространственная платформа

- [ ] Map B3 selective digital twin (зоны по контракту)
- [ ] Deep spatial layers / analytics
- [ ] Partner 3D assets pipeline
- [ ] Offline/cache strategy для карты

---

## Горизонт 6 — масштабирование на города

- [ ] City onboarding playbook
- [ ] Standardized feeds & data SLAs
- [ ] Multi-city ops / support model
- [ ] Partner API (модуль Z) стабильный

---

## Модули A–AA (статус)

| ID | Модуль | % | Статус |
|----|--------|---|--------|
| A | Главная | ~55 | Пилот-баннер, shortcuts, stubs |
| B | Карта 3D/2D | ~15 | **B1** done; B2/B3 нет |
| C | Новости | ~45 | Demo + API; live нет |
| D | Городские алерты | 0 | — |
| E | Погода | 0 | Stub на home |
| F | Медицина | 0 | — |
| G | Образование | 0 | — |
| H | Работа | ~40 | Demo product |
| I | Недвижимость | 0 | — |
| J | Магазины | 0 | — |
| K | Еда | 0 | — |
| L | Транспорт | 0 | Nav stub |
| M | События/досуг | 0 | Stub на home |
| N | Туризм | 0 | — |
| O | Спорт | 0 | — |
| P | Семья/быт | 0 | — |
| Q | Муниципальные | 0 | — |
| R | Безопасность | 0 | — |
| S | Сообщества | 0 | — |
| T | Профиль/поиск | ~5 | City search only |
| U | Бизнес-кабинет | 0 | — |
| V | Уведомления | ~2 | Toast nav only |
| W | Админка/качество | 0 | — |
| X | Accessibility city | 0 | — |
| Y | Emergency official | 0 | — |
| Z | Developer API | ~10 | v1 read demo endpoints |
| AA | Multi-city ops | 0 | — |
| — | **Places core** | ~20 | Domain + list + map markers |
| — | **Geography** | ~70 | v1.0 contract, seed |

---

## Карта — уровни B1–B3

| Уровень | Содержание | Статус |
|---------|------------|--------|
| B1 | 2D MapLibre + OSM + markers + sheet | [x] код + CI |
| B2 | Extrusion / richer POI layers | [ ] |
| B3 | Selective twin | [ ] |

---

## API / Backend

- [x] `GET /api/v1/health`
- [x] `GET /api/v1/news/feed`, `/news/:id` (demo)
- [x] `GET /api/v1/jobs/vacancies`, `/vacancies/:id` (demo)
- [x] `GET /api/v1/places` (demo)
- [x] `GET /api/v1/news/rss-preview` (off without env)
- [ ] Postgres schema applied
- [ ] Write endpoints + auth
- [ ] Ingestion job (RSS metadata)

---

## Решения владельца (блокеры)

- [ ] Neon: `DATABASE_URL` в Vercel
- [ ] Live news: legal OK (напр. toggazeta metadata)
- [ ] `ENABLE_RSS_PREVIEW=1` для теста
- [ ] Погодный API (какой)
- [ ] Когда включать Auth

---

## Очередь ближайших задач

1. [ ] Universal search v0
2. [ ] Расширить demo POI Новосибирска
3. [ ] Экран «Ещё»
4. [ ] Иконки nav
5. [ ] После OK: Neon migrations / RSS metadata feed

---

*При закрытии пункта — ставить `[x]` здесь и кратко в `PROJECT_REPORT.md`.*
