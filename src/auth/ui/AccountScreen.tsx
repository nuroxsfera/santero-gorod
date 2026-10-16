"use client";

import { useState } from "react";
import { getOrCreateGuestSession } from "../guest";
import { getAccountState } from "../domain/account";

interface Props {
  onBack: () => void;
  onOpenProfile: () => void;
}

export function AccountScreen({ onBack, onOpenProfile }: Props) {
  const [state] = useState(() => {
    const g = getOrCreateGuestSession();
    return getAccountState(g.displayName);
  });

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Аккаунт</h1>
      </header>
      <div className="flex-1 px-4 py-4">
        <div className="mb-3 rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
          <p className="text-[13px] text-[var(--sg-ink-faint)]">Режим</p>
          <p className="text-[16px] font-semibold text-[var(--sg-ink)]">
            {state.mode === "guest" ? "Гость" : "Зарегистрирован"}
          </p>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--sg-ink-muted)]">{state.note}</p>
        </div>
        <button
          type="button"
          onClick={onOpenProfile}
          className="mb-3 w-full rounded-[var(--sg-radius-lg)] bg-white/90 p-4 text-left ring-1 ring-[var(--sg-border)]"
        >
          <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Имя гостя</p>
          <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">
            {state.displayName || "Не задано"} · изменить
          </p>
        </button>
        <button
          type="button"
          disabled
          className="w-full rounded-[var(--sg-radius-lg)] bg-[var(--sg-surface)] p-4 text-left opacity-70 ring-1 ring-[var(--sg-border)]"
        >
          <p className="text-[15px] font-semibold text-[var(--sg-ink)]">Войти через OAuth</p>
          <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">Скоро · нужны секреты провайдера</p>
        </button>
      </div>
    </div>
  );
}
