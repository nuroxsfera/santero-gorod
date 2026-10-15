"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import {
  CitySearchScreen,
  getCityContext,
  getGeographicService,
  type Locality,
} from "@/geography";
import {
  NewsFeedScreen,
  NewsArticleScreen,
  type NewsArticle,
} from "@/news";
import {
  JobsFeedScreen,
  VacancyDetailScreen,
  ResumeScreen,
  ApplicationsScreen,
  type Vacancy,
} from "@/jobs";
import { type Screen, type Tab, TABS } from "./navigation";

function TabIcon({ active }: { active: boolean }) {
  return (
    <div className={`h-5 w-5 rounded-md ${active ? "bg-[#058BED]" : "bg-gray-300"}`} />
  );
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [city, setCity] = useState<Locality | null>(null);
  const [nextCity, setNextCity] = useState<Locality | null>(null);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [collapsed, setCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const svc = getGeographicService();
        await svc.ensureLoaded();
        const ctx = getCityContext();
        const state = await ctx.hydrate();
        if (cancelled) return;
        if (state.selectedLocality) {
          setCity(state.selectedLocality);
        } else {
          const moscow = svc.searchCities({ query: "Москва", limit: 1 }).items[0];
          if (moscow) {
            ctx.selectLocality(moscow);
            setCity(moscow);
          }
        }
      } catch {
        /* seed fallback */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (screen !== "splash") return;
    const t = setTimeout(() => setScreen("city-select"), 2400);
    return () => clearTimeout(t);
  }, [screen]);

  useEffect(() => {
    if (screen !== "travel" || !nextCity) return;
    const t = setTimeout(() => {
      getCityContext().selectLocality(nextCity);
      setCity(nextCity);
      setNextCity(null);
      setScreen("main");
    }, 2200);
    return () => clearTimeout(t);
  }, [screen, nextCity]);

  const handleSelectCity = (selected: Locality) => {
    if (city && selected.id === city.id) {
      setScreen("main");
      return;
    }
    setNextCity(selected);
    setScreen("travel");
  };

  const cityName = city?.name ?? "Город";

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-[#F2F4F7]">
      <AnimatePresence mode="wait">
        {screen === "splash" && (
          <motion.div key="splash" className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#058BED]" exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <div className="relative flex items-center justify-center">
              <motion.span className="absolute text-[120px] font-black italic leading-none tracking-tighter text-white sm:text-[160px]" initial={{ scale: 1, x: -42, opacity: 1 }} animate={{ scale: [1, 1, 14], x: [-42, -42, 0], opacity: [1, 1, 0], transition: { duration: 2.2, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] } }}>S</motion.span>
              <motion.span className="absolute text-[105px] font-black italic leading-none tracking-tighter text-white sm:text-[140px]" initial={{ scale: 1, x: 38, opacity: 1 }} animate={{ scale: [1, 1, 14], x: [38, 38, 0], opacity: [1, 1, 0], transition: { duration: 2.2, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] } }}>G</motion.span>
            </div>
            <motion.div className="pointer-events-none absolute inset-0 bg-white" initial={{ opacity: 0 }} animate={{ opacity: [0, 0, 1], transition: { duration: 2.2, times: [0, 0.55, 1], ease: "easeIn" } }} />
          </motion.div>
        )}

        {screen === "city-select" && (
          <motion.div key="city-select" className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="w-full max-w-sm">
              <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900">Santero Город</h1>
              <p className="mb-10 text-center text-base text-gray-500">Всё для жизни в вашем городе</p>
              <button type="button" onClick={() => { if (city) { setScreen("main"); return; } const moscow = getGeographicService().searchCities({ query: "Москва", limit: 1 }).items[0]; if (moscow) { getCityContext().selectLocality(moscow); setCity(moscow); } setScreen("main"); }} className="mb-3 flex w-full items-center justify-center rounded-2xl bg-[#058BED] py-4 text-[17px] font-medium text-white active:scale-[0.98]">{city ? `Продолжить · ${city.name}` : "Определить город"}</button>
              <button type="button" onClick={() => setScreen("city-list")} className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 text-[17px] font-medium text-gray-800 active:scale-[0.98]">Выбрать вручную</button>
            </div>
          </motion.div>
        )}

        {screen === "main" && (
          <motion.div key="main" className="absolute inset-0 flex flex-col bg-[#F2F4F7]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            <motion.div className="relative z-20 overflow-hidden bg-[#058BED]" animate={{ borderBottomLeftRadius: collapsed ? 20 : 32, borderBottomRightRadius: collapsed ? 20 : 32 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center justify-between px-4 py-3">
                <button type="button" onClick={() => setScreen("city-list")} className="flex items-center gap-1.5 rounded-2xl bg-white/20 px-3.5 py-2 active:bg-white/30">
                  <span className="text-[15px] font-semibold text-white">{cityName}</span>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              <motion.div className="overflow-hidden px-4" animate={{ height: collapsed ? 0 : "auto", opacity: collapsed ? 0 : 1, paddingBottom: collapsed ? 0 : 16 }} transition={{ duration: 0.28 }}>
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {["Транспорт", "События", "Работа", "Места"].map((title) => (
                    <div key={title} className="flex h-[100px] w-[110px] shrink-0 flex-col justify-end rounded-2xl bg-white p-3.5">
                      <p className="text-[13px] font-semibold text-gray-900">{title}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <div ref={scrollRef} onScroll={() => { if (scrollRef.current) setCollapsed(scrollRef.current.scrollTop > 40); }} className="flex-1 overflow-y-auto px-4 pt-4" style={{ paddingBottom: 100 }}>
              <div className="space-y-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Сегодня рядом</h3>
                  <p className="text-[13px] text-gray-500">События в {cityName}</p>
                </div>
                <button type="button" onClick={() => setScreen("jobs")} className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]">
                  <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Вакансии</h3>
                  <p className="text-[13px] text-gray-500">Работа в {cityName}</p>
                </button>
                <button type="button" onClick={() => setScreen("news")} className="w-full rounded-2xl bg-white p-4 text-left shadow-sm active:scale-[0.99]">
                  <h3 className="mb-2 text-[15px] font-semibold text-gray-900">Новости города</h3>
                  <p className="text-[13px] text-gray-500">Лента для {cityName}</p>
                </button>
              </div>
            </div>

            <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 flex justify-center pb-5">
              <div className="pointer-events-auto relative flex items-center gap-1 rounded-[28px] bg-white px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.12)]">
                <motion.div className="absolute top-2 h-11 rounded-full bg-[#058BED]/12" layoutId="tab-indicator" animate={{ left: TABS.findIndex((t) => t.id === activeTab) * 72 + 8, width: 64 }} transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                {TABS.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button key={tab.id} type="button" onClick={() => { setActiveTab(tab.id); if (tab.id === "events") setScreen("news"); }} className="relative z-10 flex w-[72px] flex-col items-center gap-0.5 py-1.5">
                      <TabIcon active={isActive} />
                      <span className={`text-[10px] font-medium ${isActive ? "text-[#058BED]" : "text-gray-400"}`}>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {screen === "city-list" && (
          <motion.div key="city-list" className="absolute inset-0 flex flex-col bg-white" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <CitySearchScreen title="Выбор города" onBack={() => setScreen(city ? "main" : "city-select")} onSelect={handleSelectCity} />
          </motion.div>
        )}

        {screen === "news" && (
          <motion.div key="news" className="absolute inset-0 flex flex-col bg-[#F2F4F7]" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <NewsFeedScreen city={city} onBack={() => { setActiveTab("home"); setScreen("main"); }} onOpenArticle={(article) => { setActiveArticle(article); setScreen("news-article"); }} />
          </motion.div>
        )}

        {screen === "news-article" && activeArticle && (
          <motion.div key="news-article" className="absolute inset-0 flex flex-col bg-white" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <NewsArticleScreen article={activeArticle} onBack={() => { setActiveArticle(null); setScreen("news"); }} />
          </motion.div>
        )}

        {screen === "jobs" && (
          <motion.div key="jobs" className="absolute inset-0 flex flex-col bg-[#F2F4F7]" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <JobsFeedScreen city={city} onBack={() => setScreen("main")} onOpenVacancy={(v) => { setActiveVacancy(v); setScreen("vacancy"); }} onOpenResume={() => setScreen("resume")} onOpenApplications={() => setScreen("applications")} />
          </motion.div>
        )}

        {screen === "vacancy" && activeVacancy && (
          <motion.div key="vacancy" className="absolute inset-0 flex flex-col bg-white" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <VacancyDetailScreen vacancy={activeVacancy} onBack={() => { setActiveVacancy(null); setScreen("jobs"); }} onApplied={() => {}} />
          </motion.div>
        )}

        {screen === "resume" && (
          <motion.div key="resume" className="absolute inset-0 flex flex-col bg-white" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <ResumeScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "applications" && (
          <motion.div key="applications" className="absolute inset-0 flex flex-col bg-[#F2F4F7]" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}>
            <ApplicationsScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "travel" && nextCity && (
          <motion.div key="travel" className="absolute inset-0 flex flex-col items-center justify-center bg-[#058BED]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="mb-2 text-sm font-medium text-white/70">Путешествуем в</p>
            <h2 className="text-3xl font-bold text-white">{nextCity.name}</h2>
            {nextCity.regionName && <p className="mt-1 text-sm text-white/60">{nextCity.regionName}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
