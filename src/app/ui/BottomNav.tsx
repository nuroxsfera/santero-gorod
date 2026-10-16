"use client";

import { motion } from "framer-motion";
import { TABS, type Tab } from "../navigation";

function IconHome({ active }: { active: boolean }) {
  const c = active ? "var(--sg-blue)" : "#9aa5b5";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 10.5L12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5z"
        stroke={c}
        strokeWidth="1.7"
        strokeLinejoin="round"
        fill={active ? "rgba(10,132,255,0.14)" : "none"}
      />
    </svg>
  );
}

function IconTransport({ active }: { active: boolean }) {
  const c = active ? "var(--sg-blue)" : "#9aa5b5";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="5" y="3" width="14" height="14" rx="2.5" stroke={c} strokeWidth="1.7" />
      <path d="M5 10h14M9 17v2M15 17v2" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="8.5" cy="13.5" r="1" fill={c} />
      <circle cx="15.5" cy="13.5" r="1" fill={c} />
    </svg>
  );
}

function IconNews({ active }: { active: boolean }) {
  const c = active ? "var(--sg-blue)" : "#9aa5b5";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 5h11a2 2 0 0 1 2 2v11H7a2 2 0 0 1-2-2V5z" stroke={c} strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 9h7M8 13h5" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IconMore({ active }: { active: boolean }) {
  const c = active ? "var(--sg-blue)" : "#9aa5b5";
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="6" cy="12" r="1.65" fill={c} />
      <circle cx="12" cy="12" r="1.65" fill={c} />
      <circle cx="18" cy="12" r="1.65" fill={c} />
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
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center px-5 pb-[max(1.35rem,env(safe-area-inset-bottom))]">
      <nav
        className="pointer-events-auto relative flex items-center gap-0.5 rounded-[30px] border border-white/70 bg-white/85 px-1.5 py-1.5 shadow-[var(--sg-shadow-nav)] backdrop-blur-2xl"
        aria-label="Основная навигация"
      >
        <motion.div
          className="absolute top-1.5 h-[52px] rounded-[24px] bg-[var(--sg-blue-soft)]"
          layoutId="tab-indicator"
          animate={{
            left: TABS.findIndex((t) => t.id === activeTab) * 78 + 6,
            width: 74,
          }}
          transition={{ type: "spring", stiffness: 480, damping: 34 }}
        />
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className="relative z-10 flex w-[78px] flex-col items-center gap-0.5 py-2.5"
              aria-current={isActive ? "page" : undefined}
            >
              <TabIcon tab={tab.id} active={isActive} />
              <span
                className={`text-[10px] font-semibold tracking-tight ${
                  isActive ? "text-[var(--sg-blue)]" : "text-[var(--sg-ink-faint)]"
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
