"use client";

import { useState } from "react";
import {
  getOrCreateGuestSession,
  setGuestDisplayName,
  type GuestSession,
} from "../guest";

interface Props {
  onBack: () => void;
}

function readSession(): GuestSession {
  return getOrCreateGuestSession();
}

export function ProfileScreen({ onBack }: Props) {
  const [session, setSession] = useState<GuestSession>(() => readSession());
  const [name, setName] = useState(() => readSession().displayName ?? "");
  const [saved, setSaved] = useState(false);

  const save = () => {
    const next = setGuestDisplayName(name.trim() || null);
    setSession(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-3 bg-white/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[var(--sg-shadow-sm)] backdrop-blur">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)]"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Профиль</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-5">
        <div className="mb-4 rounded-[var(--sg-radius-lg)] bg-[var(--sg-blue-soft)] px-3 py-2 text-[12px] text-[var(--sg-blue-deep)]">
          Гостевой режим (H3). Аккаунт с паролем / OAuth — позже. Данные только на этом
          устройстве.
        </div>

        <label className="mb-1 block text-[13px] font-medium text-[var(--sg-ink-muted)]">
          Отображаемое имя
        </label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Как к вам обращаться"
          className="mb-3 w-full rounded-[var(--sg-radius-md)] bg-white px-3 py-2.5 text-[15px] outline-none ring-1 ring-[var(--sg-border)] focus:ring-2 focus:ring-[var(--sg-blue)]/40"
        />
        <button
          type="button"
          onClick={save}
          className="rounded-[var(--sg-radius-pill)] bg-[var(--sg-blue)] px-5 py-2.5 text-[14px] font-semibold text-white"
        >
          {saved ? "Сохранено" : "Сохранить"}
        </button>

        <div className="mt-6 rounded-[var(--sg-radius-lg)] bg-white p-4 text-[13px] text-[var(--sg-ink-muted)] ring-1 ring-[var(--sg-border)]">
          <p>
            <span className="font-semibold text-[var(--sg-ink)]">ID гостя:</span>{" "}
            <span className="break-all font-mono text-[11px]">{session.id}</span>
          </p>
          <p className="mt-2">
            <span className="font-semibold text-[var(--sg-ink)]">Создан:</span>{" "}
            {new Date(session.createdAt).toLocaleString("ru-RU")}
          </p>
        </div>
      </div>
    </div>
  );
}
