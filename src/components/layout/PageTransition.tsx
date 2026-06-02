import { ReactNode, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ScrollTrigger } from "@/lib/gsapSetup";

const LETTERS = "ORPHEUS".split("");
const LETTER_STAGGER_MS = 55;
const LETTER_ANIM_MS = 500;
const REVEAL_START_MS = 100;
const REVEAL_END_MS =
  REVEAL_START_MS + (LETTERS.length - 1) * LETTER_STAGGER_MS + LETTER_ANIM_MS;
const HOLD_MS = 520;
const EXIT_MS = 720;
const EXIT_START_MS = REVEAL_END_MS + HOLD_MS;

let hasLoadedOnce = false;
if (typeof window !== "undefined") {
  (window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished =
    hasLoadedOnce;
}

function finishLoaderSession() {
  hasLoadedOnce = true;
  (window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished = true;
  document.documentElement.classList.remove("loader-active");
}

function fireLoaderComplete() {
  (window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished = true;
  window.dispatchEvent(new CustomEvent("orpheusLoaderComplete"));
}

function LoaderOverlay({ onDone }: { onDone: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);

  const complete = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    fireLoaderComplete();
    finishLoaderSession();
    onDone();
  };

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion) {
      const t = window.setTimeout(complete, 80);
      return () => window.clearTimeout(t);
    }

    document.documentElement.classList.add("loader-active");

    let fallbackTimer = 0;

    const exitTimer = window.setTimeout(() => {
      const panel = panelRef.current;
      if (!panel) {
        complete();
        return;
      }

      panel.classList.add("loader-panel--exit");

      const onTransitionEnd = (e: TransitionEvent) => {
        if (e.target !== panel || e.propertyName !== "transform") return;
        panel.removeEventListener("transitionend", onTransitionEnd);
        window.clearTimeout(fallbackTimer);
        complete();
      };

      panel.addEventListener("transitionend", onTransitionEnd);
      fallbackTimer = window.setTimeout(() => {
        panel.removeEventListener("transitionend", onTransitionEnd);
        complete();
      }, EXIT_MS + 150);
    }, EXIT_START_MS);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(fallbackTimer);
      document.documentElement.classList.remove("loader-active");
    };
  }, [onDone]);

  return (
    <div
      ref={panelRef}
      className="loader-panel fixed inset-0 z-[9998] flex items-center justify-center overflow-hidden"
      style={{ background: "#050505" }}
      aria-hidden={false}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
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

      <span className="loader-meta absolute left-8 top-6 font-body text-xs uppercase tracking-[0.2em] text-white/25">
        Loading
      </span>
      <span
        className="loader-meta absolute right-8 top-6 font-body text-xs text-white/25"
        style={{ animationDelay: "0.08s" }}
      >
        ©{new Date().getFullYear()}
      </span>

      <div className="flex select-none flex-col items-center justify-center gap-6 px-6">
        <p
          className="loader-eyebrow font-body text-xs uppercase tracking-[0.35em] text-white/35"
        >
          Orpheus Financial · Dubai, UAE
        </p>

        <div
          className="flex items-end justify-center gap-0 overflow-hidden leading-none"
          style={{ fontSize: "clamp(64px, 16vw, 200px)", letterSpacing: "-0.02em" }}
        >
          {LETTERS.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="loader-letter font-display font-extrabold"
              style={{
                animationDelay: `${REVEAL_START_MS + i * LETTER_STAGGER_MS}ms`,
                background:
                  "linear-gradient(160deg, #E5CB7E 0%, #C8A96A 35%, #D4AF37 65%, #A88829 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {ch}
            </span>
          ))}
        </div>

        <div
          className="loader-line h-px rounded-full"
          style={{
            width: "clamp(200px, 28vw, 480px)",
            background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.6), transparent)",
            animationDelay: `${REVEAL_START_MS + 180}ms`,
          }}
        />

        <div
          className="loader-meta flex items-center gap-5"
          style={{ animationDelay: `${REVEAL_END_MS - 120}ms` }}
        >
          <span className="font-body text-xs uppercase tracking-[0.2em] text-white/30">
            Structuring Capital
          </span>
          <span className="text-[9px] text-white/15">◆</span>
          <span className="font-display text-[28px] font-bold tabular-nums text-white/40">
            100
          </span>
        </div>
      </div>

      <div
        className="loader-progress-bar absolute bottom-0 left-0 h-[2px] w-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #A88829, #D4AF37, #C8A96A)",
        }}
      />
    </div>
  );
}

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(!hasLoadedOnce);
  const [contentReady, setContentReady] = useState(hasLoadedOnce);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!contentReady) return;
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => window.clearTimeout(t);
  }, [contentReady, location.pathname]);

  return (
    <>
      <div
        className="transition-opacity duration-300 ease-out"
        style={{
          opacity: contentReady ? 1 : 0,
          visibility: contentReady ? "visible" : "hidden",
        }}
        aria-hidden={!contentReady}
      >
        {children}
      </div>

      {showLoader && (
        <LoaderOverlay
          onDone={() => {
            setShowLoader(false);
            setContentReady(true);
          }}
        />
      )}
    </>
  );
}
