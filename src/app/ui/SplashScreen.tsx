"use client";

import { motion } from "framer-motion";

/** Cinematic brand splash — Design OS 3.0 */
export function SplashScreen() {
  return (
    <motion.div
      key="splash"
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 100% 80% at 50% -20%, #7ec4ff 0%, transparent 55%), linear-gradient(165deg, #3d9fff 0%, #0a84ff 40%, #0058d4 100%)",
      }}
      exit={{ opacity: 0, scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Soft orbs */
      }
      <motion.div
        className="pointer-events-none absolute -left-20 top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl"
        animate={{ opacity: [0.3, 0.55, 0.3], scale: [1, 1.08, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-32 h-56 w-56 rounded-full bg-[#0047b8]/25 blur-3xl"
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      />

      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-5 flex items-baseline gap-0.5">
          <motion.span
            className="font-[family-name:var(--font-logo)] text-[80px] font-black italic leading-none tracking-tighter text-white drop-shadow-sm sm:text-[96px]"
            initial={{ x: -16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            S
          </motion.span>
          <motion.span
            className="font-[family-name:var(--font-logo)] text-[68px] font-black italic leading-none tracking-tighter text-white/88 sm:text-[82px]"
            initial={{ x: 16, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.32, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            G
          </motion.span>
        </div>
        <motion.p
          className="text-[16px] font-medium tracking-[0.04em] text-white/90"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
        >
          Santero Город
        </motion.p>
        <motion.p
          className="mt-2 text-[13px] font-medium text-white/55"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          Ваш город. Один экран.
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-20 h-1 w-28 overflow-hidden rounded-full bg-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
      >
        <motion.div
          className="h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.85, duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>
    </motion.div>
  );
}
