"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { Organization } from "../domain/types";
import { getOrgService } from "../service/OrgService";
import { LoadingState, EmptyState } from "@/app/ui/states";

interface Props {
  city: Locality | null;
  onBack: () => void;
}

export function OrgsScreen({ city, onBack }: Props) {
  const [items, setItems] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let c = false;
    (async () => {
      const res = await getOrgService().list({ localityId: city?.id ?? null });
      if (!c) {
        setItems(res.items);
        setLoading(false);
      }
    })();
    return () => {
      c = true;
    };
  }, [city?.id]);

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 bg-[var(--sg-surface-elevated)]/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] backdrop-blur">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Организации</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <p className="mb-3 text-[12px] text-[var(--sg-ink-muted)]">Demo-профили. Не полный реестр юрлиц.</p>
        {loading && <LoadingState />}
        {!loading && items.length === 0 && <EmptyState title="Нет профилей" />}
        <ul className="space-y-2">
          {items.map((o) => (
            <li key={o.id} className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
              <p className="text-[11px] font-semibold uppercase text-[var(--sg-blue)]">{o.kind}</p>
              <p className="mt-1 text-[15px] font-semibold text-[var(--sg-ink)]">{o.name}</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{o.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
