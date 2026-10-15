import { describe, it, expect } from "vitest";
import { filterVacancies, matchesVacancyGeo, formatSalary } from "../service/filters";
import { DEMO_VACANCIES } from "../data/demo";

const MOSCOW = "0c5b2444-70a0-4932-980c-b4ed0d6f2ee5";

describe("matchesVacancyGeo", () => {
  const remote = DEMO_VACANCIES.find((v) => v.workFormat === "remote")!;
  const msk = DEMO_VACANCIES.find((v) => v.localityId === MOSCOW)!;

  it("remote always matches", () => {
    expect(matchesVacancyGeo(remote, { localityId: "x", regionId: "y" })).toBe(true);
  });

  it("matches locality", () => {
    expect(matchesVacancyGeo(msk, { localityId: MOSCOW, regionId: "RU-MOW" })).toBe(true);
    expect(matchesVacancyGeo(msk, { localityId: "other", regionId: null })).toBe(false);
  });
});

describe("filterVacancies", () => {
  it("returns published only", () => {
    const items = filterVacancies(DEMO_VACANCIES, { limit: 50 });
    expect(items.every((v) => v.status === "published")).toBe(true);
  });

  it("filters by workFormat", () => {
    const items = filterVacancies(DEMO_VACANCIES, { workFormat: "remote" });
    expect(items.every((v) => v.workFormat === "remote")).toBe(true);
  });

  it("city feed includes remote + local", () => {
    const items = filterVacancies(DEMO_VACANCIES, {
      localityId: MOSCOW,
      regionId: "RU-MOW",
    });
    expect(items.some((v) => v.workFormat === "remote")).toBe(true);
    expect(items.some((v) => v.localityId === MOSCOW)).toBe(true);
  });
});

describe("formatSalary", () => {
  it("handles not specified", () => {
    const v = DEMO_VACANCIES.find((x) => x.salaryNotSpecified)!;
    expect(formatSalary(v)).toBe("Зарплата не указана");
  });
});
