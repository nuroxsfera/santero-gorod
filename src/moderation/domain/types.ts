/**
 * Content moderation basics — Horizon 3 minimum (module W).
 * No public admin UI yet; queue + decisions for future pipelines.
 */

export type ModerationTargetType = "news" | "job" | "place" | "alert" | "other";
export type ModerationStatus = "pending" | "approved" | "rejected" | "flagged";

export interface ModerationItem {
  id: string;
  targetType: ModerationTargetType;
  targetId: string;
  reason: string;
  status: ModerationStatus;
  createdAt: string;
  decidedAt: string | null;
  isDemo: boolean;
}

export interface ModerationQuery {
  status?: ModerationStatus | "all";
  limit?: number;
}
