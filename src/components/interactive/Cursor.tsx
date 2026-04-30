import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const dot = dotRef.current!;
    const ring = ringRef.current!;

    const xToDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power2.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power2.out" });
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power2.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t) return;
      const interactive = t.closest("a, button, .magnetic, .cursor-text, input, textarea, select, [role='button']");
      if (interactive) {
        gsap.to(dot, { scale: 2.5, duration: 0.25, ease: "power2.out" });
        gsap.to(ring, { scale: 1.8, duration: 0.3, ease: "power2.out" });
        ring.classList.add("is-hover");
        if (interactive.classList.contains("cursor-text")) {
          dot.classList.add("is-text");
          dot.textContent = "VIEW";
          gsap.to(dot, { scale: 1, duration: 0.2 });
        }
      } else {
        gsap.to(dot, { scale: 1, duration: 0.25 });
        gsap.to(ring, { scale: 1, duration: 0.3 });
        ring.classList.remove("is-hover");
        dot.classList.remove("is-text");
        dot.textContent = "";
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
