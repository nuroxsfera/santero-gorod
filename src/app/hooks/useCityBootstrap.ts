"use client";

import { useEffect, useState } from "react";
import {
  getCityContext,
  getGeographicService,
  type Locality,
} from "@/geography";

/**
 * Loads Geography service and hydrates last selected city (or Moscow seed).
 * Does not change browsing city on resume/applications data.
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
        } else {
          const moscow = svc.searchCities({ query: "Москва", limit: 1 }).items[0];
          if (moscow) {
            ctx.selectLocality(moscow);
            setCity(moscow);
          }
        }
      } catch {
        /* seed / offline fallback — leave city null */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { city, setCity };
}
