import type { Organization, OrgQuery } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

const ORGS: Organization[] = [
  {
    id: "org-nsk-opera",
    name: "НОБТ",
    kind: "culture",
    localityId: PILOT_CITY.localityId,
    summary: "Новосибирский театр оперы и балета (профиль-ориентир).",
    placeId: "nsk-opera",
    website: null,
    isDemo: true,
  },
  {
    id: "org-nsk-nsu",
    name: "НГУ",
    kind: "education",
    localityId: PILOT_CITY.localityId,
    summary: "Новосибирский государственный университет.",
    placeId: "nsk-nsu",
    website: null,
    isDemo: true,
  },
  {
    id: "org-nsk-gov",
    name: "Правительство НСО",
    kind: "government",
    localityId: PILOT_CITY.localityId,
    summary: "Региональная администрация (справочный профиль).",
    placeId: "nsk-gov",
    website: null,
    isDemo: true,
  },
];

export class InMemoryOrgRepository {
  async list(query: OrgQuery): Promise<{ items: Organization[]; isDemo: boolean }> {
    let items = [...ORGS];
    if (query.localityId) {
      items = items.filter((o) => o.localityId === query.localityId);
    }
    if (query.query?.trim()) {
      const q = query.query.trim().toLowerCase();
      items = items.filter((o) => o.name.toLowerCase().includes(q));
    }
    return {
      items: items.slice(0, query.limit ?? 30),
      isDemo: true,
    };
  }
}
