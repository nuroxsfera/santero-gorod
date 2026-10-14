"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function WelcomeScreen() {
  const [stage, setStage] = useState<"idle" | "fly" | "done">("idle");

  useEffect(() => {
    const t1 = setTimeout(() => setStage("fly"), 1400);
    const t2 = setTimeout(() => setStage("done"), 2800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const baseStyle = {
    fontFamily: "var(--font-logo), system-ui, sans-serif",
    fontWeight: 900,
    fontStyle: "italic" as const,
    letterSpacing: "-0.06em",
    // Дополнительный наклон, чтобы было ближе к Яндексу
    transform: "skewX(-8deg)",
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#058BED]">
      <div className="relative flex items-center justify-center">
        {/* Буква S */}
        <motion.span
          className="absolute text-[130px] leading-none text-white sm:text-[170px] md:text-[210px]"
          style={baseStyle}
          initial={{ scale: 1, x: -38, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: -38, opacity: 1 }
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

        {/* Буква G — чуть меньше и ближе */}
        <motion.span
          className="absolute text-[112px] leading-none text-white sm:text-[148px] md:text-[182px]"
          style={baseStyle}
          initial={{ scale: 1, x: 34, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: 34, opacity: 1 }
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
          G
        </motion.span>
      </div>

      {/* Белый flash */}
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
