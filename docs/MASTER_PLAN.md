# Santero Город — мастер-план экосистемы

**Версия:** 1.2 · 2026-10-16  
**Пилот:** Новосибирск  
**Принцип:** не смешивать «спроектировано» и «работает». Demo всегда помечен.

См. также: `docs/PROGRESS.md` (галочки горизонтов).

---

## 1. Видение

Единое цифровое пространство жизни в городе: информация, карта, сервисы, работа, досуг, инфраструктура и бизнес — с честными границами demo / live / partner.

**Не цели ранних горизонтов:** полный 3D-twin всех зданий, оплата «как маркетплейс», госуслуги «как Госуслуги», меддиагностика.

---

## 2. Горизонты (чеклист)

### Horizon 1 — платформа ✅
Geography · News/Jobs demo · shell · CI · API v1 · DB layer ready

### Horizon 2 — цельная демонстрация ✅
Map B1 · Search · Places · honest labels · hybrid news · mobile smoke · Neon connect

### Horizon 3 — польза ✅
Alerts UI · live RSS≥2 · NSK places catalog · Open-Meteo · guest profile · moderation queue

### Horizon 4 — экосистема ✅ code
Events/Transport UI · Orgs · Realty · Notifications · Business shell · Map B2 · Design-2 · schema 1.1

**Owner ops (не код):** apply schema on Neon

### Horizon 5 — spatial + depth ✅ code
Map B3 layers + pitch · OSM pipeline docs · account model · catalogs F/G/N/O/Q/R · accessibility settings  
**Не закрыто кодом:** full OSM dump · real OAuth · mesh twin · full offline tiles → H6

### Horizon 6 — multi-city / ops / partner
Onboarding · SLA · Partner API · Push · UGC · Family · Commerce payments · Emergency official · real OAuth · full OSM in DB · PWA polish · leftover owner ops

---

## 3. Модули (статус)

| ID | Название | Статус |
|----|----------|--------|
| A | Home | partial+ |
| B | Map | B1–B3 shell |
| C | News | hybrid live+demo |
| D | Alerts | demo UI |
| E | Weather | Open-Meteo live |
| F | Medicine | catalog filter |
| G | Education | catalog filter |
| H | Jobs | demo only |
| I | Realty | demo |
| J/K | Commerce/Food | not started |
| L | Transport | ref catalog |
| M | Events | demo UI |
| N/O | Tourism/Sport | catalog |
| P | Family | H6 |
| Q/R | Municipal/Safety | demo contacts |
| S | Community | H6 |
| T | Search/Profile | partial |
| U | Business | shell |
| V | Notifications | local |
| W | Moderation | queue API |
| X | Accessibility | settings |
| Y | Emergency | H6 |
| Z/AA | Partner / multi-city | H6 |

---

## 4. Карта (уровни B)

| Level | Содержание | Статус |
|-------|------------|--------|
| B1 | 2D OSM + markers | ✅ |
| B2 | Category colors | ✅ |
| B3 | Layers + pitch/3D camera | ✅ shell |
| B3+ | Mesh twin / full offline | H6 |

---

## 5. Данные и закон

- RSS: metadata only  
- OSM: attribution required  
- Demo ≠ official alert  
- No paid APIs without owner OK  

---

## 6. Следующий фокус

1. H6 multi-city / partner  
2. Owner: Neon migrate  
3. Real OAuth when secrets ready  
