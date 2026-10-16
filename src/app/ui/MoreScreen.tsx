"use client";

interface Props {
  onBack: () => void;
  onOpenAlerts?: () => void;
  onOpenProfile?: () => void;
  onOpenAccount?: () => void;
  onOpenEvents?: () => void;
  onOpenOrgs?: () => void;
  onOpenRealty?: () => void;
  onOpenNotifications?: () => void;
  onOpenBusiness?: () => void;
  onOpenMedicine?: () => void;
  onOpenEducation?: () => void;
  onOpenTourism?: () => void;
  onOpenSport?: () => void;
  onOpenMunicipal?: () => void;
  onOpenSafety?: () => void;
  onOpenAccessibility?: () => void;
}

type LinkItem = { title: string; note: string; onClick?: () => void };

export function MoreScreen(props: Props) {
  const {
    onBack,
    onOpenAlerts,
    onOpenProfile,
    onOpenAccount,
    onOpenEvents,
    onOpenOrgs,
    onOpenRealty,
    onOpenNotifications,
    onOpenBusiness,
    onOpenMedicine,
    onOpenEducation,
    onOpenTourism,
    onOpenSport,
    onOpenMunicipal,
    onOpenSafety,
    onOpenAccessibility,
  } = props;

  const links: LinkItem[] = [
    { title: "Аккаунт", note: "Гость · OAuth позже", onClick: onOpenAccount },
    { title: "Профиль", note: "Имя на устройстве", onClick: onOpenProfile },
    { title: "Уведомления", note: "Локальный inbox", onClick: onOpenNotifications },
    { title: "Предупреждения", note: "Алерты города", onClick: onOpenAlerts },
    { title: "События", note: "Календарь · демо", onClick: onOpenEvents },
    { title: "Медицина", note: "Каталог · H5", onClick: onOpenMedicine },
    { title: "Образование", note: "Каталог · H5", onClick: onOpenEducation },
    { title: "Туризм и культура", note: "Каталог · H5", onClick: onOpenTourism },
    { title: "Спорт", note: "Каталог · H5", onClick: onOpenSport },
    { title: "Организации", note: "Профили · демо", onClick: onOpenOrgs },
    { title: "Недвижимость", note: "Справочник · демо", onClick: onOpenRealty },
    { title: "Муниципальные", note: "Официальные ссылки", onClick: onOpenMunicipal },
    { title: "Безопасность", note: "112 · алерты", onClick: onOpenSafety },
    { title: "Доступность", note: "Текст · анимации", onClick: onOpenAccessibility },
    { title: "Для бизнеса", note: "Кабинет · каркас", onClick: onOpenBusiness },
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
          {links.map((u) => (
            <li key={u.title}>
              {u.onClick ? (
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
              ) : (
                <div className="rounded-[var(--sg-radius-lg)] bg-white/70 p-4 ring-1 ring-[var(--sg-border)]">
                  <p className="text-[15px] font-semibold text-[var(--sg-ink)]">{u.title}</p>
                  <p className="mt-0.5 text-[13px] text-[var(--sg-ink-faint)]">{u.note}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
