# OSM extract pipeline (Horizon 5)

## Цель

Воспроизводимый путь от OpenStreetMap к каталогу Place для пилота (Новосибирск), без нелегального скрейпинга.

## Что есть сейчас

- Curated catalog: `src/places/data/nskCatalog.ts` (~25 POI)
- Карта: MapLibre + raster OSM tiles (B1–B3)
- **Нет** полного city dump в Neon

## Рекомендуемый pipeline (ops)

1. **Источник:** [Geofabrik](https://download.geofabrik.de/) Siberia/Russia extract **или** Overpass API с bbox Новосибирска  
2. **Фильтр:** amenity, tourism, leisure, public_transport, building (опционально)  
3. **Нормализация:** name, lat/lon, category mapping → `Place`  
4. **Загрузка:** CSV/JSON → `places` table (schema 1.1)  
5. **Лицензия:** © OpenStreetMap contributors; ODbL share-alike  

## Скрипт-заготовка

См. `scripts/osm-overpass-example.sh` — пример запроса Overpass. Не гонять часто (rate limits).

## Offline tiles

Полный offline cache всех zoom — ops H6 (хранение, лицензии тайлов). В продукте: online raster + честная подпись.
