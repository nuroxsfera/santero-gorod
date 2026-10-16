"use client";

interface Props {
  onBack: () => void;
  onOpenAlerts?: () => void;
  onOpenProfile?: () => void;
  onOpenEvents?: () => void;
  onOpenOrgs?: () => void;
  onOpenRealty?: () => void;
  onOpenNotifications?: () => void;
  onOpenBusiness?: () => void;
}

type LinkItem = { title: string; note: string; onClick?: () => void; open?: boolean };

export function MoreScreen({
  onBack,
  onOpenAlerts,
  onOpenProfile,
  onOpenEvents,
  onOpenOrgs,
  onOpenRealty,
  onOpenNotifications,
  onOpenBusiness,
}: Props) {
  const links: LinkItem[] = [
    { title: "Профиль", note: "Гость · имя на устройстве", onClick: onOpenProfile, open: true },
    { title: "Уведомления", note: "Локальный inbox", onClick: onOpenNotifications, open: true },
    { title: "Предупреждения", note: "Отключения · H3", onClick: onOpenAlerts, open: true },
    { title: "События", note: "Календарь · демо", onClick: onOpenEvents, open: true },
    { title: "Организации", note: "Профили · демо", onClick: onOpenOrgs, open: true },
    { title: "Недвижимость", note: "Справочник · демо", onClick: onOpenRealty, open: true },
    { title: "Для бизнеса", note: "Кабинет · каркас", onClick: onOpenBusiness, open: true },
    { title: "Медицина", note: "Справочник учреждений" },
    { title: "Образование", note: "Школы и кружки" },
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Ещё</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <ul className="space-y-2">
          {links.map((u) =>
            u.onClick ? (
              <li key={u.title}>
                <button
                  type="button"
                  onClick={u.onClick}
                  className="flex w-full items-center justify-between gap-3 rounded-[var(--sg-radius-lg)] bg-white/90 p-4 text-left ring-1 ring-[var(--sg-border)] transition active:scale-[0.99]"
                >
                  <div>
                    <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{u.title}</p>
                    <p className="mt-0.5 text-[13px] text-[var(--sg-ink-faint)]">{u.note}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--sg-blue-soft)] px-2.5 py-1 text-[11px] font-semibold text-[var(--sg-blue)]">
                    Открыть
                  </span>
                </button>
              </li>
            ) : (
              <li
                key={u.title}
                className="rounded-[var(--sg-radius-lg)] bg-white/70 p-4 ring-1 ring-[var(--sg-border)]"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{u.title}</p>
                    <p className="mt-0.5 text-[13px] text-[var(--sg-ink-faint)]">{u.note}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-[var(--sg-surface)] px-2.5 py-1 text-[11px] font-semibold text-[var(--sg-ink-muted)]">
                    Скоро
                  </span>
                </div>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
}
