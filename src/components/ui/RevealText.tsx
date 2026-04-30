import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsapSetup";
import { splitText } from "@/lib/splitText";

interface RevealTextProps {
  as?: keyof JSX.IntrinsicElements;
  children: string;
  className?: string;
  mode?: "words" | "chars";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  trigger?: "load" | "scroll";
  start?: string;
}

export function RevealText({
  as: Tag = "span",
  children,
  className = "",
  mode = "words",
  delay = 0,
  stagger = 0.08,
  duration = 0.9,
  y = 60,
  trigger = "load",
  start = "top 80%",
}: RevealTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const split = splitText(el, mode);
    const targets = mode === "chars" ? split.chars : split.words;

    gsap.set(targets, { opacity: 0, y });

    if (trigger === "scroll") {
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start, once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        split.cleanup();
      };
    } else {
      const tween = gsap.to(targets, {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        delay,
        ease: "power3.out",
      });
      return () => {
        tween.kill();
        split.cleanup();
      };
    }
  }, [children]);

  const Comp = Tag as unknown as "span";
  return (
    <Comp ref={ref as never} className={className}>
      {children}
    </Comp>
  );
}
