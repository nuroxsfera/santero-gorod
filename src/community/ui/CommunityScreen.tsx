"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { CommunityPost } from "../domain/types";
import { InMemoryCommunityRepository } from "../repository/InMemoryCommunityRepository";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

export function CommunityScreen({ city, onBack }: Props) {
  const [items, setItems] = useState<CommunityPost[]>([]);

  useEffect(() => {
    let c = false;
    new InMemoryCommunityRepository().listPublished(city?.id).then((r) => {
      if (!c) setItems(r.items);
    });
    return () => {
      c = true;
    };
  }, [city?.id]);

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Сообщество</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <p className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
          UGC · демо. Публикация с устройства пока не пишется на сервер.
        </p>
        <ul className="space-y-2">
          {items.map((p) => (
            <li key={p.id} className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{p.title}</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{p.body}</p>
              <p className="mt-2 text-[11px] text-[var(--sg-ink-faint)]">{p.authorLabel}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
