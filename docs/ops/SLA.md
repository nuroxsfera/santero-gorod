# Data SLA (H6)

| Источник | Ожидание | Fallback |
|----------|----------|----------|
| App API `/api/v1/health` | 99% uptime target (best-effort) | — |
| Open-Meteo weather | best-effort | empty widget |
| RSS news | best-effort, metadata only | demo articles |
| Neon Postgres | optional | in-memory |
| OSM tiles | third-party | map error state |

**Правило:** при деградации UI показывает честный empty/error, не выдуманные данные.

Проверка: `GET /api/v1/ops/sources`
