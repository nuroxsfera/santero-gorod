"use client";

import { useEffect, useState } from "react";
import type { Resume, WorkFormat } from "../domain/types";
import { getJobsService } from "../service/JobsService";
import { WORK_FORMAT_LABEL } from "../service/filters";

interface Props { onBack: () => void; }

export function ResumeScreen({ onBack }: Props) {
  const svc = getJobsService();
  const ownerId = svc.getDemoOwnerId();
  const [resume, setResume] = useState<Resume | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => { svc.getResume(ownerId).then(setResume); }, [ownerId]);

  if (!resume) {
    return <div className="flex h-full items-center justify-center bg-white text-gray-500">Загрузка…</div>;
  }

  const update = (patch: Partial<Resume>) => { setResume({ ...resume, ...patch }); setSaved(false); };
  const save = async () => {
    const next = await svc.saveResume({ ...resume, isDraft: true, published: false, visibility: "private" });
    setResume(next);
    setSaved(true);
  };

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3">
        <button type="button" onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100" aria-label="Назад">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <span className="text-[15px] font-medium text-gray-900">Моё резюме</span>
      </div>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-[12px] text-amber-800">Черновик (демо). Контакты скрыты. Смена города не затрагивает резюме.</div>
        <label className="block text-[12px] text-gray-500">Желаемая должность</label>
        <input value={resume.desiredTitle} onChange={(e) => update({ desiredTitle: e.target.value })} className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-[14px]" />
        <label className="block text-[12px] text-gray-500">Профессия</label>
        <input value={resume.profession} onChange={(e) => update({ profession: e.target.value })} className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-[14px]" />
        <label className="block text-[12px] text-gray-500">Опыт (лет)</label>
        <input type="number" min={0} value={resume.experienceYears} onChange={(e) => update({ experienceYears: Number(e.target.value) || 0 })} className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-[14px]" />
        <label className="block text-[12px] text-gray-500">Навыки</label>
        <input value={resume.skills.join(", ")} onChange={(e) => update({ skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-[14px]" />
        <label className="block text-[12px] text-gray-500">Образование</label>
        <input value={resume.education} onChange={(e) => update({ education: e.target.value })} className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-[14px]" />
        <label className="block text-[12px] text-gray-500">Желаемая зарплата (₽)</label>
        <input type="number" value={resume.desiredSalary ?? ""} onChange={(e) => update({ desiredSalary: e.target.value ? Number(e.target.value) : null })} className="mt-1 mb-3 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-[14px]" />
        <label className="block text-[12px] text-gray-500">Формат</label>
        <div className="mt-1 mb-3 flex flex-wrap gap-2">
          {(["any", "remote", "hybrid", "onsite"] as const).map((f) => (
            <button key={f} type="button" onClick={() => update({ preferredWorkFormat: f as WorkFormat | "any" })} className={`rounded-full px-3 py-1 text-[12px] font-medium ${resume.preferredWorkFormat === f ? "bg-[#058BED]/15 text-[#058BED]" : "bg-gray-100 text-gray-600"}`}>
              {WORK_FORMAT_LABEL[f]}
            </button>
          ))}
        </div>
        <p className="mb-3 text-[12px] text-gray-500">Видимость: private. Публикация в демо отключена.</p>
        <button type="button" onClick={save} className="w-full rounded-2xl bg-[#058BED] py-3 text-[15px] font-medium text-white">Сохранить черновик</button>
        {saved && <p className="mt-2 text-center text-[13px] text-green-600">Сохранено локально</p>}
      </div>
    </div>
  );
}
