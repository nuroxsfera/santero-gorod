"use client";

import { useEffect, useState } from "react";
import type { Application, Vacancy } from "../domain/types";
import { getJobsService } from "../service/JobsService";
import { APPLICATION_STATUS_LABEL } from "../service/filters";

interface Props { onBack: () => void; }

export function ApplicationsScreen({ onBack }: Props) {
  const svc = getJobsService();
  const ownerId = svc.getDemoOwnerId();
  const [apps, setApps] = useState<Application[]>([]);
  const [titles, setTitles] = useState<Record<string, string>>({});

  const reload = async () => {
    const list = await svc.getApplications(ownerId);
    setApps(list);
    const map: Record<string, string> = {};
    for (const a of list) {
      const v: Vacancy | null = await svc.getVacancy(a.vacancyId);
      map[a.vacancyId] = v?.title ?? a.vacancyId;
    }
    setTitles(map);
  };

  useEffect(() => { reload(); }, [ownerId]);

  return (
    <div className="flex h-full flex-col bg-[#F2F4F7]">
      <div className="flex items-center gap-2 bg-white px-4 py-3 shadow-sm">
        <button type="button" onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100" aria-label="Назад">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="text-[15px] font-medium text-gray-900">Мои отклики</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">Демо-отклики только в памяти сессии.</div>
        {apps.length === 0 && <p className="py-10 text-center text-[14px] text-gray-500">Пока нет откликов</p>}
        <div className="space-y-3">
          {apps.map((a) => (
            <div key={a.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-[15px] font-semibold text-gray-900">{titles[a.vacancyId] ?? "Вакансия"}</p>
              <p className="mt-1 text-[13px] text-[#058BED]">{APPLICATION_STATUS_LABEL[a.status] ?? a.status}</p>
              <p className="mt-1 text-[12px] text-gray-500">{new Date(a.createdAt).toLocaleString("ru-RU")}</p>
              {a.status !== "withdrawn" && (
                <button type="button" onClick={async () => { await svc.withdrawApplication(ownerId, a.id); await reload(); }} className="mt-2 text-[13px] font-medium text-gray-600 underline">Отозвать</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
