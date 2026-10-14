"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/*
  Чистые жирные буквы S и G в динамичном стиле
  (приближение к Яндекс Go)
*/
function LetterS({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 90 110"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M72 18.5C67.2 10.8 57.5 6 45.2 6 27.8 6 15 17.5 15 35.2c0 12.8 7.8 21.5 24.5 27.2l12.2 4.2c9.5 3.2 13.8 6.8 13.8 13.5 0 9.2-7.8 14.5-20.5 14.5-10.8 0-18.5-4-24.2-11.8l-11.5 10.2C18.5 102 32.2 108 47.8 108c23.5 0 39-12.5 39-31.5 0-15.2-9.5-24-27.5-30.5l-11-4c-8-2.8-12-5.8-12-12 0-7.8 6.5-12.2 17-12.2 8.2 0 14.5 2.8 18.5 9.2l11.2-9.5z" />
    </svg>
  );
}

function LetterG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 110"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M50 8C26.5 8 9 26.5 9 52s17.5 44 42.5 44c13.2 0 24.8-4.2 32.5-12.5l-10.5-10.2c-5.5 5.2-12.5 8-20.5 8-16 0-26.5-11.5-26.5-27.5S36 26.5 52 26.5c9.5 0 16.8 4 21 11H51.5v14H92c1.2-4.5 2-9.5 2-15 0-24.5-17.5-36.5-44-36.5z" />
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
      <div className="relative flex items-center justify-center" style={{ transform: "skewX(-10deg)" }}>
        {/* Буква S */}
        <motion.div
          className="absolute text-white"
          style={{ width: 92, height: 112 }}
          initial={{ scale: 1, x: -38, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: -38, opacity: 1 }
              : stage === "fly"
              ? {
                  scale: 15,
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scale: 19,
                  opacity: 0,
                  transition: { duration: 0.35 },
                }
          }
        >
          <LetterS className="h-full w-full" />
        </motion.div>

        {/* Буква G */}
        <motion.div
          className="absolute text-white"
          style={{ width: 82, height: 102 }}
          initial={{ scale: 1, x: 34, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: 34, opacity: 1 }
              : stage === "fly"
              ? {
                  scale: 15,
                  x: 0,
                  opacity: 1,
                  transition: {
                    duration: 1.15,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {
                  scale: 19,
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
