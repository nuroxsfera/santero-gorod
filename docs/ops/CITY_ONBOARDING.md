# City onboarding playbook (H6)

## Цель

Подключить новый город к Santero Город за понятный срок без «магии».

## Чеклист (ориентир 5–15 рабочих дней)

1. **Geography** — localityId в catalog (или FIAS/ручной seed)
2. **Places** — curated ≥20 POI или OSM extract по pipeline
3. **News** — ≥1 легальный RSS (metadata) + demo fallback
4. **Transport** — опционально: остановки/маршруты reference
5. **Alerts** — только при официальном источнике; иначе demo off
6. **Карта** — центр lat/lon в pilot/config города
7. **Юридическое** — attribution OSM, согласие на источники
8. **Smoke** — mobile + desktop checklist (`docs/MOBILE_SMOKE.md`)
9. **SLA** — запись города в source-health dashboard

## Не обещать

- Live GTFS в день 1
- OAuth для каждого города отдельно
- Полный 3D-twin
