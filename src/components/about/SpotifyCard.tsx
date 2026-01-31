"use client";

import { motion } from "framer-motion";
import SpotifyCarousel from "../SpotifyCarousel";

export default function SpotifyCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-linear-to-br from-green-600/60 to-emerald-300/80 transition-all ease-in-out duration-500 rounded-3xl shadow-xl overflow-hidden hover:border-purple-300 border-transparent border hover:border   "
    >
      <SpotifyCarousel />
    </motion.div>
  );    
}
