# Push notifications (H6)

**Статус:** каркас. FCM/APNs **не подключены** (нужны ключи владельца).

План:

1. Web Push VAPID keys in env
2. Subscription table in Postgres
3. Worker on alert/news events

Пока: in-app `NotificationsScreen` only.
