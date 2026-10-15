/**
 * App-level screen and tab contracts.
 * Keeps page.tsx thinner; no business logic here.
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
  | "applications";

/**
 * Tabs: home + news (honest label) + transport/more stubs.
 * Events calendar is a future module — not aliased as news.
 */
export type Tab = "home" | "transport" | "news" | "more";

export const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "transport", label: "Транспорт" },
  { id: "news", label: "Новости" },
  { id: "more", label: "Ещё" },
];
