"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [stage, setStage] = useState<"idle" | "fly" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("fly"), 1300);
    const t2 = setTimeout(() => setStage("done"), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#058BED]">
      <AnimatePresence>
        {stage !== "done" && (
          <motion.div
            className="relative flex items-center justify-center"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Буква S */}
            <motion.span
              className="absolute text-[120px] font-black italic leading-none tracking-tighter text-white sm:text-[160px] md:text-[190px]"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              initial={{ scale: 1, x: -42 }}
              animate={
                stage === "idle"
                  ? { scale: 1, x: -42 }
                  : {
                      scale: 16,
                      x: 0,
                      transition: {
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
            >
              S
            </motion.span>

            {/* Буква G */}
            <motion.span
              className="absolute text-[105px] font-black italic leading-none tracking-tighter text-white sm:text-[140px] md:text-[165px]"
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
              initial={{ scale: 1, x: 38 }}
              animate={
                stage === "idle"
                  ? { scale: 1, x: 38 }
                  : {
                      scale: 16,
                      x: 0,
                      transition: {
                        duration: 1.1,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }
              }
            >
              G
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Белый flash + переход */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={
          stage === "fly"
            ? {
                opacity: [0, 0, 0.65, 1],
                transition: {
                  duration: 1.1,
                  times: [0, 0.5, 0.82, 1],
                  ease: "easeIn",
                },
              }
            : stage === "done"
            ? { opacity: 1 }
            : { opacity: 0 }
        }
      />

      {/* Следующий экран — выбор города / вход */}
      {stage === "done" && (
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-white px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-full max-w-sm">
            <h1 className="mb-2 text-center text-2xl font-semibold tracking-tight text-gray-900">
              Santero Город
            </h1>
            <p className="mb-10 text-center text-base text-gray-500">
              Всё для жизни в вашем городе
            </p>

            <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#058BED] py-4 text-[17px] font-medium text-white transition active:scale-[0.98]">
              Определить город
            </button>

            <button className="flex w-full items-center justify-center rounded-2xl border border-gray-200 bg-white py-4 text-[17px] font-medium text-gray-800 transition active:scale-[0.98]">
              Выбрать вручную
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
