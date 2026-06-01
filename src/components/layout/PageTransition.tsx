import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsapSetup";

const LETTERS = "ORPHEUS".split("");
const LOADER_HOLD_MS = 1500;
const LOADER_EXIT_MS = 1100;
const LOADER_TOTAL_MS = LOADER_HOLD_MS + LOADER_EXIT_MS;

function CounterDisplay() {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const start = performance.now();
    const duration = LOADER_HOLD_MS;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * 100));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
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
      <motion.p
        className="type-eyebrow text-white/30 tracking-[0.35em]"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        Orpheus Financial · Dubai, UAE
      </motion.p>

      <div
        className="flex items-end gap-0 overflow-hidden leading-none"
        style={{ fontSize: "clamp(64px, 16vw, 200px)", letterSpacing: "-0.02em" }}
      >
        {LETTERS.map((ch, i) => (
          <motion.span
            key={i}
            className="block font-display font-extrabold"
            style={{
              background:
                "linear-gradient(160deg, #E5CB7E 0%, #C8A96A 35%, #D4AF37 65%, #A88829 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.55,
              delay: 0.12 + i * 0.045,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {ch}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="h-px rounded-full"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
        }}
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: "clamp(200px, 28vw, 480px)", opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      />

      <motion.div
        className="flex items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
      >
        <span className="font-body text-xs uppercase tracking-[0.2em] text-white/25">
          Structuring Capital
        </span>
        <span className="text-[9px] text-white/10">◆</span>
        <span className="font-display text-[28px] font-bold text-white/35">
          <CounterDisplay />
        </span>
      </motion.div>
    </div>
  );
}

let hasLoadedOnce = false;
if (typeof window !== "undefined") {
  (window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished =
    hasLoadedOnce;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(!hasLoadedOnce);

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    return () => {
      clearTimeout(t);
      ScrollTrigger.getAll().forEach((s) => s.kill());
    };
  }, [location.pathname]);

  useEffect(() => {
    if (showLoader) {
      const animTimer = setTimeout(() => {
        (window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished =
          true;
        window.dispatchEvent(new CustomEvent("orpheusLoaderComplete"));
      }, LOADER_HOLD_MS);

      const timer = setTimeout(() => {
        hasLoadedOnce = true;
        setShowLoader(false);
      }, LOADER_TOTAL_MS + 80);

      return () => {
        clearTimeout(animTimer);
        clearTimeout(timer);
      };
    }
    (window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished = true;
  }, [showLoader]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {showLoader && (
          <motion.div
            key="initial-loader"
            className="fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
            style={{ background: "#050505" }}
            initial={{ y: "0%" }}
            animate={{ y: ["0%", "0%", "-100%"] }}
            transition={{
              duration: LOADER_TOTAL_MS / 1000,
              times: [0, LOADER_HOLD_MS / LOADER_TOTAL_MS, 1],
              ease: ["linear", [0.76, 0, 0.24, 1]],
            }}
          >
            <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
            />

            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(ellipse 60% 55% at 50% 50%, rgba(212,175,55,0.14) 0%, transparent 70%)",
              }}
            />

            <motion.span
              className="absolute left-8 top-6 font-body text-xs uppercase tracking-[0.2em] text-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              Loading
            </motion.span>

            <motion.span
              className="absolute right-8 top-6 font-body text-xs text-white/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.35 }}
            >
              ©{new Date().getFullYear()}
            </motion.span>

            <OverlayContent />

            <motion.div
              className="absolute bottom-0 left-0 h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, #A88829, #D4AF37, #C8A96A)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{
                duration: LOADER_HOLD_MS / 1000,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
