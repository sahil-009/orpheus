import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, setupGsap } from "./gsapSetup";

interface Options {
  y?: number;
  opacity?: number;
  duration?: number;
  stagger?: number;
  delay?: number;
  start?: string;
  childSelector?: string;
  ease?: string;
  once?: boolean;
}

export function useScrollReveal<T extends HTMLElement>(opts: Options = {}) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    setupGsap();
    if (!ref.current) return;
    const targets = opts.childSelector
      ? Array.from(ref.current.querySelectorAll<HTMLElement>(opts.childSelector))
      : [ref.current];
    if (!targets.length) return;

    gsap.set(targets, { opacity: opts.opacity ?? 0, y: opts.y ?? 40 });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: opts.duration ?? 0.9,
      stagger: opts.stagger ?? 0.1,
      delay: opts.delay ?? 0,
      ease: opts.ease ?? "power3.out",
      scrollTrigger: {
        trigger: ref.current,
        start: opts.start ?? "top 80%",
        once: opts.once ?? true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return ref;
}
