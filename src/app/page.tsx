"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import {
  CitySearchScreen,
  getCityContext,
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
import { useCityBootstrap } from "./hooks/useCityBootstrap";
import { SplashScreen } from "./ui/SplashScreen";
import { CitySelectScreen } from "./ui/CitySelectScreen";
import { MainHomeScreen } from "./ui/MainHomeScreen";
import { TravelScreen } from "./ui/TravelScreen";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");
  const { city, setCity } = useCityBootstrap();
  const [nextCity, setNextCity] = useState<Locality | null>(null);
  const [activeArticle, setActiveArticle] = useState<NewsArticle | null>(null);
  const [activeVacancy, setActiveVacancy] = useState<Vacancy | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [navHint, setNavHint] = useState<string | null>(null);

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
  }, [screen, nextCity, setCity]);

  useEffect(() => {
    if (!navHint) return;
    const t = setTimeout(() => setNavHint(null), 2200);
    return () => clearTimeout(t);
  }, [navHint]);

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
    if (tab === "home") {
      setScreen("main");
      return;
    }
    if (tab === "news") {
      setScreen("news");
      return;
    }
    setNavHint(
      tab === "transport"
        ? "Раздел «Транспорт» пока в разработке"
        : "Раздел «Ещё» пока в разработке"
    );
  };

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-[#F2F4F7]">
      <AnimatePresence mode="wait">
        {screen === "splash" && <SplashScreen />}

        {screen === "city-select" && (
          <CitySelectScreen
            city={city}
            onContinue={() => setScreen("main")}
            onPickManually={() => setScreen("city-list")}
            onCityResolved={setCity}
          />
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[#F2F4F7]"
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-white"
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[#F2F4F7]"
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-white"
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-white"
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[#F2F4F7]"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
          >
            <ApplicationsScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "travel" && nextCity && <TravelScreen city={nextCity} />}
      </AnimatePresence>

      {navHint && (
        <div className="pointer-events-none absolute bottom-24 left-0 right-0 z-40 flex justify-center px-4">
          <p className="rounded-2xl bg-gray-900/90 px-4 py-2.5 text-center text-[13px] text-white shadow-lg">
            {navHint}
          </p>
        </div>
      )}
    </div>
  );
}
