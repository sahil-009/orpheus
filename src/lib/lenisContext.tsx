import Lenis from "@studio-freight/lenis";
import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { ScrollTrigger, setupGsap } from "./gsapSetup";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/**
 * Lenis without smoothWheel — native scrolling stays pixel-crisp.
 * Lenis remains for ScrollTrigger sync and programmatic scrollTo.
 */
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    setupGsap();
    const l = new Lenis({
      smoothWheel: false,
      syncTouch: false,
      autoResize: true,
    });

    if (!(window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished) {
      l.stop();
    }

    const onLoaderComplete = () => {
      l.start();
      l.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };
    window.addEventListener("orpheusLoaderComplete", onLoaderComplete, { once: true });

    const raf = (time: number) => {
      l.raf(time);
      rafRef.current = requestAnimationFrame(raf);
    };
    rafRef.current = requestAnimationFrame(raf);
    l.on("scroll", ScrollTrigger.update);

    setLenis(l);

    return () => {
      window.removeEventListener("orpheusLoaderComplete", onLoaderComplete);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      l.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
