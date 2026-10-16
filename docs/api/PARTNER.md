# Partner API (module Z) — read-only

Base: `/api/v1/partner`

| Endpoint | Описание |
|----------|----------|
| `GET /places?localityId=` | Place catalog slice |
| `GET /news?localityId=` | News metadata (may include isDemo) |
| `GET /health` | Partner surface health |

Auth: optional `X-Partner-Key` matching env `PARTNER_API_KEY`. If env empty — open read (prototype).

Rate limits: not enforced in H6 prototype.
