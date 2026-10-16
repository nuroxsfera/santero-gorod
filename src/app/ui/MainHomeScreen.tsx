"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Locality } from "@/geography";
import { PILOT_CITY } from "@/config/pilot";
import { WeatherCard } from "@/weather";
import type { Tab } from "../navigation";
import { BottomNav } from "./BottomNav";

interface Props {
  city: Locality | null;
  activeTab: Tab;
  onOpenCityList: () => void;
  onOpenJobs: () => void;
  onOpenNews: () => void;
  onOpenPlaces: () => void;
  onOpenMap: () => void;
  onOpenSearch: () => void;
  onOpenAlerts: () => void;
  onTabChange: (tab: Tab) => void;
}

export function MainHomeScreen({
  city,
  activeTab,
  onOpenCityList,
  onOpenJobs,
  onOpenNews,
  onOpenPlaces,
  onOpenMap,
  onOpenSearch,
  onOpenAlerts,
  onTabChange,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cityName = city?.name ?? "Город";
  const isPilot =
    city?.id === PILOT_CITY.localityId || city?.name === PILOT_CITY.name;

  return (
    <motion.div
      key="main"
      className="absolute inset-0 flex flex-col bg-[var(--sg-surface)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-full w-full max-w-lg flex-col">
        <div className="relative z-20 px-4 pb-2 pt-[max(0.75rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenCityList}
              className="flex min-w-0 flex-1 items-center gap-2 rounded-[var(--sg-radius-pill)] bg-white px-4 py-2.5 shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.99]"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--sg-blue-soft)] text-[13px]">
                📍
              </span>
              <span className="truncate text-[15px] font-semibold text-[var(--sg-ink)]">
                {cityName}
              </span>
              <svg className="ml-auto shrink-0 opacity-40" width="14" height="14" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onOpenSearch}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-95"
              aria-label="Поиск"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="#64748b" strokeWidth="1.8" />
                <path d="M16 16l4 4" stroke="#64748b" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={() => {
            if (scrollRef.current) setCollapsed(scrollRef.current.scrollTop > 24);
          }}
          className="flex-1 overflow-y-auto px-4"
          style={{ paddingBottom: 120 }}
        >
          <motion.div
            className="mb-5 overflow-hidden rounded-[var(--sg-radius-xl)] p-5 text-white shadow-[var(--sg-shadow-md)]"
            style={{
              background:
                "linear-gradient(145deg, #3ba4f5 0%, #058BED 50%, #0369b1 100%)",
            }}
            animate={{ height: collapsed ? 72 : "auto", opacity: 1 }}
            transition={{ duration: 0.28 }}
          >
            {!collapsed && (
              <>
                <div className="mb-1 flex items-center gap-2">
                  {isPilot && (
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur">
                      Пилот
                    </span>
                  )}
                </div>
                <h2 className="text-[22px] font-semibold leading-tight tracking-tight">
                  Добро пожаловать
                </h2>
                <p className="mt-1.5 text-[14px] leading-snug text-white/85">
                  Карта, сервисы и городская информация — без лишнего шума.
                </p>
              </>
            )}
            {collapsed && (
              <p className="text-[15px] font-semibold leading-[40px]">{cityName}</p>
            )}
          </motion.div>

          <p className="mb-3 px-0.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--sg-ink-faint)]">
            Сервисы
          </p>
          <div className="mb-6 grid grid-cols-2 gap-3">
            <ServiceTile title="Карта" subtitle="2D · OSM" accent="#e8f4fd" icon="🗺️" onClick={onOpenMap} />
            <ServiceTile title="Новости" subtitle="Live + демо" accent="#f0f9ff" icon="📰" onClick={onOpenNews} />
            <ServiceTile title="Работа" subtitle="Только демо" accent="#f0fdf4" icon="💼" onClick={onOpenJobs} />
            <ServiceTile title="Места" subtitle="Каталог НСК" accent="#fefce8" icon="📍" onClick={onOpenPlaces} />
          </div>

          <p className="mb-3 px-0.5 text-[13px] font-semibold uppercase tracking-[0.06em] text-[var(--sg-ink-faint)]">
            Сейчас
          </p>
          <div className="space-y-3">
            <WeatherCard city={city} />
            <button
              type="button"
              onClick={onOpenAlerts}
              className="w-full rounded-[var(--sg-radius-lg)] bg-white p-4 text-left shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.99]"
            >
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Предупреждения</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
                Demo-лента · без фейковых угроз
              </p>
            </button>
            <button
              type="button"
              onClick={onOpenMap}
              className="w-full rounded-[var(--sg-radius-lg)] bg-white p-4 text-left shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.99]"
            >
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Открыть карту</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
                Новосибирск · каталог мест · OpenStreetMap
              </p>
            </button>
          </div>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </motion.div>
  );
}

function ServiceTile({
  title,
  subtitle,
  accent,
  icon,
  onClick,
}: {
  title: string;
  subtitle: string;
  accent: string;
  icon: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-start rounded-[var(--sg-radius-lg)] bg-white p-4 text-left shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)] transition active:scale-[0.98]"
    >
      <span
        className="mb-3 flex h-11 w-11 items-center justify-center rounded-[14px] text-[20px]"
        style={{ background: accent }}
      >
        {icon}
      </span>
      <span className="text-[15px] font-semibold text-[var(--sg-ink)]">{title}</span>
      <span className="mt-0.5 text-[12px] text-[var(--sg-ink-faint)]">{subtitle}</span>
    </button>
  );
}
