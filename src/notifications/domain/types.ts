export type NotificationKind = "system" | "news" | "alert" | "other";

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  body: string;
  createdAt: string;
  read: boolean;
  isDemo: boolean;
}
