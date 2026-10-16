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
  onOpenCommunity?: () => void;
  onOpenFamily?: () => void;
  onOpenCommerce?: () => void;
  onOpenEmergency?: () => void;
}

type LinkItem = { title: string; note: string; onClick?: () => void };

export function MoreScreen(props: Props) {
  const links: LinkItem[] = [
    { title: "Аккаунт", note: "Гость · OAuth позже", onClick: props.onOpenAccount },
    { title: "Профиль", note: "Имя на устройстве", onClick: props.onOpenProfile },
    { title: "Уведомления", note: "Локальный inbox", onClick: props.onOpenNotifications },
    { title: "Предупреждения", note: "Алерты города", onClick: props.onOpenAlerts },
    { title: "ЧС / помощь", note: "112 · МЧС", onClick: props.onOpenEmergency },
    { title: "События", note: "Календарь · демо", onClick: props.onOpenEvents },
    { title: "Сообщество", note: "UGC · демо", onClick: props.onOpenCommunity },
    { title: "Семья и быт", note: "Услуги · каркас", onClick: props.onOpenFamily },
    { title: "Магазины и еда", note: "Без оплаты", onClick: props.onOpenCommerce },
    { title: "Медицина", note: "Каталог", onClick: props.onOpenMedicine },
    { title: "Образование", note: "Каталог", onClick: props.onOpenEducation },
    { title: "Туризм и культура", note: "Каталог", onClick: props.onOpenTourism },
    { title: "Спорт", note: "Каталог", onClick: props.onOpenSport },
    { title: "Организации", note: "Профили · демо", onClick: props.onOpenOrgs },
    { title: "Недвижимость", note: "Справочник · демо", onClick: props.onOpenRealty },
    { title: "Муниципальные", note: "Официальные ссылки", onClick: props.onOpenMunicipal },
    { title: "Безопасность", note: "112 · алерты", onClick: props.onOpenSafety },
    { title: "Доступность", note: "Текст · анимации", onClick: props.onOpenAccessibility },
    { title: "Для бизнеса", note: "Кабинет · каркас", onClick: props.onOpenBusiness },
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--sg-surface)]">
      <header className="flex items-center gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={props.onBack}
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
          ))}
        </ul>
      </div>
    </div>
  );
}
