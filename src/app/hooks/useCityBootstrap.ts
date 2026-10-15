"use client";

import { useEffect, useState } from "react";
import {
  getCityContext,
  getGeographicService,
  type Locality,
} from "@/geography";
import { PILOT_CITY } from "@/config/pilot";

/**
 * Hydrates last selected city, or pilot (Novosibirsk) when none saved.
 */
export function useCityBootstrap(): {
  city: Locality | null;
  setCity: (city: Locality | null) => void;
} {
  const [city, setCity] = useState<Locality | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const svc = getGeographicService();
        await svc.ensureLoaded();
        const ctx = getCityContext();
        const state = await ctx.hydrate();
        if (cancelled) return;
        if (state.selectedLocality) {
          setCity(state.selectedLocality);
          return;
        }
        const pilot = svc.searchCities({
          query: PILOT_CITY.searchQuery,
          limit: 1,
        }).items[0];
        if (pilot) {
          ctx.selectLocality(pilot);
          setCity(pilot);
        }
      } catch {
        /* leave null */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { city, setCity };
}
