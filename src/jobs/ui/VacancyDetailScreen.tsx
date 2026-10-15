"use client";

import { useState } from "react";
import type { Vacancy } from "../domain/types";
import { getJobsService } from "../service/JobsService";
import { formatSalary, WORK_FORMAT_LABEL, EMPLOYMENT_LABEL } from "../service/filters";

interface Props {
  vacancy: Vacancy;
  onBack: () => void;
  onApplied: () => void;
}

export function VacancyDetailScreen({ vacancy, onBack, onApplied }: Props) {
  const [note, setNote] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const svc = getJobsService();

  const handleApply = async () => {
    setBusy(true);
    setMsg(null);
    try {
      const ownerId = svc.getDemoOwnerId();
      const resume = await svc.getResume(ownerId);
      if (!resume) {
        setMsg("Сначала заполните резюме.");
        return;
      }
      const result = await svc.apply({
        ownerId,
        vacancyId: vacancy.id,
        resumeId: resume.id,
        coverNote: note,
      });
      if (!result.ok) {
        setMsg(result.reason === "ALREADY_APPLIED" ? "Вы уже откликались (демо)." : "Не удалось отправить отклик.");
        return;
      }
      setMsg("Демо-отклик сохранён локально. Работодателю ничего не отправлено.");
      onApplied();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button type="button" onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100" aria-label="Назад">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="text-[15px] font-medium text-gray-900">Вакансия</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {vacancy.isDemo && (
          <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">Демонстрационная вакансия.</div>
        )}
        <h1 className="text-[22px] font-semibold text-gray-900">{vacancy.title}</h1>
        <p className="mt-1 text-[15px] text-gray-600">{vacancy.employerName}</p>
        <p className="mt-2 text-[18px] font-semibold text-[#058BED]">{formatSalary(vacancy)}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[13px] text-gray-500">
          <span>{WORK_FORMAT_LABEL[vacancy.workFormat]}</span>
          <span>·</span>
          <span>{EMPLOYMENT_LABEL[vacancy.employmentType]}</span>
          {vacancy.localityName && (<><span>·</span><span>{vacancy.localityName}</span></>)}
        </div>
        <section className="mt-5"><h2 className="text-[14px] font-semibold">Описание</h2><p className="mt-1 text-[14px] text-gray-700 whitespace-pre-wrap">{vacancy.description}</p></section>
        <section className="mt-4"><h2 className="text-[14px] font-semibold">Требования</h2><p className="mt-1 text-[14px] text-gray-700 whitespace-pre-wrap">{vacancy.requirements}</p></section>
        <section className="mt-4"><h2 className="text-[14px] font-semibold">Условия</h2><p className="mt-1 text-[14px] text-gray-700 whitespace-pre-wrap">{vacancy.conditions}</p></section>
        <section className="mt-6 rounded-2xl bg-gray-50 p-4">
          <h2 className="text-[14px] font-semibold">Отклик (демо)</h2>
          <p className="mt-1 text-[12px] text-gray-500">Реальная отправка работодателю не выполняется.</p>
          <textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Сообщение" rows={3} className="mt-2 w-full rounded-xl border border-gray-200 px-3 py-2 text-[14px]" />
          <button type="button" disabled={busy} onClick={handleApply} className="mt-3 w-full rounded-2xl bg-[#058BED] py-3 text-[15px] font-medium text-white disabled:opacity-60">{busy ? "…" : "Откликнуться (демо)"}</button>
          {msg && <p className="mt-2 text-[13px] text-gray-600">{msg}</p>}
        </section>
      </div>
    </div>
  );
}
