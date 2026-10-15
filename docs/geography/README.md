# Geographic Module — Santero Город

Единый источник географических данных платформы.

## Назначение

- Каталог городов и регионов России
- Стабильные идентификаторы (не ломаются при смене названия)
- Поиск и выбор города пользователем
- Городской контекст (выбранный город ≠ геолокация ≠ город проживания)
- `GeographicReference` для новостей, вакансий, недвижимости

## Текущее окружение

Frontend-прототип (Next.js 16). Backend/БД отсутствуют.

| Слой | Сейчас | Будущее |
|------|--------|---------|
| Domain | TypeScript types | без изменений |
| Repository | InMemory + seed | Postgres / ГАР |
| Service | GeographicService | тот же контракт |
| City Context | localStorage | + server sync |
| Data | seed 20 городов + путь к 1117 | полный ГАР |

## Быстрый старт

```ts
import { getGeographicService, getCityContext } from "@/geography";

const svc = getGeographicService();
await svc.ensureLoaded();
const results = svc.searchCities({ query: "Казань", limit: 10 });
const ref = svc.getReference(results.items[0].id);

const ctx = getCityContext();
await ctx.hydrate();
ctx.selectLocality(results.items[0]);
```

## Структура

```
src/geography/
  domain/ repository/ service/ context/ ui/ data/ lib/
public/data/geography/catalog.json  # optional full catalog
docs/geography/
```

Смена города **не** меняет профиль, резюме, избранное.
