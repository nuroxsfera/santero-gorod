import type { Vacancy, VacancyFeedQuery } from "../domain/types";

export function matchesVacancyText(v: Vacancy, q: string): boolean {
  const n = q.toLowerCase().trim();
  if (!n) return true;
  return (
    v.title.toLowerCase().includes(n) ||
    v.description.toLowerCase().includes(n) ||
    v.employerName.toLowerCase().includes(n) ||
    (v.localityName?.toLowerCase().includes(n) ?? false)
  );
}

export function matchesVacancyGeo(
  v: Vacancy,
  opts: { localityId?: string | null; regionId?: string | null }
): boolean {
  if (v.workFormat === "remote") return true;
  if (!opts.localityId && !opts.regionId) return true;
  if (opts.localityId && v.localityId === opts.localityId) return true;
  if (opts.regionId && v.regionId === opts.regionId) return true;
  return false;
}

export function filterVacancies(list: Vacancy[], query: VacancyFeedQuery): Vacancy[] {
  let items = list.filter((v) => v.status === "published");
  items = items.filter((v) =>
    matchesVacancyGeo(v, { localityId: query.localityId, regionId: query.regionId })
  );
  if (query.workFormat && query.workFormat !== "all") {
    items = items.filter((v) => v.workFormat === query.workFormat);
  }
  if (query.employmentType && query.employmentType !== "all") {
    items = items.filter((v) => v.employmentType === query.employmentType);
  }
  if (query.query?.trim()) {
    items = items.filter((v) => matchesVacancyText(v, query.query!));
  }
  if (query.salaryFrom != null) {
    items = items.filter(
      (v) =>
        v.salaryNotSpecified ||
        (v.salaryFrom != null && v.salaryFrom >= query.salaryFrom!) ||
        (v.salaryTo != null && v.salaryTo >= query.salaryFrom!)
    );
  }
  items.sort((a, b) => {
    const da = a.publishedAt ?? "";
    const db = b.publishedAt ?? "";
    return da < db ? 1 : -1;
  });
  return items;
}

export function formatSalary(v: Vacancy): string {
  if (v.salaryNotSpecified || (v.salaryFrom == null && v.salaryTo == null)) {
    return "Зарплата не указана";
  }
  const fmt = (n: number) => n.toLocaleString("ru-RU");
  if (v.salaryFrom != null && v.salaryTo != null) {
    return `${fmt(v.salaryFrom)}–${fmt(v.salaryTo)} ₽`;
  }
  if (v.salaryFrom != null) return `от ${fmt(v.salaryFrom)} ₽`;
  return `до ${fmt(v.salaryTo!)} ₽`;
}

export const WORK_FORMAT_LABEL: Record<string, string> = {
  onsite: "В офисе",
  hybrid: "Гибрид",
  remote: "Удалённо",
  any: "Любой",
};

export const EMPLOYMENT_LABEL: Record<string, string> = {
  full_time: "Полная",
  part_time: "Частичная",
  contract: "Контракт",
  internship: "Стажировка",
};

export const APPLICATION_STATUS_LABEL: Record<string, string> = {
  submitted: "Отправлен",
  viewed: "Просмотрен",
  invite: "Приглашение",
  rejected: "Отказ",
  withdrawn: "Отозван",
};
