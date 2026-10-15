"use client";

import { motion } from "framer-motion";

/** Refined brand splash — soft motion, not aggressive zoom. */
export function SplashScreen() {
  return (
    <motion.div
      key="splash"
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 0%, #3ba4f5 0%, #058BED 45%, #0369b1 100%)",
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 12, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-6 flex items-center gap-1">
          <motion.span
            className="font-[family-name:var(--font-logo)] text-[72px] font-black italic leading-none tracking-tighter text-white sm:text-[88px]"
            initial={{ x: -8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
          >
            S
          </motion.span>
          <motion.span
            className="font-[family-name:var(--font-logo)] text-[64px] font-black italic leading-none tracking-tighter text-white/90 sm:text-[78px]"
            initial={{ x: 8, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.5 }}
          >
            G
          </motion.span>
        </div>
        <motion.p
          className="text-[15px] font-medium tracking-wide text-white/85"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45, duration: 0.5 }}
        >
          Santero Город
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-16 h-1 w-24 overflow-hidden rounded-full bg-white/25"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <motion.div
          className="h-full rounded-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.7, duration: 1.4, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}
