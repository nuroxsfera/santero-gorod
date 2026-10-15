"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Locality } from "@/geography";
import type { Tab } from "../navigation";
import { BottomNav } from "./BottomNav";

interface Props {
  city: Locality | null;
  activeTab: Tab;
  onOpenCityList: () => void;
  onOpenJobs: () => void;
  onOpenNews: () => void;
  onTabChange: (tab: Tab) => void;
}

/**
 * Main home shell. Jobs/News open real modules.
 * Transport / Places shortcuts are not implemented yet.
 */
export function MainHomeScreen({
  city,
  activeTab,
  onOpenCityList,
  onOpenJobs,
  onOpenNews,
  onTabChange,
}: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cityName = city?.name ?? "Город";

  return (
    <motion.div
      key="main"
      className="absolute inset-0 flex flex-col bg-[#F2F4F7]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mx-auto flex h-full w-full max-w-lg flex-col">
        <motion.div
          className="relative z-20 overflow-hidden bg-[#058BED]"
          animate={{
            borderBottomLeftRadius: collapsed ? 20 : 32,
            borderBottomRightRadius: collapsed ? 20 : 32,
          }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={onOpenCityList}
              className="flex items-center gap-1.5 rounded-2xl bg-white/20 px-3.5 py-2 active:bg-white/30"
            >
              <span className="text-[15px] font-semibold text-white">{cityName}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M4 6l4 4 4-4"
                  stroke="white"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          <motion.div
            className="overflow-hidden px-4"
            animate={{
              height: collapsed ? 0 : "auto",
              opacity: collapsed ? 0 : 1,
              paddingBottom: collapsed ? 0 : 16,
            }}
            transition={{ duration: 0.28 }}
          >
            <div className="flex gap-2.5 overflow-x-auto pb-1">
              <Shortcut label="Транспорт" subtitle="Скоро" />
              <Shortcut label="События" subtitle="Новости" onClick={onOpenNews} />
              <Shortcut label="Работа" subtitle="Открыть" onClick={onOpenJobs} />
              <Shortcut label="Места" subtitle="Скоро" />
            </div>
          </motion.div>
        </motion.div>

        <div
          ref={scrollRef}
          onScroll={() => {
            if (scrollRef.current) setCollapsed(scrollRef.current.scrollTop > 40);
          }}
          className="flex-1 overflow-y-auto px-4 pt-4"
          style={{ paddingBottom: 100 }}
        >
          <div className="space-y-3">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Сегодня рядом</h3>
              <p className="text-[13px] text-gray-500">
                События · {cityName} — раздел пока не подключён
              </p>
            </div>
            <button
              type="button"
              onClick={onOpenJobs}
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
            >
              <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Вакансии</h3>
              <p className="text-[13px] text-gray-500">Работа · {cityName}</p>
            </button>
            <button
              type="button"
              onClick={onOpenNews}
              className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]"
            >
              <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Новости города</h3>
              <p className="text-[13px] text-gray-500">Лента · {cityName}</p>
            </button>
          </div>
        </div>

        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </div>
    </motion.div>
  );
}

function Shortcut({
  label,
  subtitle,
  onClick,
}: {
  label: string;
  subtitle: string;
  onClick?: () => void;
}) {
  const className =
    "flex h-[100px] w-[110px] shrink-0 flex-col justify-end rounded-2xl bg-white p-3.5 text-left";
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={`${className} active:scale-[0.98]`}>
        <p className="text-[13px] font-semibold text-gray-900">{label}</p>
        <p className="mt-0.5 text-[10px] text-gray-400">{subtitle}</p>
      </button>
    );
  }
  return (
    <div className={className}>
      <p className="text-[13px] font-semibold text-gray-900">{label}</p>
      <p className="mt-0.5 text-[10px] text-gray-400">{subtitle}</p>
    </div>
  );
}
