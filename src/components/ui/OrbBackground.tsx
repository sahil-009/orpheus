import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";

export function OrbBackground() {
  const orb1 = useRef<HTMLDivElement>(null);
  const orb2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (orb1.current)
      gsap.to(orb1.current, { y: 30, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut" });
    if (orb2.current)
      gsap.to(orb2.current, { y: -30, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        ref={orb1}
        className="absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full opacity-15"
        style={{ background: "#D4AF37", filter: "blur(100px)" }}
      />
      <div
        ref={orb2}
        className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full opacity-15"
        style={{ background: "#A88829", filter: "blur(80px)" }}
      />
      {/* Vertical hairlines — gold */}
      {[25, 50, 75].map((p) => (
        <div
          key={p}
          className="absolute top-0 bottom-0 w-px"
          style={{
            left: `${p}%`,
            background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.18), transparent)",
          }}
        />
      ))}
    </div>
  );
}
