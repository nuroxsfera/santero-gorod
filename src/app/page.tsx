"use client";

import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useState, useRef } from "react";

type Screen = "splash" | "city-select" | "main" | "city-list" | "travel";
type Tab = "home" | "transport" | "events" | "more";

const CITIES = [
  "Москва",
  "Санкт-Петербург",
  "Казань",
  "Новосибирск",
  "Екатеринбург",
  "Нижний Новгород",
  "Самара",
  "Краснодар",
  "Ростов-на-Дону",
  "Уфа",
];

const TABS: { id: Tab; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "transport", label: "Транспорт" },
  { id: "events", label: "События" },
  { id: "more", label: "Ещё" },
];

function IconHome({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#058BED" : "#9CA3AF"} strokeWidth="2">
      <path d="M3 10.5L12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h4v-5h4v5h4a1 1 0 0 0 1-1v-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTransport({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#058BED" : "#9CA3AF"} strokeWidth="2">
      <rect x="4" y="4" width="16" height="12" rx="2" />
      <path d="M4 10h16M8 16v2M16 16v2" strokeLinecap="round" />
    </svg>
  );
}

function IconEvents({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#058BED" : "#9CA3AF"} strokeWidth="2">
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}

function IconMore({ active }: { active: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? "#058BED" : "#9CA3AF"} strokeWidth="2">
      <circle cx="6" cy="12" r="1.5" fill={active ? "#058BED" : "#9CA3AF"} />
      <circle cx="12" cy="12" r="1.5" fill={active ? "#058BED" : "#9CA3AF"} />
      <circle cx="18" cy="12" r="1.5" fill={active ? "#058BED" : "#9CA3AF"} />
    </svg>
  );
}

const ICONS: Record<Tab, (p: { active: boolean }) => React.ReactNode> = {
  home: IconHome,
  transport: IconTransport,
  events: IconEvents,
  more: IconMore,
};

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [city, setCity] = useState("Москва");
  const [nextCity, setNextCity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [collapsed, setCollapsed] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (screen !== "splash") return;
    const t1 = setTimeout(() => setScreen("city-select"), 2400);
    return () => clearTimeout(t1);
  }, [screen]);

  useEffect(() => {
    if (screen !== "travel" || !nextCity) return;
    const t = setTimeout(() => {
      setCity(nextCity);
      setNextCity(null);
      setScreen("main");
    }, 2200);
    return () => clearTimeout(t);
  }, [screen, nextCity]);

  const handleSelectCity = (selected: string) => {
    if (selected === city) {
      setScreen("main");
      return;
    }
    setNextCity(selected);
    setScreen("travel");
  };

  const onScroll = () => {
    if (!scrollRef.current) return;
    setCollapsed(scrollRef.current.scrollTop > 40);
  };

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-[#F2F4F7]">
      <AnimatePresence mode="wait">
        {/* ===================== SPLASH ===================== */}
        {screen === "splash" && (
          <motion.div
            key="splash"
            className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#058BED]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative flex items-center justify-center">
              <motion.span
                className="absolute text-[120px] font-black italic leading-none tracking-tighter text-white sm:text-[160px]"
                initial={{ scale: 1, x: -42, opacity: 1 }}
                animate={{
                  scale: [1, 1, 14],
                  x: [-42, -42, 0],
                  opacity: [1, 1, 0],
                  transition: { duration: 2.2, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] },
                }}
              >
                S
              </motion.span>
              <motion.span
                className="absolute text-[105px] font-black italic leading-none tracking-tighter text-white sm:text-[140px]"
                initial={{ scale: 1, x: 38, opacity: 1 }}
                animate={{
                  scale: [1, 1, 14],
                  x: [38, 38, 0],
                  opacity: [1, 1, 0],
                  transition: { duration: 2.2, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] },
                }}
              >
                G
              </motion.span>
            </div>
            <motion.div
              className="pointer-events-none absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0, 1],
                transition: { duration: 2.2, times: [0, 0.55, 1], ease: "easeIn" },
              }}
            />
          </motion.div>
        )}

        {/* ===================== CITY SELECT ===================== */}
        {screen === "city-select" && (
          <motion.div
            key="city-select"
            className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full max-w-sm">
              <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900">
                Santero Город
              </h1>
              <p className="mb-10 text-center text-base text-gray-500">
                Всё для жизни в вашем городе
              </p>
              <button
                onClick={() => {
                  setCity("Москва");
                  setScreen("main");
                }}
                className="mb-3 flex w-full items-center justify-center rounded-2xl bg-[#058BED] py-4 text-[17px] font-medium text-white active:scale-[0.98]"
              >
                Определить город
              </button>
              <button
                onClick={() => setScreen("city-list")}
                className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 text-[17px] font-medium text-gray-800 active:scale-[0.98]"
              >
                Выбрать вручную
              </button>
            </div>
          </motion.div>
        )}

        {/* ===================== MAIN ===================== */}
        {screen === "main" && (
          <motion.div
            key="main"
            className="absolute inset-0 flex flex-col bg-[#F2F4F7]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* ===== Сворачиваемый верхний блок ===== */}
            <motion.div
              className="relative z-20 overflow-hidden bg-[#058BED]"
              animate={{
                borderBottomLeftRadius: collapsed ? 20 : 32,
                borderBottomRightRadius: collapsed ? 20 : 32,
              }}
              transition={{ duration: 0.25 }}
            >
              {/* Компактная плашка при скролле */}
              <motion.div
                className="px-4"
                animate={{ paddingTop: collapsed ? 10 : 12, paddingBottom: collapsed ? 10 : 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setScreen("city-list")}
                    className="flex items-center gap-1.5 rounded-2xl bg-white/20 px-3.5 py-2 active:bg-white/30"
                  >
                    <span className="text-[15px] font-semibold text-white">{city}</span>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M4 6l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="11" cy="11" r="7" />
                      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
              </motion.div>

              {/* Развёрнутый контент — скрывается при скролле */}
              <motion.div
                className="overflow-hidden px-4"
                animate={{
                  height: collapsed ? 0 : "auto",
                  opacity: collapsed ? 0 : 1,
                  marginTop: collapsed ? 0 : 16,
                  paddingBottom: collapsed ? 0 : 20,
                }}
                transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Карточки услуг */}
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  <div className="flex h-[112px] w-[112px] shrink-0 flex-col justify-between rounded-2xl bg-white p-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#058BED]/15">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#058BED" strokeWidth="2">
                        <rect x="4" y="4" width="16" height="12" rx="2" />
                        <path d="M4 10h16M8 16v2M16 16v2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">Транспорт</p>
                      <p className="text-[12px] text-gray-500">Маршруты</p>
                    </div>
                  </div>

                  <div className="flex h-[112px] w-[130px] shrink-0 flex-col justify-between rounded-2xl bg-white p-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#058BED]/15">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#058BED" strokeWidth="2">
                        <rect x="3" y="5" width="18" height="16" rx="2" />
                        <path d="M3 10h18M8 3v4M16 3v4" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">События</p>
                      <p className="text-[12px] text-gray-500">12 рядом</p>
                    </div>
                  </div>

                  <div className="flex h-[112px] w-[130px] shrink-0 flex-col justify-between rounded-2xl bg-white p-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#058BED]/15">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#058BED" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" />
                        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">Работа</p>
                      <p className="text-[12px] text-gray-500">Вакансии</p>
                    </div>
                  </div>

                  <div className="flex h-[112px] w-[112px] shrink-0 flex-col justify-between rounded-2xl bg-white p-3.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#058BED]/15">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#058BED" strokeWidth="2">
                        <path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11z" />
                        <circle cx="12" cy="10" r="2.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-gray-900">Места</p>
                      <p className="text-[12px] text-gray-500">Рядом</p>
                    </div>
                  </div>
                </div>

                {/* Быстрые действия */}
                <div className="mt-3 flex items-center justify-around rounded-2xl bg-white/15 py-3.5">
                  <button className="flex flex-col items-center gap-1.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v4l2.5 2.5" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-[12px] font-medium text-white">Расписание</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span className="text-[12px] font-medium text-white">Погода</span>
                  </button>
                  <button className="flex flex-col items-center gap-1.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1 1 18 0z" />
                        <circle cx="12" cy="10" r="3" />
                      </svg>
                    </div>
                    <span className="text-[12px] font-medium text-white">Карта</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>

            {/* ===== Скроллируемый контент ===== */}
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="flex-1 overflow-y-auto px-4 pt-4"
              style={{ paddingBottom: 100 }}
            >
              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-gray-900">Сегодня рядом</h3>
                    <span className="text-[13px] font-medium text-[#058BED]">Все</span>
                  </div>
                  <div className="flex gap-3">
                    <div className="h-14 w-14 shrink-0 rounded-xl bg-[#058BED]/10" />
                    <div className="flex flex-col justify-center">
                      <p className="text-[14px] font-medium text-gray-900">Фестиваль еды</p>
                      <p className="text-[13px] text-gray-500">Парк Горького · 18:00</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-gray-900">Вакансии рядом</h3>
                    <span className="text-[13px] font-medium text-[#058BED]">Все</span>
                  </div>
                  <p className="mb-3 text-[13px] text-gray-500">24 новых за сегодня</p>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#058BED]/10 text-[13px] font-bold text-[#058BED]">
                      IT
                    </div>
                    <div>
                      <p className="text-[14px] font-medium text-gray-900">Frontend-разработчик</p>
                      <p className="text-[13px] text-gray-500">от 180 000 ₽ · удалённо</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="text-[15px] font-semibold text-gray-900">Популярные места</h3>
                    <span className="text-[13px] font-medium text-[#058BED]">Карта</span>
                  </div>
                  <div className="flex gap-2.5 overflow-x-auto">
                    {["Кофейни", "Парки", "Музеи"].map((item) => (
                      <div
                        key={item}
                        className="flex h-16 w-28 shrink-0 items-end rounded-xl bg-[#058BED]/10 px-3 pb-2.5"
                      >
                        <span className="text-[13px] font-medium text-gray-800">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-[13px] text-gray-500">Сейчас</p>
                    <p className="text-[22px] font-semibold text-gray-900">+12°</p>
                    <p className="text-[13px] text-gray-500">Облачно</p>
                  </div>
                  <div className="flex-1 rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-[13px] text-gray-500">Пробки</p>
                    <p className="text-[22px] font-semibold text-gray-900">4</p>
                    <p className="text-[13px] text-gray-500">балла</p>
                  </div>
                </div>

                {/* Доп. карточки чтобы был скролл */}
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Новости города</h3>
                  <p className="text-[13px] text-gray-500">Открытие новой линии метро · сегодня</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Рекомендуем</h3>
                  <p className="text-[13px] text-gray-500">Кафе с летней верандой рядом с вами</p>
                </div>
              </div>
            </div>

            {/* ===== Плавающее меню ===== */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-5 pt-2">
              <div className="pointer-events-auto relative flex items-center gap-1 rounded-[28px] bg-white px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                {/* Плавающий индикатор */}
                <motion.div
                  className="absolute top-2 h-11 rounded-full bg-[#058BED]/12"
                  layoutId="tab-indicator"
                  animate={{
                    left: TABS.findIndex((t) => t.id === activeTab) * 72 + 8,
                    width: 64,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />

                {TABS.map((tab) => {
                  const Icon = ICONS[tab.id];
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="relative z-10 flex w-[72px] flex-col items-center gap-0.5 py-1.5"
                    >
                      <motion.div
                        animate={{ scale: isActive ? 1.08 : 1, y: isActive ? -1 : 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      >
                        <Icon active={isActive} />
                      </motion.div>
                      <span
                        className={`text-[10px] font-medium transition-colors ${
                          isActive ? "text-[#058BED]" : "text-gray-400"
                        }`}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* ===================== CITY LIST ===================== */}
        {screen === "city-list" && (
          <motion.div
            key="city-list"
            className="absolute inset-0 flex flex-col bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3">
              <button
                onClick={() => setScreen("main")}
                className="flex h-10 w-10 items-center justify-center rounded-full active:bg-gray-100"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M12.5 5L7.5 10l5 5" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <h2 className="text-lg font-semibold">Выбор города</h2>
            </div>
            <div className="flex-1 overflow-y-auto">
              {CITIES.map((c) => (
                <button
                  key={c}
                  onClick={() => handleSelectCity(c)}
                  className="flex w-full items-center justify-between border-b border-gray-50 px-5 py-4 text-left active:bg-gray-50"
                >
                  <span className="text-[17px] text-gray-900">{c}</span>
                  {c === city && (
                    <span className="text-sm font-medium text-[#058BED]">Текущий</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* ===================== TRAVEL ===================== */}
        {screen === "travel" && nextCity && (
          <motion.div
            key="travel"
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#058BED]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-white/30"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.8 }}
              />
              {[0.2, 0.45, 0.7].map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-white"
                  style={{ top: `${pos * 100}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                />
              ))}
            </div>
            <motion.div
              className="relative z-10 text-center"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className="mb-2 text-sm font-medium text-white/70">Путешествуем в</p>
              <h2 className="text-3xl font-bold text-white">{nextCity}</h2>
            </motion.div>
            <motion.div
              className="absolute left-1/2 z-20 h-5 w-5 -translate-x-1/2 rounded-full bg-white shadow-lg"
              initial={{ top: "15%" }}
              animate={{ top: "85%" }}
              transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
