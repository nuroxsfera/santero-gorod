"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// SVG буквы в стиле Яндекс Go — жирный динамичный курсив
function LetterS({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 140"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M98 28c-6-12-20-20-38-20-28 0-48 16-48 42 0 18 12 30 34 38l18 6c14 5 20 10 20 20 0 14-12 22-30 22-16 0-28-6-36-18l-16 14c12 18 32 28 54 28 34 0 56-18 56-46 0-22-14-34-40-44l-16-6c-12-4-18-9-18-18 0-12 10-18 26-18 12 0 22 4 28 14l16-14z" />
    </svg>
  );
}

function LetterG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 130 140"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M68 18c-32 0-56 24-56 58s24 58 58 58c18 0 34-6 44-18l-14-14c-8 8-18 12-30 12-22 0-36-16-36-38s14-38 36-38c14 0 24 6 30 16h-28v20h52c2-6 4-14 4-22 0-34-24-54-60-54z" />
    </svg>
  );
}

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

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#058BED]">
      <div className="relative flex items-center justify-center">
        {/* Буква S */}
        <motion.div
          className="absolute text-white"
          style={{ width: 110, height: 130 }}
          initial={{ scale: 1, x: -42, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: -42, opacity: 1 }
              : stage === "fly"
              ? {
                  scale: 16,
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scale: 20,
                  opacity: 0,
                  transition: { duration: 0.35 },
                }
          }
        >
          <LetterS className="h-full w-full" />
        </motion.div>

        {/* Буква G — чуть меньше и ближе */}
        <motion.div
          className="absolute text-white"
          style={{ width: 95, height: 115 }}
          initial={{ scale: 1, x: 38, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: 38, opacity: 1 }
              : stage === "fly"
              ? {
                  scale: 16,
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scale: 20,
                  opacity: 0,
                  transition: { duration: 0.35 },
                }
          }
        >
          <LetterG className="h-full w-full" />
        </motion.div>
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
