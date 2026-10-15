"use client";

/** Honest roadmap of modules not yet built — Horizon 2. */
const UPCOMING = [
  { title: "Транспорт", note: "Маршруты и остановки" },
  { title: "События", note: "Календарь досуга" },
  { title: "Погода", note: "Нужен API после согласования" },
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
    <div className="flex h-full flex-col bg-[#F2F4F7]">
      <header className="flex items-center gap-3 bg-white px-4 py-3 shadow-sm">
        <button
          type="button"
          onClick={onBack}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100"
          aria-label="Назад"
        >
          ←
        </button>
        <h1 className="text-[17px] font-semibold text-gray-900">Ещё</h1>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4">
        <p className="mb-4 text-[13px] text-gray-500">
          Разделы по мастер-плану. Пока не подключены — без фейковых экранов.
        </p>
        <ul className="space-y-2">
          {UPCOMING.map((u) => (
            <li key={u.title} className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-[15px] font-semibold text-gray-900">{u.title}</p>
              <p className="mt-1 text-[12px] text-gray-400">{u.note} · скоро</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
