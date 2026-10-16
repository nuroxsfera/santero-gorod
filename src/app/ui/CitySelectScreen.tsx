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

export function CitySelectScreen({
  city,
  onContinue,
  onPickManually,
  onCityResolved,
}: Props) {
  const start = () => {
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
  };

  return (
    <motion.div
      key="city-select"
      className="sg-ambient absolute inset-0 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mx-auto flex h-full w-full max-w-lg flex-col px-6 pb-10 pt-[max(3.5rem,env(safe-area-inset-top))]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--sg-blue)] shadow-[0_0_8px_var(--sg-blue-glow)]" />
            <span className="text-[12px] font-semibold tracking-wide text-[var(--sg-ink-muted)]">
              Santero Город
            </span>
          </div>
          <h1 className="text-[40px] font-semibold leading-[1.08] tracking-[-0.03em] text-[var(--sg-ink)]">
            Город
            <br />
            <span className="bg-gradient-to-r from-[var(--sg-blue)] to-[#6b8cff] bg-clip-text text-transparent">
              без лишнего
            </span>
          </h1>
          <p className="mt-5 max-w-[20rem] text-[17px] leading-relaxed text-[var(--sg-ink-muted)]">
            Карта, новости и сервисы — спокойно, красиво, по делу.
          </p>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="sg-glass-strong rounded-[var(--sg-radius-xl)] p-5">
            <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[var(--sg-ink-faint)]">
              Пилот
            </p>
            <p className="mt-1.5 text-[22px] font-semibold tracking-tight text-[var(--sg-ink)]">
              {city?.name ?? PILOT_CITY.name}
            </p>
            <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
              Новосибирская область
            </p>
          </div>

          <button
            type="button"
            onClick={start}
            className="flex w-full items-center justify-center rounded-[var(--sg-radius-lg)] bg-[var(--sg-blue)] py-[18px] text-[16px] font-semibold text-white shadow-[var(--sg-shadow-glow)] transition active:scale-[0.985]"
          >
            {city ? `Продолжить · ${city.name}` : `Начать · ${PILOT_CITY.name}`}
          </button>

          <button
            type="button"
            onClick={onPickManually}
            className="flex w-full items-center justify-center rounded-[var(--sg-radius-lg)] bg-white/60 py-[17px] text-[16px] font-medium text-[var(--sg-ink)] ring-1 ring-[var(--sg-border)] backdrop-blur-md transition active:scale-[0.985]"
          >
            Выбрать другой город
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
