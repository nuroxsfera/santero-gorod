"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [stage, setStage] = useState<"idle" | "fly" | "done">("idle");

  useEffect(() => {
    // Стоим спокойно как у Яндекса
    const t1 = setTimeout(() => setStage("fly"), 1400);
    // После разлёта переходим дальше
    const t2 = setTimeout(() => setStage("done"), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const letterStyle = {
    fontFamily: "var(--font-logo), system-ui, sans-serif",
    fontWeight: 900,
    fontStyle: "italic" as const,
    letterSpacing: "-0.04em",
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#058BED]">
      {/* Буквы SC */}
      <div className="relative flex items-center justify-center">
        {/* Буква S */}
        <motion.span
          className="absolute text-[120px] leading-none text-white sm:text-[160px] md:text-[200px]"
          style={letterStyle}
          initial={{ scale: 1, x: -52, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: -52, opacity: 1 }
              : stage === "fly"
              ? {
                  scale: 18,
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scale: 22,
                  opacity: 0,
                  transition: { duration: 0.35 },
                }
          }
        >
          S
        </motion.span>

        {/* Буква C — сначала стоит справа, потом наезжает на S */}
        <motion.span
          className="absolute text-[120px] leading-none text-white sm:text-[160px] md:text-[200px]"
          style={letterStyle}
          initial={{ scale: 1, x: 52, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: 52, opacity: 1 }
              : stage === "fly"
              ? {
                  scale: 18,
                  x: 0, // наезжает на S
                  opacity: 1,
                  transition: {
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scale: 22,
                  opacity: 0,
                  transition: { duration: 0.35 },
                }
          }
        >
          C
        </motion.span>
      </div>

      {/* Белый flash в момент максимального увеличения — помогает переходу */}
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={
          stage === "fly"
            ? {
                opacity: [0, 0, 0.7, 1],
                transition: {
                  duration: 1.15,
                  times: [0, 0.55, 0.85, 1],
                  ease: "easeIn",
                },
              }
            : stage === "done"
            ? { opacity: 1 }
            : { opacity: 0 }
        }
      />

      {/* Заглушка следующего экрана */}
      {stage === "done" && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-lg text-gray-400">Следующий экран...</p>
        </motion.div>
      )}
    </div>
  );
}
