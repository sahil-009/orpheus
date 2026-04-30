import { useEffect, useRef } from "react";
import { gsap, setupGsap } from "@/lib/gsapSetup";

/* ─── Partner definitions ──────────────────────────────────────────
   Each entry: name shown, accent color, optional symbol prefix.
   Two rows scroll in opposite directions for the "alive" feel.
─────────────────────────────────────────────────────────────────── */
const ROW1 = [
  { name: "HSBC",              color: "#DB0011", symbol: "⬡" },
  { name: "Emirates NBD",      color: "#F5A623", symbol: "◈" },
  { name: "Standard Chartered",color: "#0BBCB2", symbol: "✦" },
  { name: "Barclays",          color: "#00AEEF", symbol: "◉" },
  { name: "Citibank",          color: "#0066B3", symbol: "⬤" },
  { name: "Deutsche Bank",     color: "#0033A0", symbol: "◆" },
  { name: "JPMorgan",          color: "#AA8C3C", symbol: "⬡" },
  { name: "Goldman Sachs",     color: "#6DAEDB", symbol: "✦" },
];

const ROW2 = [
  { name: "Deloitte",          color: "#86BC25", symbol: "●" },
  { name: "PwC",               color: "#E8530A", symbol: "◈" },
  { name: "KPMG",              color: "#00338D", symbol: "◉" },
  { name: "EY",                color: "#FFE600", symbol: "◆" },
  { name: "Mastercard",        color: "#EB001B", symbol: "◎" },
  { name: "Visa",              color: "#1A1F71", symbol: "⬤" },
  { name: "DIFC",              color: "#9B59B6", symbol: "✦" },
  { name: "ADGM",              color: "#27AE60", symbol: "◆" },
];

function Logo({ name, color, symbol }: { name: string; color: string; symbol: string }) {
  return (
    <div
      className="group flex items-center gap-2 px-8 shrink-0 cursor-default select-none"
      style={{ transition: "filter 0.3s ease" }}
    >
      {/* colored symbol icon */}
      <span
        className="text-[14px] leading-none flex-none"
        style={{ color, filter: `drop-shadow(0 0 6px ${color}55)` }}
      >
        {symbol}
      </span>

      {/* wordmark */}
      <span
        className="font-display font-bold whitespace-nowrap transition-all duration-300 group-hover:brightness-150"
        style={{
          fontSize: "clamp(13px, 1.1vw, 16px)",
          letterSpacing: name.length > 8 ? "0" : "0.02em",
          color,
          opacity: 0.55,
          textShadow: `0 0 20px ${color}33`,
          transition: "opacity 0.3s, text-shadow 0.3s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0.95";
          (e.currentTarget as HTMLElement).style.textShadow = `0 0 24px ${color}88`;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.opacity = "0.55";
          (e.currentTarget as HTMLElement).style.textShadow = `0 0 20px ${color}33`;
        }}
      >
        {name}
      </span>

      {/* divider dot */}
      <span className="ml-6 text-white/10 text-[8px]">◆</span>
    </div>
  );
}

function MarqueeRow({
  items, speed, reverse = false,
}: { items: typeof ROW1; speed: number; reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const totalW = el.scrollWidth / 2;
    const fromX = reverse ? -totalW : 0;
    const toX   = reverse ? 0 : -totalW;

    const tween = gsap.fromTo(el,
      { x: fromX },
      { x: toX, duration: speed, ease: "none", repeat: -1 }
    );
    const pause  = () => tween.pause();
    const resume = () => tween.resume();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => {
      tween.kill();
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, [speed, reverse]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex w-max items-center">
        {doubled.map((it, i) => (
          <Logo key={i} {...it} />
        ))}
      </div>
    </div>
  );
}

export function TrustBar() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    setupGsap();
    if (!labelRef.current) return;
    gsap.fromTo(labelRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 88%", once: true } }
    );
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#080808] overflow-hidden py-16">

      {/* subtle top/bottom lines */}
      <div className="absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(67,97,238,0.25), transparent)" }} />
      <div className="absolute inset-x-0 bottom-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(67,97,238,0.15), transparent)" }} />

      {/* very faint blue glow behind logos */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(67,97,238,0.04) 0%, transparent 70%)" }} />

      {/* header */}
      <p ref={labelRef} className="text-center font-body text-[13px] text-white/30 mb-10 tracking-[0.5px]">
        Trusted by leading businesses &amp; institutions across 18 markets
      </p>

      {/* row 1 — scrolls left */}
      <div className="relative mb-6">
        <MarqueeRow items={ROW1} speed={38} />
        {/* fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28"
          style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28"
          style={{ background: "linear-gradient(to left, #080808, transparent)" }} />
      </div>

      {/* row 2 — scrolls right (reverse) */}
      <div className="relative">
        <MarqueeRow items={ROW2} speed={44} reverse />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-28"
          style={{ background: "linear-gradient(to right, #080808, transparent)" }} />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-28"
          style={{ background: "linear-gradient(to left, #080808, transparent)" }} />
      </div>
    </section>
  );
}
