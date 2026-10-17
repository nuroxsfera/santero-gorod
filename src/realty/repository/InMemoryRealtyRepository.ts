import type { RealtyListing } from "../domain/types";
import { PILOT_CITY } from "@/config/pilot";

/** Demo listings with structured fields + cover photos (stock placeholders). */
const LISTINGS: RealtyListing[] = [
  {
    id: "realty-nsk-1",
    title: "2-комнатная у метро «Площадь Ленина»",
    kind: "sale",
    localityId: PILOT_CITY.localityId,
    priceText: "от 8,2 млн ₽",
    areaText: "54 м²",
    roomsText: "2 комн.",
    floorText: "7/12",
    addressText: "Красный проспект, ориентир центр",
    districtText: "Центральный",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "realty-nsk-2",
    title: "Светлая студия для аренды",
    kind: "rent",
    localityId: PILOT_CITY.localityId,
    priceText: "от 28 000 ₽/мес",
    areaText: "28 м²",
    roomsText: "Студия",
    floorText: "4/9",
    addressText: "ул. Фрунзе, рядом с парком",
    districtText: "Железнодорожный",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "realty-nsk-3",
    title: "Новостройка · 1-комн. с видом",
    kind: "new_build",
    localityId: PILOT_CITY.localityId,
    priceText: "от 6,5 млн ₽",
    areaText: "42 м²",
    roomsText: "1 комн.",
    floorText: "12/18",
    addressText: "Октябрьский район",
    districtText: "Октябрьский",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "realty-nsk-4",
    title: "Семейная 3-комн. у Академгородка",
    kind: "sale",
    localityId: PILOT_CITY.localityId,
    priceText: "от 11 млн ₽",
    areaText: "78 м²",
    roomsText: "3 комн.",
    floorText: "3/5",
    addressText: "Академгородок",
    districtText: "Советский",
    imageUrl: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=800&q=80&auto=format&fit=crop",
    isDemo: true,
  },
  {
    id: "realty-nsk-5",
    title: "Лофт у вокзала",
    kind: "rent",
    localityId: PILOT_CITY.localityId,
    priceText: "от 45 000 ₽/мес",
    areaText: "61 м²",
    roomsText: "2 комн.",
    floorText: "2/4",
    addressText: "пл. Гарина-Михайловского",
    districtText: "Железнодорожный",
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80&auto=format&fit=crop",
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
