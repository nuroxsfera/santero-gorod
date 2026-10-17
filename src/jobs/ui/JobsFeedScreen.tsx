"use client";

import { useEffect, useState } from "react";
import type { Locality } from "@/geography";
import type { Vacancy, WorkFormat } from "../domain/types";
import { getJobsService } from "../service/JobsService";
import {
  formatSalary,
  WORK_FORMAT_LABEL,
  EMPLOYMENT_LABEL,
} from "../service/filters";

interface Props {
  city: Locality | null;
  onOpenVacancy: (v: Vacancy) => void;
  onOpenResume: () => void;
  onOpenApplications: () => void;
  onBack?: () => void;
}

function companyInitial(name: string): string {
  return (name.trim()[0] ?? "R").toUpperCase();
}

const AVATAR_TONES = [
  "linear-gradient(135deg, #93c5fd 0%, #0a84ff 100%)",
  "linear-gradient(135deg, #c4b5fd 0%, #7c3aed 100%)",
  "linear-gradient(135deg, #6ee7b7 0%, #059669 100%)",
  "linear-gradient(135deg, #fdba74 0%, #ea580c 100%)",
  "linear-gradient(135deg, #f9a8d4 0%, #db2777 100%)",
];

export function JobsFeedScreen({
  city,
  onOpenVacancy,
  onOpenResume,
  onOpenApplications,
  onBack,
}: Props) {
  const [items, setItems] = useState<Vacancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [workFormat, setWorkFormat] = useState<WorkFormat | "all">("all");
  const [isDemo, setIsDemo] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await getJobsService().getVacancies({
          localityId: city?.id ?? null,
          regionId: city?.regionId ?? null,
          workFormat,
          query: query.trim() || undefined,
          limit: 40,
        });
        if (cancelled) return;
        setItems(res.items);
        setIsDemo(res.isDemo);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [city?.id, city?.regionId, workFormat, query]);

  return (
    <div className="sg-ambient flex h-full flex-col">
      <div className="sg-glass px-4 pb-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <div className="mb-3 flex items-center gap-2">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
              aria-label="Назад"
            >
              ←
            </button>
          )}
          <h1 className="flex-1 text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Работа</h1>
          <button
            type="button"
            onClick={onOpenResume}
            className="rounded-full bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[var(--sg-ink)] ring-1 ring-[var(--sg-border)]"
          >
            Резюме
          </button>
          <button
            type="button"
            onClick={onOpenApplications}
            className="rounded-full bg-white/80 px-3 py-1.5 text-[12px] font-medium text-[var(--sg-ink)] ring-1 ring-[var(--sg-border)]"
          >
            Отклики
          </button>
        </div>
        {isDemo && (
          <div className="mb-3 rounded-[var(--sg-radius-md)] bg-[var(--sg-warning-bg)] px-3 py-2 text-[12px] text-[var(--sg-warning-text)]">
            Демо-вакансии. Реальные отклики работодателю не уходят.
          </div>
        )}
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Должность, компания…"
          className="mb-2 w-full rounded-[var(--sg-radius-md)] bg-white/80 px-3.5 py-2.5 text-[14px] outline-none ring-1 ring-[var(--sg-border)] focus:ring-2 focus:ring-[var(--sg-blue)]/35"
        />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["all", "remote", "hybrid", "onsite"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setWorkFormat(f)}
              className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${
                workFormat === f
                  ? "bg-[var(--sg-blue-soft)] text-[var(--sg-blue)]"
                  : "bg-white/60 text-[var(--sg-ink-muted)]"
              }`}
            >
              {f === "all" ? "Все форматы" : WORK_FORMAT_LABEL[f]}
            </button>
          ))}
        </div>
        {city && (
          <p className="mt-2 text-[12px] text-[var(--sg-ink-faint)]">
            {city.name} + удалённые
          </p>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-3" style={{ paddingBottom: 32 }}>
        {loading && (
          <p className="py-10 text-center text-[14px] text-[var(--sg-ink-muted)]">Загрузка…</p>
        )}
        {!loading && items.length === 0 && (
          <p className="py-10 text-center text-[14px] text-[var(--sg-ink-muted)]">
            Нет вакансий по фильтрам
          </p>
        )}
        <div className="space-y-3">
          {items.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => onOpenVacancy(v)}
              className="sg-glass-strong flex w-full gap-3.5 rounded-[var(--sg-radius-xl)] p-4 text-left transition active:scale-[0.99]"
            >
              <div
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[16px] text-[20px] font-bold text-white shadow-sm"
                style={{ background: AVATAR_TONES[i % AVATAR_TONES.length] }}
              >
                {companyInitial(v.employerName)}
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-[15px] font-semibold tracking-tight text-[var(--sg-ink)]">
                  {v.title}
                </h2>
                <p className="mt-0.5 text-[13px] text-[var(--sg-ink-muted)]">{v.employerName}</p>
                <p className="mt-1.5 text-[15px] font-semibold text-[var(--sg-blue)]">
                  {formatSalary(v)}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="rounded-full bg-[var(--sg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--sg-ink-muted)]">
                    {WORK_FORMAT_LABEL[v.workFormat]}
                  </span>
                  <span className="rounded-full bg-[var(--sg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--sg-ink-muted)]">
                    {EMPLOYMENT_LABEL[v.employmentType]}
                  </span>
                  {(v.localityName || v.workFormat === "remote") && (
                    <span className="rounded-full bg-[var(--sg-surface)] px-2.5 py-0.5 text-[11px] font-medium text-[var(--sg-ink-muted)]">
                      {v.localityName ?? "Любой город"}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
