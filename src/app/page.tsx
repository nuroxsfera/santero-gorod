"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
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
import { type Screen, type Tab } from "./navigation";
import { SplashScreen } from "./ui/SplashScreen";
import { MainHomeScreen } from "./ui/MainHomeScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [city, setCity] = useState<Locality | null>(null);
  const [nextCity, setNextCity] = useState<Locality | null>(null);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");

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

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    if (tab === "events") setScreen("news");
  };

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-[#F2F4F7]">
      <AnimatePresence mode="wait">
        {screen === "splash" && <SplashScreen />}

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
                type="button"
                onClick={() => {
                  if (city) {
                    setScreen("main");
                    return;
                  }
                  const moscow = getGeographicService().searchCities({
                    query: "Москва",
                    limit: 1,
                  }).items[0];
                  if (moscow) {
                    getCityContext().selectLocality(moscow);
                    setCity(moscow);
                  }
                  setScreen("main");
                }}
                className="mb-3 flex w-full items-center justify-center rounded-2xl bg-[#058BED] py-4 text-[17px] font-medium text-white active:scale-[0.98]"
              >
                {city ? `Продолжить · ${city.name}` : "Определить город"}
              </button>
              <button
                type="button"
                onClick={() => setScreen("city-list")}
                className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 text-[17px] font-medium text-gray-800 active:scale-[0.98]"
              >
                Выбрать вручную
              </button>
            </div>
          </motion.div>
        )}

        {screen === "main" && (
          <MainHomeScreen
            city={city}
            activeTab={activeTab}
            onOpenCityList={() => setScreen("city-list")}
            onOpenJobs={() => setScreen("jobs")}
            onOpenNews={() => setScreen("news")}
            onTabChange={handleTabChange}
          />
        )}

        {screen === "city-list" && (
          <motion.div
            key="city-list"
            className="absolute inset-0 flex flex-col bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <CitySearchScreen
              title="Выбор города"
              onBack={() => setScreen(city ? "main" : "city-select")}
              onSelect={handleSelectCity}
            />
          </motion.div>
        )}

        {screen === "news" && (
          <motion.div
            key="news"
            className="absolute inset-0 flex flex-col bg-[#F2F4F7]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <NewsFeedScreen
              city={city}
              onBack={() => {
                setActiveTab("home");
                setScreen("main");
              }}
              onOpenArticle={(article) => {
                setActiveArticle(article);
                setScreen("news-article");
              }}
            />
          </motion.div>
        )}

        {screen === "news-article" && activeArticle && (
          <motion.div
            key="news-article"
            className="absolute inset-0 flex flex-col bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <NewsArticleScreen
              article={activeArticle}
              onBack={() => {
                setActiveArticle(null);
                setScreen("news");
              }}
            />
          </motion.div>
        )}

        {screen === "jobs" && (
          <motion.div
            key="jobs"
            className="absolute inset-0 flex flex-col bg-[#F2F4F7]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <JobsFeedScreen
              city={city}
              onBack={() => setScreen("main")}
              onOpenVacancy={(v) => {
                setActiveVacancy(v);
                setScreen("vacancy");
              }}
              onOpenResume={() => setScreen("resume")}
              onOpenApplications={() => setScreen("applications")}
            />
          </motion.div>
        )}

        {screen === "vacancy" && activeVacancy && (
          <motion.div
            key="vacancy"
            className="absolute inset-0 flex flex-col bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <VacancyDetailScreen
              vacancy={activeVacancy}
              onBack={() => {
                setActiveVacancy(null);
                setScreen("jobs");
              }}
              onApplied={() => {}}
            />
          </motion.div>
        )}

        {screen === "resume" && (
          <motion.div
            key="resume"
            className="absolute inset-0 flex flex-col bg-white"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <ResumeScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "applications" && (
          <motion.div
            key="applications"
            className="absolute inset-0 flex flex-col bg-[#F2F4F7]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <ApplicationsScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "travel" && nextCity && (
          <motion.div
            key="travel"
            className="absolute inset-0 flex flex-col items-center justify-center bg-[#058BED]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="mb-2 text-sm font-medium text-white/70">Путешествуем в</p>
            <h2 className="text-3xl font-bold text-white">{nextCity.name}</h2>
            {nextCity.regionName && (
              <p className="mt-1 text-sm text-white/60">{nextCity.regionName}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
