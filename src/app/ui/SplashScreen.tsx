"use client";

import { motion } from "framer-motion";

/** Brand splash — pure presentation, no data. */
export function SplashScreen() {
  return (
    <motion.div
      key="splash"
      className="absolute inset-0 flex items-center justify-center overflow-hidden bg-[#058BED]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative flex items-center justify-center">
        <motion.span
          className="absolute text-[120px] font-black italic leading-none tracking-tighter text-white sm:text-[160px]"
          initial={{ scale: 1, x: -42, opacity: 1 }}
          animate={{
            scale: [1, 1, 14],
            x: [-42, -42, 0],
            opacity: [1, 1, 0],
            transition: { duration: 2.2, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] },
          }}
        >
          S
        </motion.span>
        <motion.span
          className="absolute text-[105px] font-black italic leading-none tracking-tighter text-white sm:text-[140px]"
          initial={{ scale: 1, x: 38, opacity: 1 }}
          animate={{
            scale: [1, 1, 14],
            x: [38, 38, 0],
            opacity: [1, 1, 0],
            transition: { duration: 2.2, times: [0, 0.4, 1], ease: [0.22, 1, 0.36, 1] },
          }}
        >
          G
        </motion.span>
      </div>
      <motion.div
        className="pointer-events-none absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0, 1],
          transition: { duration: 2.2, times: [0, 0.55, 1], ease: "easeIn" },
        }}
      />
    </motion.div>
  );
}
