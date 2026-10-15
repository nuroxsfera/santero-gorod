"use client";

import { motion } from "framer-motion";
import type { Locality } from "@/geography";

interface Props {
  city: Locality;
}

/** Brief transition when switching locality. */
export function TravelScreen({ city }: Props) {
  return (
    <motion.div
      key="travel"
      className="absolute inset-0 flex flex-col items-center justify-center bg-[#058BED]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <p className="mb-2 text-sm font-medium text-white/70">Путешествуем в</p>
      <h2 className="text-3xl font-bold text-white">{city.name}</h2>
      {city.regionName && (
        <p className="mt-1 text-sm text-white/60">{city.regionName}</p>
      )}
    </motion.div>
  );
}
