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
      className="absolute inset-0 flex flex-col bg-[var(--sg-surface)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto flex h-full w-full max-w-lg flex-col px-6 pb-10 pt-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--sg-blue)]">
            Santero Город
          </p>
          <h1 className="text-[34px] font-semibold leading-[1.15] tracking-tight text-[var(--sg-ink)]">
            Всё для жизни
            <br />
            в вашем городе
          </h1>
          <p className="mt-4 max-w-sm text-[16px] leading-relaxed text-[var(--sg-ink-muted)]">
            Карта, новости, работа и сервисы — в одном спокойном пространстве.
          </p>
        </motion.div>

        <div className="flex-1" />

        <motion.div
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          <div className="rounded-[var(--sg-radius-lg)] bg-white p-4 shadow-[var(--sg-shadow-md)] ring-1 ring-[var(--sg-border)]">
            <p className="text-[12px] font-medium text-[var(--sg-ink-faint)]">Пилотный город</p>
            <p className="mt-1 text-[18px] font-semibold text-[var(--sg-ink)]">
              {city?.name ?? PILOT_CITY.name}
            </p>
          </div>

          <button
            type="button"
            onClick={start}
            className="flex w-full items-center justify-center rounded-[var(--sg-radius-lg)] bg-[var(--sg-blue)] py-[18px] text-[16px] font-semibold text-white shadow-[0_8px_24px_rgba(5,139,237,0.35)] transition active:scale-[0.98]"
          >
            {city ? `Продолжить · ${city.name}` : `Начать · ${PILOT_CITY.name}`}
          </button>

          <button
            type="button"
            onClick={onPickManually}
            className="flex w-full items-center justify-center rounded-[var(--sg-radius-lg)] bg-white py-[18px] text-[16px] font-medium text-[var(--sg-ink)] shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.98]"
          >
            Выбрать другой город
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
