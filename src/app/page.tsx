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
import { PlacesListScreen } from "@/places";
import { CityMapScreen } from "@/map";
import { SearchScreen } from "@/search/ui/SearchScreen";
import { AlertsScreen } from "@/alerts";
import { type Screen, type Tab } from "./navigation";
import { useCityBootstrap } from "./hooks/useCityBootstrap";
import { SplashScreen } from "./ui/SplashScreen";
import { CitySelectScreen } from "./ui/CitySelectScreen";
import { MainHomeScreen } from "./ui/MainHomeScreen";
import { TravelScreen } from "./ui/TravelScreen";
import { MoreScreen } from "./ui/MoreScreen";

const sheet = {
  initial: { x: "100%", opacity: 0.9 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0.9 },
  transition: { type: "spring" as const, damping: 32, stiffness: 340 },
};

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
    }, 1800);
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
    if (tab === "more") {
      setScreen("more");
      return;
    }
    setNavHint("Раздел «Транспорт» пока в разработке");
  };

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden bg-[var(--sg-surface)]">
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
            onOpenPlaces={() => setScreen("places")}
            onOpenMap={() => setScreen("map")}
            onOpenSearch={() => setScreen("search")}
            onOpenAlerts={() => setScreen("alerts")}
            onTabChange={handleTabChange}
          />
        )}

        {screen === "city-list" && (
          <motion.div key="city-list" className="absolute inset-0 flex flex-col bg-white" {...sheet}>
            <CitySearchScreen
              title="Выбор города"
              onBack={() => setScreen(city ? "main" : "city-select")}
              onSelect={handleSelectCity}
            />
          </motion.div>
        )}

        {screen === "search" && (
          <motion.div
            key="search"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
          >
            <SearchScreen
              city={city}
              onBack={() => setScreen("main")}
              onOpenNews={() => setScreen("news")}
              onOpenJobs={() => setScreen("jobs")}
              onOpenPlaces={() => setScreen("places")}
            />
          </motion.div>
        )}

        {screen === "more" && (
          <motion.div
            key="more"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
          >
            <MoreScreen
              onBack={() => {
                setActiveTab("home");
                setScreen("main");
              }}
              onOpenAlerts={() => setScreen("alerts")}
            />
          </motion.div>
        )}

        {screen === "alerts" && (
          <motion.div
            key="alerts"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
          >
            <AlertsScreen city={city} onBack={() => setScreen("main")} />
          </motion.div>
        )}

        {screen === "map" && (
          <motion.div
            key="map"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
          >
            <CityMapScreen
              city={city}
              onBack={() => setScreen("main")}
              onOpenList={() => setScreen("places")}
            />
          </motion.div>
        )}

        {screen === "places" && (
          <motion.div
            key="places"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
          >
            <PlacesListScreen
              city={city}
              onBack={() => setScreen("main")}
              onOpenMap={() => setScreen("map")}
            />
          </motion.div>
        )}

        {screen === "news" && (
          <motion.div
            key="news"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
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
            {...sheet}
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
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
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
            {...sheet}
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
            {...sheet}
          >
            <ResumeScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "applications" && (
          <motion.div
            key="applications"
            className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]"
            {...sheet}
          >
            <ApplicationsScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "travel" && nextCity && <TravelScreen city={nextCity} />}
      </AnimatePresence>

      {navHint && (
        <div className="pointer-events-none absolute bottom-28 left-0 right-0 z-40 flex justify-center px-4">
          <p className="rounded-[var(--sg-radius-pill)] bg-[var(--sg-ink)]/90 px-4 py-2.5 text-center text-[13px] font-medium text-white shadow-[var(--sg-shadow-lg)] backdrop-blur">
            {navHint}
          </p>
        </div>
      )}
    </div>
  );
}
