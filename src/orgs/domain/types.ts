export type OrgKind =
  | "business"
  | "government"
  | "education"
  | "health"
  | "culture"
  | "other";

export interface Organization {
  id: string;
  name: string;
  kind: OrgKind;
  localityId: string | null;
  summary: string;
  placeId: string | null;
  website: string | null;
  isDemo: boolean;
}

export interface OrgQuery {
  localityId?: string | null;
  query?: string;
  limit?: number;
}
