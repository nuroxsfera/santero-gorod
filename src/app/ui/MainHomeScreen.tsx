"use client";

import { useRef, useState, type ReactNode } from "react";
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
      className="sg-ambient absolute inset-0 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="mx-auto flex h-full w-full max-w-lg flex-col">
        <div className="relative z-20 px-4 pb-1 pt-[max(0.85rem,env(safe-area-inset-top))]">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenCityList}
              className="sg-glass flex min-w-0 flex-1 items-center gap-2.5 rounded-[var(--sg-radius-pill)] px-3.5 py-2.5 transition active:scale-[0.99]"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--sg-blue-soft)]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z"
                    stroke="var(--sg-blue)"
                    strokeWidth="1.8"
                    fill="rgba(10,132,255,0.15)"
                  />
                  <circle cx="12" cy="10" r="2.2" fill="var(--sg-blue)" />
                </svg>
              </span>
              <span className="truncate text-[15px] font-semibold tracking-tight text-[var(--sg-ink)]">
                {cityName}
              </span>
              <svg className="ml-auto shrink-0 text-[var(--sg-ink-faint)]" width="14" height="14" viewBox="0 0 16 16">
                <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onOpenSearch}
              className="sg-glass flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition active:scale-95"
              aria-label="Поиск"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="6.5" stroke="var(--sg-ink-muted)" strokeWidth="1.8" />
                <path d="M16 16l4 4" stroke="var(--sg-ink-muted)" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={() => {
            if (scrollRef.current) setCollapsed(scrollRef.current.scrollTop > 20);
          }}
          className="flex-1 overflow-y-auto px-4"
          style={{ paddingBottom: 128 }}
        >
          <motion.div
            className="sg-hero-gradient relative mb-6 overflow-hidden rounded-[var(--sg-radius-xl)] text-white shadow-[var(--sg-shadow-glow)]"
            animate={{
              minHeight: collapsed ? 64 : 148,
            }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 left-8 h-32 w-32 rounded-full bg-[#0047b8]/30 blur-2xl" />
            <div className="relative px-5 py-5">
              {!collapsed ? (
                <>
                  <div className="mb-3 flex items-center gap-2">
                    {isPilot && (
                      <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold backdrop-blur-md">
                        Пилот
                      </span>
                    )}
                    <span className="text-[12px] font-medium text-white/70">Сегодня</span>
                  </div>
                  <h2 className="text-[26px] font-semibold leading-tight tracking-[-0.02em]">
                    {cityName}
                  </h2>
                  <p className="mt-1.5 max-w-[16rem] text-[14px] leading-snug text-white/80">
                    Всё важное — на одном спокойном экране
                  </p>
                </>
              ) : (
                <p className="text-[16px] font-semibold leading-[32px] tracking-tight">{cityName}</p>
              )}
            </div>
          </motion.div>

          <p className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sg-ink-faint)]">
            Сервисы
          </p>
          <div className="mb-7 grid grid-cols-2 gap-3">
            <ServiceTile
              title="Карта"
              subtitle="Слои · B3"
              onClick={onOpenMap}
              tone="blue"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5V6.5z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  <path d="M9 4v13.5M15 6.5V20" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              }
            />
            <ServiceTile
              title="Новости"
              subtitle="Live + RSS"
              onClick={onOpenNews}
              tone="violet"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M5 5h12a2 2 0 012 2v11H7a2 2 0 01-2-2V5z" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 9h8M8 13h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              }
            />
            <ServiceTile
              title="Места"
              subtitle="Каталог НСК"
              onClick={onOpenPlaces}
              tone="teal"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s7-5.5 7-11a7 7 0 10-14 0c0 5.5 7 11 7 11z" stroke="currentColor" strokeWidth="1.6" />
                  <circle cx="12" cy="10" r="2.2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              }
            />
            <ServiceTile
              title="Работа"
              subtitle="Демо"
              onClick={onOpenJobs}
              tone="amber"
              icon={
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              }
            />
          </div>

          <p className="mb-3 px-1 text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--sg-ink-faint)]">
            Сейчас
          </p>
          <div className="space-y-3">
            <WeatherCard city={city} />
            <button
              type="button"
              onClick={onOpenAlerts}
              className="sg-glass-strong group flex w-full items-center gap-4 rounded-[var(--sg-radius-lg)] p-4 text-left transition active:scale-[0.99]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-amber-50 text-amber-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M12 9v4M12 17h.01M10.3 4.3L2.8 18a2 2 0 001.7 3h15a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-[var(--sg-ink)]">Предупреждения</span>
                <span className="mt-0.5 block text-[13px] text-[var(--sg-ink-muted)]">Честная лента · без шума</span>
              </span>
              <svg className="shrink-0 text-[var(--sg-ink-faint)] opacity-60" width="16" height="16" viewBox="0 0 16 16">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </button>
            <button
              type="button"
              onClick={onOpenMap}
              className="sg-glass-strong group flex w-full items-center gap-4 rounded-[var(--sg-radius-lg)] p-4 text-left transition active:scale-[0.99]"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 6.5l6-2.5 6 2.5 6-2.5v13.5l-6 2.5-6-2.5-6 2.5V6.5z" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold text-[var(--sg-ink)]">Открыть карту</span>
                <span className="mt-0.5 block text-[13px] text-[var(--sg-ink-muted)]">Места · слои · OpenStreetMap</span>
              </span>
              <svg className="shrink-0 text-[var(--sg-ink-faint)] opacity-60" width="16" height="16" viewBox="0 0 16 16">
                <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </motion.div>
  );
}

const TONE: Record<string, { bg: string; fg: string }> = {
  blue: { bg: "rgba(10,132,255,0.12)", fg: "#0a84ff" },
  violet: { bg: "rgba(120,90,255,0.12)", fg: "#6d5efc" },
  teal: { bg: "rgba(16,185,129,0.12)", fg: "#0d9488" },
  amber: { bg: "rgba(245,158,11,0.14)", fg: "#d97706" },
};

function ServiceTile({
  title,
  subtitle,
  onClick,
  tone,
  icon,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
  tone: keyof typeof TONE;
  icon: ReactNode;
}) {
  const t = TONE[tone];
  return (
    <button
      type="button"
      onClick={onClick}
      className="sg-glass-strong flex flex-col items-start rounded-[var(--sg-radius-lg)] p-4 text-left transition active:scale-[0.97]"
    >
      <span
        className="mb-3.5 flex h-11 w-11 items-center justify-center rounded-[15px]"
        style={{ background: t.bg, color: t.fg }}
      >
        {icon}
      </span>
      <span className="text-[15px] font-semibold tracking-tight text-[var(--sg-ink)]">{title}</span>
      <span className="mt-0.5 text-[12px] text-[var(--sg-ink-faint)]">{subtitle}</span>
    </button>
  );
}
