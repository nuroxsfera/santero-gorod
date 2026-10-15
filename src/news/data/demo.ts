import type { NewsArticle, NewsCategory, NewsSource } from "../domain/types";

/**
 * DEMO DATA ONLY — not real news, not scraped from media.
 * Used until legal news sources / partner APIs are connected.
 */

export const NEWS_CATEGORIES: NewsCategory[] = [
  { id: "city", label: "Город" },
  { id: "society", label: "Общество" },
  { id: "transport", label: "Транспорт" },
  { id: "economy", label: "Экономика" },
  { id: "education", label: "Образование" },
  { id: "health", label: "Здравоохранение" },
  { id: "incidents", label: "Происшествия" },
  { id: "culture", label: "Культура" },
  { id: "sport", label: "Спорт" },
  { id: "other", label: "Другое" },
];

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: "demo-santero",
    name: "Santero Demo",
    url: null,
    isDemo: true,
  },
];

const MOSCOW_ID = "0c5b2444-70a0-4932-980c-b4dc0d3f02b5";
const SPB_ID = "c2deb16a-0330-4f05-821f-1d09c93331e6";
const KAZAN_ID = "93b3df57-4c89-44df-ac42-96f72943e636";

function article(
  partial: Omit<NewsArticle, "sourceId" | "sourceName" | "isDemo" | "contentHash"> & {
    contentHash?: string;
  }
): NewsArticle {
  return {
    ...partial,
    sourceId: "demo-santero",
    sourceName: "Santero Demo",
    isDemo: true,
    contentHash: partial.contentHash ?? `demo-${partial.id}`,
  };
}

export const DEMO_ARTICLES: NewsArticle[] = [
  article({
    id: "demo-msk-1",
    title: "В Москве обновят расписание городского транспорта",
    summary: "Демонстрационная новость: изменения маршрутов в центральных районах.",
    body: "Это демонстрационный материал модуля «Новости» Santero Город.\n\nРеальные данные появятся после подключения официальных API и партнёрских источников.",
    categoryId: "transport",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-14T08:00:00.000Z",
    imageUrl: null,
    geo: {
      scope: "locality",
      localityId: MOSCOW_ID,
      localityName: "Москва",
      regionId: "RU-MOW",
      regionName: "Москва",
      countryCode: "RU",
    },
  }),
  article({
    id: "demo-msk-2",
    title: "Городские события выходного дня",
    summary: "Демо: культурная программа на ближайшие дни.",
    body: "Демонстрационный текст. Не является анонсом реальных мероприятий.",
    categoryId: "culture",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-13T12:30:00.000Z",
    imageUrl: null,
    geo: {
      scope: "locality",
      localityId: MOSCOW_ID,
      localityName: "Москва",
      regionId: "RU-MOW",
      regionName: "Москва",
      countryCode: "RU",
    },
  }),
  article({
    id: "demo-spb-1",
    title: "В Санкт-Петербурге обсуждают развитие велоинфраструктуры",
    summary: "Демо-материал региональной повестки.",
    body: "Демонстрационный материал для проверки региональной и городской ленты.",
    categoryId: "transport",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-12T10:00:00.000Z",
    imageUrl: null,
    geo: {
      scope: "locality",
      localityId: SPB_ID,
      localityName: "Санкт-Петербург",
      regionId: "RU-SPE",
      regionName: "Санкт-Петербург",
      countryCode: "RU",
    },
  }),
  article({
    id: "demo-kazan-1",
    title: "Образовательные инициативы в Казани",
    summary: "Демо: локальная новость об образовании.",
    body: "Демонстрационный контент модуля новостей.",
    categoryId: "education",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-11T09:15:00.000Z",
    imageUrl: null,
    geo: {
      scope: "locality",
      localityId: KAZAN_ID,
      localityName: "Казань",
      regionId: "RU-TA",
      regionName: "Республика Татарстан",
      countryCode: "RU",
    },
  }),
  article({
    id: "demo-region-ta-1",
    title: "Региональные новости Татарстана",
    summary: "Демо: материал уровня региона без привязки к одному городу.",
    body: "Демонстрационная региональная лента.",
    categoryId: "society",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-10T14:00:00.000Z",
    imageUrl: null,
    geo: {
      scope: "region",
      localityId: null,
      localityName: null,
      regionId: "RU-TA",
      regionName: "Республика Татарстан",
      countryCode: "RU",
    },
  }),
  article({
    id: "demo-federal-1",
    title: "Федеральная повестка: инфраструктурные проекты",
    summary: "Демо-новость федерального уровня.",
    body: "Демонстрационный федеральный материал. Не является официальным сообщением.",
    categoryId: "economy",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-09T07:00:00.000Z",
    imageUrl: null,
    geo: {
      scope: "federal",
      localityId: null,
      localityName: null,
      regionId: null,
      regionName: null,
      countryCode: "RU",
    },
  }),
  article({
    id: "demo-federal-2",
    title: "Общероссийские спортивные соревнования",
    summary: "Демо: спорт на федеральном уровне.",
    body: "Демонстрационный текст.",
    categoryId: "sport",
    sourceUrl: null,
    originalUrl: null,
    publishedAt: "2026-10-08T16:45:00.000Z",
    imageUrl: null,
    geo: {
      scope: "federal",
      localityId: null,
      localityName: null,
      regionId: null,
      regionName: null,
      countryCode: "RU",
    },
  }),
];
