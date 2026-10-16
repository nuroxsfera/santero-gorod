"use client";

interface Props {
  onBack: () => void;
}

const LINKS = [
  { title: "Официальный портал Новосибирской области", href: "https://www.nso.ru/", note: "Внешняя ссылка" },
  { title: "Администрация Новосибирска", href: "https://novo-sibirsk.ru/", note: "Внешняя ссылка" },
];

export function MunicipalScreen({ onBack }: Props) {
  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-2 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button type="button" onClick={onBack} className="flex h-10 w-10 items-center justify-center rounded-full bg-white" aria-label="Назад">
          ←
        </button>
        <h1 className="text-[18px] font-semibold text-[var(--sg-ink)]">Муниципальные сервисы</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-3">
        <p className="mb-3 text-[12px] text-[var(--sg-ink-muted)]">
          Только справочные ссылки. Santero не принимает обращения и не имитирует Госуслуги.
        </p>
        <ul className="space-y-2">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-[var(--sg-radius-lg)] bg-white/90 p-4 ring-1 ring-[var(--sg-border)]"
              >
                <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{l.title}</p>
                <p className="mt-1 text-[12px] text-[var(--sg-blue)]">{l.note} · открыть ↗</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
