"use client";

import { motion } from "framer-motion";
import { TABS, type Tab } from "../navigation";

function IconHome({ active }: { active: boolean }) {
  const c = active ? "#058BED" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"
        stroke={c}
        strokeWidth="1.8"
        strokeLinejoin="round"
        fill={active ? "#058BED22" : "none"}
      />
    </svg>
  );
}

function IconTransport({ active }: { active: boolean }) {
  const c = active ? "#058BED" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="3" width="14" height="14" rx="2" stroke={c} strokeWidth="1.8" />
      <path d="M5 10h14M9 17v2M15 17v2" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="8.5" cy="13.5" r="1" fill={c} />
      <circle cx="15.5" cy="13.5" r="1" fill={c} />
    </svg>
  );
}

function IconNews({ active }: { active: boolean }) {
  const c = active ? "#058BED" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5 5h11a2 2 0 0 1 2 2v11H7a2 2 0 0 1-2-2V5z"
        stroke={c}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M8 9h7M8 13h5" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M18 8v10a2 2 0 0 0 2-2V10" stroke={c} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function IconMore({ active }: { active: boolean }) {
  const c = active ? "#058BED" : "#9CA3AF";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="1.6" fill={c} />
      <circle cx="12" cy="12" r="1.6" fill={c} />
      <circle cx="18" cy="12" r="1.6" fill={c} />
    </svg>
  );
}

function TabIcon({ tab, active }: { tab: Tab; active: boolean }) {
  switch (tab) {
    case "home":
      return <IconHome active={active} />;
    case "transport":
      return <IconTransport active={active} />;
    case "news":
      return <IconNews active={active} />;
    case "more":
      return <IconMore active={active} />;
    default:
      return null;
  }
}

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

export function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-5 safe-area-pb">
      <nav
        className="pointer-events-auto relative flex items-center gap-1 rounded-[28px] bg-white px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        aria-label="Основная навигация"
      >
        <motion.div
          className="absolute top-2 h-11 rounded-full bg-[#058BED]/12"
          layoutId="tab-indicator"
          animate={{
            left: TABS.findIndex((t) => t.id === activeTab) * 72 + 8,
            width: 64,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="relative z-10 flex w-[72px] flex-col items-center gap-0.5 py-1.5"
              aria-current={isActive ? "page" : undefined}
            >
              <TabIcon tab={tab.id} active={isActive} />
              <span
                className={`text-[10px] font-medium ${
                  isActive ? "text-[#058BED]" : "text-gray-400"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
