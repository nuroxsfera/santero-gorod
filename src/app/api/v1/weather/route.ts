import { NextRequest, NextResponse } from "next/server";
import { fetchOpenMeteoCurrent } from "@/weather/service/openMeteo";
import { PILOT_CITY } from "@/config/pilot";

/** GET /api/v1/weather — Open-Meteo, no API key */
export async function GET(req: NextRequest) {
  try {
    const sp = req.nextUrl.searchParams;
    const lat = Number(sp.get("lat") || PILOT_CITY.lat);
    const lon = Number(sp.get("lon") || PILOT_CITY.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) {
      return NextResponse.json({ error: "BAD_COORDS" }, { status: 400 });
    }
    const snapshot = await fetchOpenMeteoCurrent({
      lat,
      lon,
      localityId: sp.get("localityId") || PILOT_CITY.localityId,
      localityName: sp.get("localityName") || PILOT_CITY.name,
    });
    return NextResponse.json(snapshot);
  } catch (e) {
    const message = e instanceof Error ? e.message : "WEATHER_FAILED";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
