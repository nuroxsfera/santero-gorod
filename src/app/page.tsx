"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* 
  SVG буквы в духе Яндекс Go
  Жирный, динамичный, с сильным наклоном
*/
function LetterS({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M78 22c-5-9-16-15-30-15C28 7 12 20 12 42c0 15 9 25 28 32l14 5c11 4 16 8 16 16 0 11-9 17-24 17-13 0-22-5-29-14l-13 12c10 15 26 23 44 23 28 0 46-15 46-38 0-18-11-28-32-36l-13-5c-9-3-14-7-14-14 0-9 8-14 20-14 10 0 17 3 22 11l13-11z"
        transform="skewX(-14)"
      />
    </svg>
  );
}

function LetterG({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 110 120"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M55 12C28 12 8 32 8 60s20 48 48 48c15 0 28-5 37-15l-12-12c-6 6-14 9-24 9-18 0-30-13-30-30s12-30 30-30c11 0 19 5 24 13H57v16h44c1-5 2-11 2-17 0-28-20-44-48-44z"
        transform="skewX(-14)"
      />
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
          style={{ width: 100, height: 120 }}
          initial={{ scale: 1, x: -40, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: -40, opacity: 1 }
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

        {/* Буква G — чуть меньше и ближе */}
        <motion.div
          className="absolute text-white"
          style={{ width: 88, height: 108 }}
          initial={{ scale: 1, x: 36, opacity: 1 }}
          animate={
            stage === "idle"
              ? { scale: 1, x: 36, opacity: 1 }
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
