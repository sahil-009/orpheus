import Lenis from "@studio-freight/lenis";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { ScrollTrigger, setupGsap } from "./gsapSetup";

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
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      smoothTouch: false,
    });

    const raf = (time: number) => {
      l.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    l.on("scroll", ScrollTrigger.update);

    setLenis(l);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      l.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
