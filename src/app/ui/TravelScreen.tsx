"use client";

import { motion } from "framer-motion";
import type { Locality } from "@/geography";

interface Props {
  city: Locality;
}

export function TravelScreen({ city }: Props) {
  return (
    <motion.div
      key="travel"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--sg-surface)] px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="mb-6 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[var(--sg-blue-soft)] text-2xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
      >
        ✈
      </motion.div>
      <p className="text-[15px] font-medium text-[var(--sg-ink-muted)]">Переезжаем в</p>
      <p className="mt-1 text-[28px] font-semibold tracking-tight text-[var(--sg-ink)]">
        {city.name}
      </p>
    </motion.div>
  );
}
