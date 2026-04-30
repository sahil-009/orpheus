import Lenis from "@studio-freight/lenis";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { gsap, ScrollTrigger, setupGsap } from "./gsapSetup";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    setupGsap();
    const l = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const tickerCb = (time: number) => l.raf(time * 1000);
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);
    l.on("scroll", ScrollTrigger.update);

    setLenis(l);

    return () => {
      gsap.ticker.remove(tickerCb);
      l.destroy();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
