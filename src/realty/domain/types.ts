export type RealtyKind = "sale" | "rent" | "new_build" | "other";

export interface RealtyListing {
  id: string;
  title: string;
  kind: RealtyKind;
  localityId: string | null;
  /** Display price — demo labels allowed */
  priceText: string;
  areaText: string | null;
  roomsText: string | null;
  floorText: string | null;
  addressText: string | null;
  districtText: string | null;
  /** Cover image URL (demo stock / placeholder) */
  imageUrl: string | null;
  isDemo: boolean;
}
