export type RealtyKind = "sale" | "rent" | "new_build" | "other";

export interface RealtyListing {
  id: string;
  title: string;
  kind: RealtyKind;
  localityId: string | null;
  priceText: string;
  areaText: string | null;
  isDemo: boolean;
}
