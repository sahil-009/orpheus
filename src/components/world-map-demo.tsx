"use client";

import { motion } from "framer-motion";
import WorldMap from "@/components/ui/world-map";

export default function WorldMapDemo() {
  return (
    <motion.div
      className="w-full bg-transparent py-12 md:py-16"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <div className="mx-auto max-w-3xl text-center">
        <motion.div
          className="inline-block mb-2"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.08 }}
        >
          <span className="font-display text-xs font-semibold uppercase tracking-[3px] text-transparent bg-gradient-to-r from-[#D4AF37] to-[#E5CB7E] bg-clip-text">
            Global Reach
          </span>
        </motion.div>
        <motion.p
          className="text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-white leading-[1.1] mt-4"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.12 }}
        >
          Remote{" "}
          <span className="font-serif italic bg-gradient-to-r from-[#C8A96A] via-[#E5CB7E] to-[#D4AF37] bg-clip-text text-transparent">
            Connectivity
          </span>
        </motion.p>
        <motion.p
          className="mx-auto max-w-2xl py-6 text-base md:text-lg text-white/60 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.16 }}
        >
          Break free from traditional boundaries. Work from anywhere, at any time. Our distributed network ensures seamless collaboration across all time zones and locations.
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, delay: 0.24, ease: "easeOut" }}
        className="will-change-transform mt-8 md:mt-12"
      >
        <div className="relative rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-lg" style={{
          boxShadow: "0 0 20px rgba(212,175,55,0.1), inset 0 0 15px rgba(212,175,55,0.04)"
        }}>
          {/* Glow backdrop */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#D4AF37]/06 via-transparent to-transparent pointer-events-none rounded-2xl" />
          <div className="absolute inset-0 bg-radial pointer-events-none rounded-2xl" style={{
            background: "radial-gradient(circle at 50% 30%, rgba(212,175,55,0.03), transparent 60%)"
          }} />
          
          <div className="relative bg-gradient-to-b from-[#0F1A3A]/40 to-[#070B1C]/20 backdrop-blur-sm p-1 rounded-2xl">
            <WorldMap
              lineColor="#D4AF37"
              dots={[
                { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: 34.0522, lng: -118.2437 } },
                { start: { lat: 64.2008, lng: -149.4937 }, end: { lat: -15.7975, lng: -47.8919 } },
                { start: { lat: -15.7975, lng: -47.8919 }, end: { lat: 38.7223, lng: -9.1393 } },
                { start: { lat: 51.5074, lng: -0.1278 }, end: { lat: 28.6139, lng: 77.209 } },
                { start: { lat: 28.6139, lng: 77.209 }, end: { lat: 43.1332, lng: 131.9113 } },
                { start: { lat: 28.6139, lng: 77.209 }, end: { lat: -1.2921, lng: 36.8219 } },
              ]}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
