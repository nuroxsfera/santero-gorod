"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [phase, setPhase] = useState<"logo" | "title" | "ready">("logo");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("title"), 900);
    const t2 = setTimeout(() => setPhase("ready"), 2200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden splash-gradient">
      {/* Soft glowing orbs for depth (Yandex-like atmosphere) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="glow-orb absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="glow-orb absolute -right-24 bottom-1/3 h-80 w-80 rounded-full bg-cyan-300/15 blur-3xl" style={{ animationDelay: "1.5s" }} />
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* Logo mark */}
        <AnimatePresence mode="wait">
          <motion.div
            key="logo"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8"
          >
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 shadow-2xl backdrop-blur-md ring-1 ring-white/30">
              <span className="text-3xl font-bold tracking-tight text-white">
                S
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Santero Город
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase !== "logo" ? 1 : 0, y: phase !== "logo" ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5 max-w-md text-lg font-medium text-white/80 sm:text-xl"
        >
          Всё для жизни в городах России
        </motion.p>

        {/* Subtle loading / continue indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: phase === "ready" ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center gap-4"
        >
          <div className="h-1 w-12 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full rounded-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm text-white/60">Загрузка...</p>
        </motion.div>
      </div>

      {/* Bottom soft fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/10 to-transparent" />
    </div>
  );
}
