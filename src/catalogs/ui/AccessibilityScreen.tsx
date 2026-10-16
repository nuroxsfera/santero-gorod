"use client";

import { useEffect, useState } from "react";

const KEY = "sg-a11y";

type A11y = { largeText: boolean; reduceMotion: boolean };

function load(): A11y {
  if (typeof window === "undefined") return { largeText: false, reduceMotion: false };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { largeText: false, reduceMotion: false };
    return JSON.parse(raw) as A11y;
  } catch {
    return { largeText: false, reduceMotion: false };
  }
}

function apply(a: A11y) {
  document.documentElement.style.fontSize = a.largeText ? "18px" : "";
  document.documentElement.dataset.reduceMotion = a.reduceMotion ? "1" : "0";
}

interface Props {
  onBack: () => void;
}

export function AccessibilityScreen({ onBack }: Props) {
  const [a, setA] = useState<A11y>({ largeText: false, reduceMotion: false });

  useEffect(() => {
    const v = load();
    setA(v);
    apply(v);
  }, []);

  const update = (patch: Partial<A11y>) => {
    const next = { ...a, ...patch };
    setA(next);
    localStorage.setItem(KEY, JSON.stringify(next));
    apply(next);
  };

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Доступность</h1>
      </header>
      <div className="flex-1 px-4 py-4 space-y-3">
        <label className="flex items-center justify-between rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
          <span className="text-[15px] font-medium text-[var(--sg-ink)]">Крупный текст</span>
          <input
            type="checkbox"
            checked={a.largeText}
            onChange={(e) => update({ largeText: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
          <span className="text-[15px] font-medium text-[var(--sg-ink)]">Меньше анимаций</span>
          <input
            type="checkbox"
            checked={a.reduceMotion}
            onChange={(e) => update({ reduceMotion: e.target.checked })}
          />
        </label>
        <p className="text-[12px] text-[var(--sg-ink-muted)]">Настройки хранятся только на устройстве.</p>
      </div>
    </div>
  );
}
