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

export type Tab = "home" | "transport" | "events" | "more";

export const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "transport", label: "Транспорт" },
  { id: "events", label: "События" },
  { id: "more", label: "Ещё" },
];
