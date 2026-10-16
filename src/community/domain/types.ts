export type CommunityPostStatus = "pending" | "published" | "rejected";

export interface CommunityPost {
  id: string;
  title: string;
  body: string;
  localityId: string | null;
  status: CommunityPostStatus;
  authorLabel: string;
  createdAt: string;
  isDemo: boolean;
}
