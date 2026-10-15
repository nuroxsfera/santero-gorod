# Santero Город — полный прогресс

**Пилот:** Новосибирск  
**Обновление:** 2026-10-16

---

## Сводка

| Измерение | % |
|-----------|---|
| Функции прототипа | ~58 |
| Визуальная оболочка | ~45 |
| Инфраструктура | ~55 |
| Публичный запуск | ~34 |

---

## Горизонт 1 — ✅ ЗАКРЫТ

---

## Горизонт 2 — ✅ ЗАКРЫТ ПОЛНОСТЬЮ

- [x] Code-complete
- [x] Mobile smoke (владелец)
- [x] Neon connection (`DATABASE_URL`, health connected)

Всё по H2 закрыто. Отложенное (схема таблиц, design-2) перенесено в **H4**.

---

## Горизонт 3 — польза жителям *(в работе)*

- [x] Alerts domain skeleton
- [x] **Alerts UI** (read-only, demo, честные метки)
- [x] **2+ live news sources** (toggazeta + Lenta.ru metadata)
- [x] Jobs: явная политика «только demo» на главной
- [ ] Places catalog из OSM extract НСК
- [ ] Weather API (после OK владельца)
- [ ] Auth accounts (поверх guest)
- [ ] Moderation basics (W минимум)

---

## Горизонт 4 — экосистема + отложенное с H2

- [x] Events domain skeleton
- [x] Transport domain skeleton
- [ ] **Neon schema apply** — таблицы ещё **не** накатывались (SQL Editor / migrate API)
- [ ] **Design pass 2** — UX уровня Яндекс/Сбер (воздух, меньше «карточек»)
- [ ] Events calendar UI
- [ ] Transport UI / GTFS
- [ ] Organization profiles
- [ ] Map B2
- [ ] Business tools U
- [ ] Unified notifications V
- [ ] Realty / commerce catalogs

---

## Горизонт 5 — spatial

- [ ] Map B3 · layers · 3D pipeline · offline cache

---

## Горизонт 6 — мультигород

- [ ] Onboarding · SLAs · ops · partner API

---

## Очередь

1. CI после H3 Alerts UI
2. Places OSM extract / расширение POI
3. H4: schema + design-2 по приоритету владельца
