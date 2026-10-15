# Santero Город — прогресс (галочки)

Связан с `docs/MASTER_PLAN.md`. Галочка только если **сделано и проверено** (CI / контракт).

**Пилот:** Новосибирск  
**Обновление:** 2026-10-15

---

## Horizon 1 — прототип

- [x] Geography contract + city UX
- [x] Demo News + Jobs UI
- [x] API v1 read (demo)
- [x] CI green
- [x] MASTER_PLAN создан
- [x] Пилот Новосибирск (config + welcome default)
- [x] Nav: «Новости» вместо ложных «События»
- [x] Places domain + InMemory demo + tests
- [x] Places list UI + `/api/v1/places`
- [x] Home: метка пилота, честные stubs (погода/события/демо)
- [ ] Neon connected
- [ ] Live news metadata in public feed

## Horizon 2 — цельная демонстрация

- [x] Честные demo-метки на home / places
- [ ] Map B1 (2D + markers) для Новосибирска
- [ ] Universal search v0
- [ ] Postgres news metadata (после DATABASE_URL)
- [ ] Mobile smoke checklist зафиксирован

## Модули (кратко)

| Модуль | % | Заметка |
|--------|---|--------|
| A Home | ~50 | Пилот-баннер, stubs |
| B Map | ~8 | Places list only, не карта |
| C News | ~45 | demo |
| H Jobs | ~40 | demo |
| Places core | ~15 | domain+list+API |
| Rest | 0 | — |

## Ближайшее

1. CI этого этапа
2. Map B1: MapLibre + OSM tiles (бесплатно) + demo markers — следующий крупный шаг
3. Neon / RSS — ждут владельца
