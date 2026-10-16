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
import { ProfileScreen, AccountScreen } from "@/auth";
import { EventsScreen } from "@/events";
import { TransportScreen } from "@/transport";
import { OrgsScreen } from "@/orgs";
import { RealtyScreen } from "@/realty";
import { NotificationsScreen } from "@/notifications";
import { BusinessScreen } from "@/business";
import {
  CategoryPlacesScreen,
  MunicipalScreen,
  SafetyScreen,
  AccessibilityScreen,
} from "@/catalogs";
import { CommunityScreen } from "@/community";
import { FamilyScreen } from "@/family";
import { CommerceScreen } from "@/commerce";
import { EmergencyScreen } from "@/emergency";
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
    if (tab === "home") setScreen("main");
    else if (tab === "news") setScreen("news");
    else if (tab === "more") setScreen("more");
    else if (tab === "transport") setScreen("transport");
  };

  const backHome = () => {
    setActiveTab("home");
    setScreen("main");
  };

  const backMore = () => setScreen("more");

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
          <motion.div key="search" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
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
          <motion.div key="more" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <MoreScreen
              onBack={backHome}
              onOpenAlerts={() => setScreen("alerts")}
              onOpenProfile={() => setScreen("profile")}
              onOpenAccount={() => setScreen("account")}
              onOpenEvents={() => setScreen("events")}
              onOpenOrgs={() => setScreen("orgs")}
              onOpenRealty={() => setScreen("realty")}
              onOpenNotifications={() => setScreen("notifications")}
              onOpenBusiness={() => setScreen("business")}
              onOpenMedicine={() => setScreen("medicine")}
              onOpenEducation={() => setScreen("education")}
              onOpenTourism={() => setScreen("tourism")}
              onOpenSport={() => setScreen("sport")}
              onOpenMunicipal={() => setScreen("municipal")}
              onOpenSafety={() => setScreen("safety")}
              onOpenAccessibility={() => setScreen("accessibility")}
              onOpenCommunity={() => setScreen("community")}
              onOpenFamily={() => setScreen("family")}
              onOpenCommerce={() => setScreen("commerce")}
              onOpenEmergency={() => setScreen("emergency")}
            />
          </motion.div>
        )}

        {screen === "account" && (
          <motion.div key="account" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <AccountScreen onBack={backMore} onOpenProfile={() => setScreen("profile")} />
          </motion.div>
        )}

        {screen === "profile" && (
          <motion.div key="profile" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <ProfileScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "community" && (
          <motion.div key="community" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CommunityScreen city={city} onBack={backMore} />
          </motion.div>
        )}

        {screen === "family" && (
          <motion.div key="family" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <FamilyScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "commerce" && (
          <motion.div key="commerce" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CommerceScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "emergency" && (
          <motion.div key="emergency" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <EmergencyScreen onBack={backMore} onOpenAlerts={() => setScreen("alerts")} />
          </motion.div>
        )}

        {screen === "medicine" && (
          <motion.div key="medicine" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CategoryPlacesScreen
              city={city}
              title="Медицина"
              categories={["health"]}
              note="Каталог точек health из пилота. Не запись к врачу."
              onBack={backMore}
            />
          </motion.div>
        )}

        {screen === "education" && (
          <motion.div key="education" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CategoryPlacesScreen
              city={city}
              title="Образование"
              categories={["education"]}
              note="Каталог education. Не приёмная комиссия."
              onBack={backMore}
            />
          </motion.div>
        )}

        {screen === "tourism" && (
          <motion.div key="tourism" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CategoryPlacesScreen
              city={city}
              title="Туризм и культура"
              categories={["culture", "poi", "park"]}
              note="Ориентиры и культура. Не турагентство."
              onBack={backMore}
            />
          </motion.div>
        )}

        {screen === "sport" && (
          <motion.div key="sport" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CategoryPlacesScreen
              city={city}
              title="Спорт"
              categories={["sport", "park"]}
              note="Площадки и парки из каталога."
              onBack={backMore}
            />
          </motion.div>
        )}

        {screen === "municipal" && (
          <motion.div key="municipal" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <MunicipalScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "safety" && (
          <motion.div key="safety" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <SafetyScreen onBack={backMore} onOpenAlerts={() => setScreen("alerts")} />
          </motion.div>
        )}

        {screen === "accessibility" && (
          <motion.div key="accessibility" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <AccessibilityScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "events" && (
          <motion.div key="events" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <EventsScreen city={city} onBack={backMore} />
          </motion.div>
        )}

        {screen === "transport" && (
          <motion.div key="transport" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <TransportScreen city={city} onBack={backHome} />
          </motion.div>
        )}

        {screen === "orgs" && (
          <motion.div key="orgs" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <OrgsScreen city={city} onBack={backMore} />
          </motion.div>
        )}

        {screen === "realty" && (
          <motion.div key="realty" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <RealtyScreen city={city} onBack={backMore} />
          </motion.div>
        )}

        {screen === "notifications" && (
          <motion.div key="notifications" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <NotificationsScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "business" && (
          <motion.div key="business" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <BusinessScreen onBack={backMore} />
          </motion.div>
        )}

        {screen === "alerts" && (
          <motion.div key="alerts" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <AlertsScreen city={city} onBack={() => setScreen("main")} />
          </motion.div>
        )}

        {screen === "map" && (
          <motion.div key="map" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <CityMapScreen city={city} onBack={() => setScreen("main")} onOpenList={() => setScreen("places")} />
          </motion.div>
        )}

        {screen === "places" && (
          <motion.div key="places" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <PlacesListScreen city={city} onBack={() => setScreen("main")} onOpenMap={() => setScreen("map")} />
          </motion.div>
        )}

        {screen === "news" && (
          <motion.div key="news" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <NewsFeedScreen
              city={city}
              onBack={backHome}
              onOpenArticle={(article) => {
                setActiveArticle(article);
                setScreen("news-article");
              }}
            />
          </motion.div>
        )}

        {screen === "news-article" && activeArticle && (
          <motion.div key="news-article" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-white" {...sheet}>
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
          <motion.div key="jobs" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
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
          <motion.div key="vacancy" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-white" {...sheet}>
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
          <motion.div key="resume" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-white" {...sheet}>
            <ResumeScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "applications" && (
          <motion.div key="applications" className="absolute inset-0 mx-auto flex w-full max-w-lg flex-col bg-[var(--sg-surface)]" {...sheet}>
            <ApplicationsScreen onBack={() => setScreen("jobs")} />
          </motion.div>
        )}

        {screen === "travel" && nextCity && <TravelScreen city={nextCity} />}
      </AnimatePresence>
    </div>
  );
}
