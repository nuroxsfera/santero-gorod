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

type LinkItem = { title: string; note: string; onClick?: () => void; accent?: string };

export function MoreScreen(props: Props) {
  const links: LinkItem[] = [
    { title: "Аккаунт", note: "Гость · OAuth позже", onClick: props.onOpenAccount, accent: "#0a84ff" },
    { title: "Профиль", note: "Имя на устройстве", onClick: props.onOpenProfile },
    { title: "Уведомления", note: "Локальный inbox", onClick: props.onOpenNotifications },
    { title: "Предупреждения", note: "Алерты города", onClick: props.onOpenAlerts, accent: "#d97706" },
    { title: "ЧС / помощь", note: "112 · МЧС", onClick: props.onOpenEmergency, accent: "#e11d48" },
    { title: "События", note: "Календарь · демо", onClick: props.onOpenEvents },
    { title: "Недвижимость", note: "Фото · цена · адрес", onClick: props.onOpenRealty, accent: "#7c3aed" },
    { title: "Сообщество", note: "UGC · демо", onClick: props.onOpenCommunity },
    { title: "Семья и быт", note: "Услуги · каркас", onClick: props.onOpenFamily },
    { title: "Магазины и еда", note: "Без оплаты", onClick: props.onOpenCommerce },
    { title: "Медицина", note: "Каталог", onClick: props.onOpenMedicine },
    { title: "Образование", note: "Каталог", onClick: props.onOpenEducation },
    { title: "Туризм и культура", note: "Каталог", onClick: props.onOpenTourism },
    { title: "Спорт", note: "Каталог", onClick: props.onOpenSport },
    { title: "Организации", note: "Профили · демо", onClick: props.onOpenOrgs },
    { title: "Муниципальные", note: "Официальные ссылки", onClick: props.onOpenMunicipal },
    { title: "Безопасность", note: "112 · алерты", onClick: props.onOpenSafety },
    { title: "Доступность", note: "Текст · анимации", onClick: props.onOpenAccessibility },
    { title: "Для бизнеса", note: "Кабинет · каркас", onClick: props.onOpenBusiness },
  ];

  return (
    <div className="sg-ambient flex h-full flex-col">
      <header className="sg-glass flex items-center gap-3 px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={props.onBack}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-[18px] font-semibold tracking-tight text-[var(--sg-ink)]">Ещё</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: 32 }}>
        <ul className="space-y-2.5">
          {links.map((u) => (
            <li key={u.title}>
              <button
                type="button"
                onClick={u.onClick}
                className="sg-glass-strong flex w-full items-center gap-3.5 rounded-[var(--sg-radius-lg)] p-3.5 text-left transition active:scale-[0.99]"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] text-[15px] font-bold text-white"
                  style={{
                    background:
                      u.accent ??
                      "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
                  }}
                >
                  {u.title.slice(0, 1)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[15px] font-semibold text-[var(--sg-ink)]">{u.title}</span>
                  <span className="mt-0.5 block text-[13px] text-[var(--sg-ink-faint)]">{u.note}</span>
                </span>
                <svg className="shrink-0 text-[var(--sg-ink-faint)]" width="16" height="16" viewBox="0 0 16 16">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
