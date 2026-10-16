"use client";

interface Props {
  onBack: () => void;
}

const SERVICES = [
  { title: "Няня / сиделка", note: "Справочник · без гарантий (демо)" },
  { title: "Ремонт бытовой", note: "Справочник · верификация позже" },
  { title: "Уборка", note: "Справочник · демо" },
];

export function FamilyScreen({ onBack }: Props) {
  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Семья и быт</h1>
      </header>
      <div className="flex-1 px-4 py-3">
        <p className="mb-3 text-[12px] text-[var(--sg-ink-muted)]">
          Каталог услуг без оплаты и без «проверенных» бейджей — честный H6 каркас.
        </p>
        <ul className="space-y-2">
          {SERVICES.map((s) => (
            <li key={s.title} className="rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]">
              <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{s.title}</p>
              <p className="mt-1 text-[13px] text-[var(--sg-ink-muted)]">{s.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
