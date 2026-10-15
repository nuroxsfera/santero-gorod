# Модуль «Новости» Santero Город

## Статус

Клиентский прототип v0.1. Источник данных — **только демо** (`isDemo: true`). Живые API/RSS не подключены.

## Архитектура

```
domain/types.ts          NewsArticle, NewsGeoTarget, NewsSource…
data/demo.ts             Явно помеченные демо-материалы
repository/              NewsRepository + InMemoryNewsRepository
service/filters.ts       Гео-фильтры, текст, дедуп
service/NewsService.ts   Бизнес-логика лент
ui/                      NewsFeedScreen, NewsArticleScreen
```

## Geography v1.0

Привязка только через `localityId` / `regionId` / `countryCode` из Geography.  
Лента города = новости locality + region города + federal.

## Что дальше

1. Backend + хранилище статей
2. NewsIngestion из разрешённых RSS/API
3. Дедуп и нормализация в pipeline
4. Права на изображения и полный текст
