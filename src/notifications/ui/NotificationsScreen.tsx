"use client";

import { useState } from "react";
import type { AppNotification } from "../domain/types";

const SEED: AppNotification[] = [
  {
    id: "n1",
    kind: "system",
    title: "Добро пожаловать",
    body: "Уведомления пока локальные (H4). Push-сервер не подключён.",
    createdAt: new Date().toISOString(),
    read: false,
    isDemo: true,
  },
];

interface Props {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: Props) {
  const [items] = useState(SEED);

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Уведомления</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <ul className="space-y-2">
          {items.map((n) => (
            <li key={n.id} className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{n.title}</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{n.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
