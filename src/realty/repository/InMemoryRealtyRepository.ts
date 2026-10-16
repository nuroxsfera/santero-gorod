import type { RealtyListing } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

const LISTINGS: RealtyListing[] = [
  {
    id: "realty-nsk-1",
    title: "Пример: 2-комн. у метро (демо)",
    kind: "sale",
    localityId: PILOT_CITY.localityId,
    priceText: "цена не публикуется · демо",
    areaText: "~54 м²",
    isDemo: true,
  },
  {
    id: "realty-nsk-2",
    title: "Пример: студия в аренду (демо)",
    kind: "rent",
    localityId: PILOT_CITY.localityId,
    priceText: "цена не публикуется · демо",
    areaText: "~28 м²",
    isDemo: true,
  },
];

export class InMemoryRealtyRepository {
  async list(localityId?: string | null) {
    let items = [...LISTINGS];
    if (localityId) items = items.filter((l) => l.localityId === localityId);
    return { items, isDemo: true as const };
  }
}
