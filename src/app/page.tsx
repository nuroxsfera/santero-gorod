"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

type Screen = "splash" | "city-select" | "main" | "city-list" | "travel";

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

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [city, setCity] = useState("Москва");
  const [nextCity, setNextCity] = useState<string | null>(null);

  useEffect(() => {
    if (screen !== "splash") return;
    const t1 = setTimeout(() => setScreen("city-select"), 2600);
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

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        {/* ===================== SPLASH ===================== */}
        {screen === "splash" && (
          <motion.div
            key="splash"
            className="absolute inset-0 flex items-center justify-center bg-[#058BED]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative flex items-center justify-center">
              <motion.span
                className="absolute text-[120px] font-black italic leading-none tracking-tighter text-white sm:text-[160px]"
                initial={{ scale: 1, x: -42 }}
                animate={{
                  scale: [1, 1, 16],
                  x: [-42, -42, 0],
                  transition: {
                    duration: 2.4,
                    times: [0, 0.45, 1],
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              >
                S
              </motion.span>
              <motion.span
                className="absolute text-[105px] font-black italic leading-none tracking-tighter text-white sm:text-[140px]"
                initial={{ scale: 1, x: 38 }}
                animate={{
                  scale: [1, 1, 16],
                  x: [38, 38, 0],
                  transition: {
                    duration: 2.4,
                    times: [0, 0.45, 1],
                    ease: [0.22, 1, 0.36, 1],
                  },
                }}
              >
                G
              </motion.span>
            </div>

            <motion.div
              className="pointer-events-none absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0, 0.7, 1],
                transition: {
                  duration: 2.4,
                  times: [0, 0.55, 0.85, 1],
                },
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
            transition={{ duration: 0.35 }}
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
            {/* ===== Верхняя синяя зона ===== */}
            <div className="relative bg-[#058BED] pb-5 pt-3">
              {/* Город */}
              <div className="px-4">
                <button
                  onClick={() => setScreen("city-list")}
                  className="mb-4 flex items-center gap-1.5 rounded-xl bg-white/15 px-3 py-2 active:bg-white/25"
                >
                  <span className="text-[15px] font-semibold text-white">{city}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Ряд карточек */}
              <div className="flex gap-3 overflow-x-auto px-4 pb-1 scrollbar-hide">
                <div className="h-28 w-28 shrink-0 rounded-2xl bg-white/15" />
                <div className="h-28 w-36 shrink-0 rounded-2xl bg-white/15" />
                <div className="h-28 w-36 shrink-0 rounded-2xl bg-white/15" />
                <div className="h-28 w-28 shrink-0 rounded-2xl bg-white/15" />
              </div>

              {/* Длинная карточка */}
              <div className="mt-3 px-4">
                <div className="h-14 w-full rounded-2xl bg-white/15" />
              </div>
            </div>

            {/* ===== Нижняя белая зона ===== */}
            <div className="-mt-4 flex-1 overflow-y-auto rounded-t-[28px] bg-[#F2F4F7] px-4 pt-5">
              <div className="space-y-3">
                <div className="h-20 w-full rounded-2xl bg-white shadow-sm" />
                <div className="h-20 w-full rounded-2xl bg-white shadow-sm" />
                <div className="h-20 w-full rounded-2xl bg-white shadow-sm" />
                <div className="h-24 w-full rounded-2xl bg-white shadow-sm" />
              </div>
            </div>

            {/* ===== Нижний таббар ===== */}
            <div className="flex items-center justify-around border-t border-gray-200/80 bg-white px-2 pb-6 pt-2">
              {[
                { label: "Главная", active: true },
                { label: "Транспорт", active: false },
                { label: "События", active: false },
                { label: "Ещё", active: false },
              ].map((tab) => (
                <button
                  key={tab.label}
                  className="flex flex-col items-center gap-1 px-3 py-1"
                >
                  <div
                    className={`h-6 w-6 rounded-md ${
                      tab.active ? "bg-[#058BED]" : "bg-gray-300"
                    }`}
                  />
                  <span
                    className={`text-[11px] font-medium ${
                      tab.active ? "text-[#058BED]" : "text-gray-400"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
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
                  <path
                    d="M12.5 5L7.5 10l5 5"
                    stroke="#111"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
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
