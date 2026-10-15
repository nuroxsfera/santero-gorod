/**
 * App-level screen and tab contracts.
 */

export type Screen =
  | "splash"
  | "city-select"
  | "main"
  | "city-list"
  | "travel"
  | "news"
  | "news-article"
  | "jobs"
  | "vacancy"
  | "resume"
  | "applications"
  | "places"
  | "map";

export type Tab = "home" | "transport" | "news" | "more";

export const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "transport", label: "Транспорт" },
  { id: "news", label: "Новости" },
  { id: "more", label: "Ещё" },
];
