"use client";

const UPCOMING = [
  { title: "Транспорт", note: "Маршруты и остановки" },
  { title: "События", note: "Календарь досуга" },
  { title: "Погода", note: "После согласования API" },
  { title: "Предупреждения", note: "Отключения и перекрытия" },
  { title: "Медицина", note: "Справочник учреждений" },
  { title: "Образование", note: "Школы и кружки" },
  { title: "Недвижимость", note: "Объявления с картой" },
  { title: "Профиль", note: "После авторизации" },
];

interface Props {
  onBack: () => void;
}

export function MoreScreen({ onBack }: Props) {
  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-3 bg-white/90 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] shadow-[var(--sg-shadow-sm)] backdrop-blur-md">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--sg-surface)]"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Ещё</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-5">
        <p className="mb-4 text-[14px] leading-relaxed text-[var(--sg-ink-muted)]">
          Разделы из мастер-плана. Без фейковых экранов — только честный roadmap.
        </p>
        <ul className="space-y-2">
          {UPCOMING.map((u) => (
            <li
              key={u.title}
              className="rounded-[var(--sg-radius-lg)] bg-white p-4 shadow-[var(--sg-shadow-sm)] ring-1 ring-[var(--sg-border)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{u.title}</p>
                  <p className="mt-0.5 text-[13px] text-[var(--sg-ink-faint)]">{u.note}</p>
                </div>
                <span className="shrink-0 rounded-full bg-[var(--sg-blue-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--sg-blue)]">
                  Скоро
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
