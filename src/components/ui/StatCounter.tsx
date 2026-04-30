import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, setupGsap } from "@/lib/gsapSetup";

interface Props {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function StatCounter({ to, suffix = "", duration = 2, className = "" }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    setupGsap();
    if (!ref.current) return;
    const el = ref.current;
    const obj = { val: 0 };

    const tween = gsap.to(obj, {
      val: to,
      duration,
      ease: "power2.out",
      snap: { val: 1 },
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + suffix;
      },
      scrollTrigger: { trigger: el, start: "top 85%", once: true },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, suffix, duration]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}
