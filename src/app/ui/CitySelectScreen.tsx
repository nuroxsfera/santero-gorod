"use client";

import { motion } from "framer-motion";
import {
  getCityContext,
  getGeographicService,
  type Locality,
} from "@/geography";
import { PILOT_CITY } from "@/config/pilot";

interface Props {
  city: Locality | null;
  onContinue: (city: Locality | null) => void;
  onPickManually: () => void;
  onCityResolved: (city: Locality) => void;
}

/** Welcome / city entry — default resolve to pilot Novosibirsk. */
export function CitySelectScreen({
  city,
  onContinue,
  onPickManually,
  onCityResolved,
}: Props) {
  return (
    <motion.div
      key="city-select"
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900">
          Santero Город
        </h1>
        <p className="mb-2 text-center text-base text-gray-500">
          Всё для жизни в вашем городе
        </p>
        <p className="mb-10 text-center text-xs text-gray-400">
          Пилот: {PILOT_CITY.name}
        </p>
        <button
          type="button"
          onClick={() => {
            if (city) {
              onContinue(city);
              return;
            }
            const pilot = getGeographicService().searchCities({
              query: PILOT_CITY.searchQuery,
              limit: 1,
            }).items[0];
            if (pilot) {
              getCityContext().selectLocality(pilot);
              onCityResolved(pilot);
            }
            onContinue(pilot ?? null);
          }}
          className="mb-3 flex w-full items-center justify-center rounded-2xl bg-[#058BED] py-4 text-[17px] font-medium text-white active:scale-[0.98]"
        >
          {city ? `Продолжить · ${city.name}` : `Начать · ${PILOT_CITY.name}`}
        </button>
        <button
          type="button"
          onClick={onPickManually}
          className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 text-[17px] font-medium text-gray-800 active:scale-[0.98]"
        >
          Выбрать другой город
        </button>
      </div>
    </motion.div>
  );
}
