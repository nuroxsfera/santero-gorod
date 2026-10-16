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
  | "map"
  | "search"
  | "more"
  | "alerts"
  | "profile"
  | "account"
  | "events"
  | "transport"
  | "orgs"
  | "realty"
  | "notifications"
  | "business"
  | "medicine"
  | "education"
  | "tourism"
  | "sport"
  | "municipal"
  | "safety"
  | "accessibility";

export type Tab = "home" | "transport" | "news" | "more";

export const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "transport", label: "Транспорт" },
  { id: "news", label: "Новости" },
  { id: "more", label: "Ещё" },
];
