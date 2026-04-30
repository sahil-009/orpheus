import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsapSetup";

/* ── Letter reveal sub-component ─────────────────────────── */
const LETTERS = "ORPHEUS".split("");

function CounterDisplay() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const totalMs = 1100;
    const interval = 11;
    const steps = totalMs / interval;
    const timer = setInterval(() => {
      current += 100 / steps;
      if (current >= 100) { setCount(100); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-display tabular-nums">
      {String(count).padStart(3, "0")}
    </span>
  );
}

function OverlayContent() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 select-none pointer-events-none">

      {/* eyebrow */}
      <motion.p
        className="font-body text-[10px] uppercase tracking-[5px] text-white/25"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        Orpheus Financial&nbsp;&nbsp;·&nbsp;&nbsp;Dubai, UAE
      </motion.p>

      {/* ORPHEUS letters stagger */}
      <div
        className="flex items-end gap-0 leading-none overflow-hidden"
        style={{ fontSize: "clamp(64px, 16vw, 200px)", letterSpacing: "-0.02em" }}
      >
        {LETTERS.map((ch, i) => (
          <motion.span
            key={i}
            className="block font-display font-extrabold"
            style={{
              background: "linear-gradient(160deg, #A5BEFF 0%, #6B8AF4 35%, #4361EE 65%, #2D4BCC 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.5 + i * 0.055,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      {/* expanding rule */}
      <motion.div
        className="h-px rounded-full"
        style={{ background: "linear-gradient(90deg, transparent, rgba(67,97,238,0.6), transparent)" }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "clamp(200px, 28vw, 480px)", opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.75, ease: "easeOut" }}
      />

      {/* tagline + counter */}
      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.0 }}
      >
        <span className="font-body text-[11px] uppercase tracking-[3px] text-white/22">
          Structuring Capital
        </span>
        <span className="text-white/10 text-[9px]">◆</span>
        <span className="font-display text-[28px] font-bold text-white/30">
          <CounterDisplay />
        </span>
      </motion.div>

    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isMountRef = useRef(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    isMountRef.current = false;
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* ── Full-screen overlay: enter → hold → exit ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`ov-${location.pathname}`}
          className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
          style={{ background: "#050913" }}
          initial={{ y: "100%" }}
          animate={{ y: ["100%", "0%", "0%", "-100%"] }}
          transition={{
            duration: 2.5,
            times: [0, 0.20, 0.68, 1],
            ease: ["easeOut", "linear", "easeIn"],
          }}
        >
          {/* subtle grid */}
          <div className="absolute inset-0 opacity-[0.035]" style={{
            backgroundImage: "linear-gradient(rgba(67,97,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(67,97,238,1) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }} />

          {/* blue radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{
            background: "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(67,97,238,0.14) 0%, transparent 70%)"
          }} />

          {/* corner label TL */}
          <motion.span
            className="absolute top-6 left-8 font-body text-[10px] uppercase tracking-[3px] text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Loading
          </motion.span>

          {/* corner label TR */}
          <motion.span
            className="absolute top-6 right-8 font-body text-[10px] text-white/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            ©{new Date().getFullYear()}
          </motion.span>

          {/* main content */}
          <OverlayContent />

          {/* bottom thin progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] rounded-full"
            style={{ background: "linear-gradient(90deg, #2D4BCC, #4361EE, #6B8AF4)" }}
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
