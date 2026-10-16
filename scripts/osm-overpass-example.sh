#!/usr/bin/env bash
# Example Overpass query bbox ~ Novosibirsk. Do not hammer the public API.
# Usage: ./scripts/osm-overpass-example.sh > /tmp/nsk-amenities.json
set -euo pipefail
QUERY='[out:json][timeout:60];
(
  node["amenity"~"hospital|clinic|school|university|theatre|cinema"](54.80,82.70,55.15,83.20);
  way["amenity"~"hospital|clinic|school|university|theatre|cinema"](54.80,82.70,55.15,83.20);
);
out center 50;'
curl -sS -X POST "https://overpass-api.de/api/interpreter" --data-urlencode "data=${QUERY}"
