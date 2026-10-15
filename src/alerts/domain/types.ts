/**
 * City alerts / disruptions — Horizon 3 foundation.
 * Never claim "your building is affected" without precise geo data.
 */

export type AlertSeverity = "info" | "warning" | "critical";
export type AlertStatus = "planned" | "active" | "resolved";
export type AlertCategory =
  | "utilities"
  | "transport"
  | "weather"
  | "safety"
  | "other";

export interface CityAlert {
  id: string;
  title: string;
  summary: string;
  category: AlertCategory;
  severity: AlertSeverity;
  status: AlertStatus;
  localityId: string | null;
  regionId: string | null;
  /** Human-readable area, not address-level claims */
  areaText: string | null;
  sourceName: string;
  sourceUrl: string | null;
  startsAt: string | null;
  endsAt: string | null;
  publishedAt: string;
  isDemo: boolean;
  isOfficial: boolean;
}

export interface AlertQuery {
  localityId?: string | null;
  regionId?: string | null;
  status?: AlertStatus | "all";
  limit?: number;
  offset?: number;
}

export interface AlertListResult {
  items: CityAlert[];
  total: number;
  isDemo: boolean;
}
