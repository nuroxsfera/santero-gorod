# Статус географического каталога

## Что доступно в приложении

| Слой | Содержание |
|------|------------|
| `src/geography/data/seed.ts` | 20 крупных городов (всегда в бандле, fallback) |
| `public/data/geography/catalog.json` | Расширенный набор официальных **городов** РФ |

Источник: [epogrebnyak/ru-cities](https://github.com/epogrebnyak/ru-cities) (`towns.csv`) — данные Росстат + коды ФИАС/ОКТМО.

## Важно

- Каталог содержит **города** (type=`city`), **не** все населённые пункты России.
- Это **не** полный ГАР/ФИАС (сотни тысяч НП).
- Полный нормализованный набор из источника: **1117** городов, 84 региона (локально проверен: ID уникальны, координаты у всех).
- В репозитории в `public/data/geography/catalog.json` может быть подмножество для размера артефакта; seed покрывает основные сценарии UI.

## Загрузка в runtime

`InMemoryGeographicRepository`:

1. Пытается `fetch("/data/geography/catalog.json")`
2. При ошибке / отсутствии файла → `SEED_CATALOG`

Hardcoded список из 10 строк в `page.tsx` **удалён**. UI использует только geographic module.

## Переход на сервер

1. Реализовать `PostgresGeographicRepository` по интерфейсу `GeographicRepository`
2. Импортёр ГАР (ФНС) с upsert по FIAS GUID
3. HTTP API `/api/v1/geo/...`
4. UI без изменений (тот же Service)
