"use client";

import { motion } from "framer-motion";
import { TABS, type Tab } from "../navigation";

function TabIcon({ active }: { active: boolean }) {
  return (
    <div className={`h-5 w-5 rounded-md ${active ? "bg-[#058BED]" : "bg-gray-300"}`} />
  );
}

interface Props {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

/** Floating bottom navigation — visual only for transport/more until those modules exist. */
export function BottomNav({ activeTab, onTabChange }: Props) {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-5">
      <div className="pointer-events-auto relative flex items-center gap-1 rounded-[28px] bg-white px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
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
            >
              <TabIcon active={isActive} />
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
      </div>
    </div>
  );
}
