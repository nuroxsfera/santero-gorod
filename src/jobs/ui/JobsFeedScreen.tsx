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
    <div className="flex h-full flex-col bg-[#F2F4F7]">
      <div className="bg-white px-4 pb-3 pt-3 shadow-sm">
        <div className="mb-3 flex items-center gap-2">
          {onBack && (
            <button type="button" onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100" aria-label="Назад">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
          <h1 className="flex-1 text-lg font-semibold text-gray-900">Работа</h1>
          <button type="button" onClick={onOpenResume} className="rounded-full bg-gray-100 px-3 py-1.5 text-[12px] font-medium text-gray-700">Резюме</button>
          <button type="button" onClick={onOpenApplications} className="rounded-full bg-gray-100 px-3 py-1.5 text-[12px] font-medium text-gray-700">Отклики</button>
        </div>
        {isDemo && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">
            Демо-вакансии. Реальная публикация и отклики работодателю не выполняются.
          </div>
        )}
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Должность, компания…" className="mb-2 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-[14px] outline-none focus:border-[#058BED]" />
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(["all", "remote", "hybrid", "onsite"] as const).map((f) => (
            <button key={f} type="button" onClick={() => setWorkFormat(f)} className={`shrink-0 rounded-full px-3 py-1 text-[12px] font-medium ${workFormat === f ? "bg-[#058BED]/15 text-[#058BED]" : "bg-gray-100 text-gray-600"}`}>
              {f === "all" ? "Все форматы" : WORK_FORMAT_LABEL[f]}
            </button>
          ))}
        </div>
        {city && (
          <p className="mt-2 text-[12px] text-gray-500">Показ для {city.name} + удалённые. Смена города не меняет ваше резюме.</p>
        )}
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {loading && <p className="py-10 text-center text-[14px] text-gray-500">Загрузка…</p>}
        {!loading && items.length === 0 && (
          <p className="py-10 text-center text-[14px] text-gray-500">Нет вакансий по выбранным фильтрам</p>
        )}
        <div className="space-y-3">
          {items.map((v) => (
            <button key={v.id} type="button" onClick={() => onOpenVacancy(v)} className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]">
              <h2 className="text-[15px] font-semibold text-gray-900">{v.title}</h2>
              <p className="mt-0.5 text-[13px] text-gray-600">{v.employerName}</p>
              <p className="mt-1 text-[14px] font-medium text-[#058BED]">{formatSalary(v)}</p>
              <div className="mt-2 flex flex-wrap gap-2 text-[12px] text-gray-500">
                <span>{WORK_FORMAT_LABEL[v.workFormat]}</span>
                <span>·</span>
                <span>{EMPLOYMENT_LABEL[v.employmentType]}</span>
                {v.localityName && (<><span>·</span><span>{v.localityName}</span></>)}
                {!v.localityName && v.workFormat === "remote" && (<><span>·</span><span>Любой город</span></>)}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
