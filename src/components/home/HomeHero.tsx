import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";
import {
  ArrowRight, ArrowUpRight, Globe2, Briefcase, TrendingUp,
  Linkedin, MessageCircle,
} from "lucide-react";
import { ClientLogosBar } from "@/components/services/ClientLogosMarquee";
import { CORPORATE_FINANCE_ADVISORY } from "@/data/corporateFinanceAdvisory";

/* ── core business activities (hero snapshot) ── */
const coreActivities = [
  {
    icon: Globe2,
    label: "Offshore Structure & Banking",
    blurb: "Institutional setup, corporate multi-currency banking & regulatory compliance",
    accent: "#D4AF37",
  },
  {
    icon: Briefcase,
    label: CORPORATE_FINANCE_ADVISORY.shortTitle,
    blurb: "Corporate structuring, transaction advisory & cross-border financial strategy",
    accent: "#C8A96A",
  },
  {
    icon: TrendingUp,
    label: "Debt Raising",
    blurb: "Debt advisory, capital stack optimization & matchmaking with institutional lenders and credit funds",
    accent: "#D4AF37",
  },
];

const avatars = [
  "https://i.pravatar.cc/40?img=11",
  "https://i.pravatar.cc/40?img=22",
  "https://i.pravatar.cc/40?img=33",
  "https://i.pravatar.cc/40?img=44",
] as const;

export function HomeHero() {
  const [email, setEmail] = useState("");
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const leftEls = leftRef.current?.querySelectorAll("[data-anim]") ?? [];
    const cards = rightRef.current?.querySelectorAll("[data-card]") ?? [];

    tl.fromTo(leftEls,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 }, 0.2)
      .fromTo(cards,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: "power3.out" }, 0.5);

    // Image parallax with requestAnimationFrame loop to completely eliminate lag!
    const bgImg = bgRef.current?.querySelector("img");
    let onMove: (e: MouseEvent) => void;
    let animationFrameId: number;

    if (bgImg) {
      gsap.fromTo(bgImg, { scale: 1.15, opacity: 0 }, { scale: 1.05, opacity: 0.50, duration: 3, ease: "power2.out" });

      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;

      onMove = (e: MouseEvent) => {
        targetX = (e.clientX / window.innerWidth - 0.5) * -30;
        targetY = (e.clientY / window.innerHeight - 0.5) * -30;
      };

      const updatePosition = () => {
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        
        gsap.set(bgImg, { x: currentX, y: currentY, force3D: true });
        
        animationFrameId = requestAnimationFrame(updatePosition);
      };

      window.addEventListener("mousemove", onMove, { passive: true });
      animationFrameId = requestAnimationFrame(updatePosition);
    }

    return () => {
      if (onMove) window.removeEventListener("mousemove", onMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col" style={{ background: "#0A0A0A" }}>

      {/* Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" ref={bgRef} style={{ willChange: "transform", transform: "translate3d(0,0,0)" }}>
        <img
          src="/dubai-bg.png"
          alt="Dubai Skyline Background"
          className="absolute inset-0 w-full h-full object-cover opacity-0"
          style={{ transform: "scale(1.15)", willChange: "transform", transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
        />
        {/* Soft elegant gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/40 to-transparent" />
      </div>

      {/* gold mesh */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        background: [
          "radial-gradient(ellipse 65% 75% at 28% 40%, rgba(212,175,55,0.18) 0%, transparent 65%)",
          "radial-gradient(ellipse 55% 65% at 72% 28%, rgba(200,169,106,0.13) 0%, transparent 60%)",
          "radial-gradient(ellipse 45% 55% at 50% 80%, rgba(168,136,41,0.10) 0%, transparent 60%)",
          "linear-gradient(to bottom, transparent 75%, #0A0A0A 100%)",
        ].join(", "),
        transform: "translate3d(0,0,0)",
        willChange: "transform",
      }} />

      {/* grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05]" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        transform: "translate3d(0,0,0)",
        willChange: "transform",
      }} />

      {/* ── main grid ── */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1440px] px-6 md:px-16 grid lg:grid-cols-[1.05fr_0.95fr] gap-10 xl:gap-16 items-center pt-32 pb-16">

        {/* ══ LEFT ══════════════════════════════════════════ */}
        <div ref={leftRef}>

          {/* badge */}
          <div data-anim
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-8"
            style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.40)" }}>
            <span className="h-2 w-2 rounded-full bg-[#D4AF37] pulse-dot" style={{ boxShadow: "0 0 8px #D4AF37" }} />
            <span className="font-display text-[10px] font-semibold uppercase tracking-[2.5px] text-[#C8A96A]">
              Dubai · UAE · 18 Global Markets
            </span>
          </div>

          {/* headline */}
          <h1 data-anim
            className="font-display font-extrabold leading-[1.0] text-white"
            style={{ fontSize: "clamp(42px, 6vw, 84px)", letterSpacing: "-0.03em" }}
          >
            <span className="block">One Partner for</span>
            <span className="block" style={{
              background: "linear-gradient(130deg, #C8A96A 0%, #D4AF37 30%, #F7EFD6 55%, #D4AF37 75%, #A88829 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Offshore, Banking & Debt Capital
            </span>
          </h1>

          {/* sub */}
          <p data-anim
            className="mt-6 max-w-[500px] font-body text-[15.5px] leading-[1.85] text-white font-bold">
            A premier Dubai financial advisory partner for financial institutions, institutional funds, and cross-border enterprises. We specialize in offshore structures, global banking setups, and institutional debt capital solutions.
          </p>

          {/* email + CTA row */}
          <div data-anim className="mt-9 flex flex-col sm:flex-row gap-3 max-w-[500px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl px-4 py-3.5 font-body text-[14px] text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#D4AF37]/60 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(212,175,55,0.32)",
              }}
            />
            <Link to="/contact">
              <button
                className="flex items-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 font-display font-semibold text-[13px] transition-all hover:brightness-110 active:scale-95"
                style={{
                  color: "#0A0A0A",
                  background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                  boxShadow: "0 8px 32px rgba(212,175,55,0.45), inset 0 1px 0 rgba(255,255,255,0.18)",
                }}>
                Begin Consultation <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* social connect row */}
          <div data-anim className="mt-5 flex items-center gap-4">
            <span className="font-body text-[11px] text-white/35 uppercase tracking-[2px]">Or connect via</span>
            <div className="flex gap-2.5">
              {[
                { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/company/orpheuss/", bg: "#D4AF37" },
                { Icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/97145587968", bg: "#C8A96A" },
              ].map(({ Icon, label, href, bg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110 hover:brightness-125"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,175,55,0.22)" }}>
                  <Icon size={15} style={{ color: bg }} />
                </a>
              ))}
            </div>
          </div>

          {/* avatar + social proof */}
          <div data-anim
            className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="" loading="lazy" decoding="async" width={36} height={36}
                  className="h-9 w-9 rounded-full object-cover"
                  style={{ border: "2px solid #0A0A0A", zIndex: 4 - i }} />
              ))}
            </div>
            <div className="flex items-center gap-6">
              {[
                { val: "60+", label: "Corporate Clients" },
                { val: "18", label: "Markets" },
                { val: "145%", label: "YoY Growth" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-bold text-[18px] leading-none text-white">{val}</div>
                  <div className="font-body text-[9px] uppercase tracking-[2px] text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT — core activity cards (snapshot) ════ */}
        <div ref={rightRef} className="relative">

          <div className="mb-5 flex items-center gap-2.5">
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4))" }} />
            <span className="font-display text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              Core Services
            </span>
            <span className="h-px flex-1" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.4), transparent)" }} />
          </div>

          <div className="grid gap-4">
            {coreActivities.map((s, i) => (
              <Link to="/services" key={s.label} data-card
                className="group relative block overflow-hidden rounded-2xl p-5 md:p-6 transition-all hover:-translate-y-1"
                style={{
                  background: "rgba(15,15,15,0.35)",
                  backdropFilter: "blur(20px)",
                  WebkitBackdropFilter: "blur(20px)",
                  border: "1px solid rgba(212,175,55,0.25)",
                  boxShadow: "0 18px 44px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
                }}>
                <span aria-hidden
                  className="absolute -top-3 right-4 font-display font-extrabold select-none pointer-events-none"
                  style={{ fontSize: "70px", lineHeight: 1, color: "rgba(212,175,55,0.07)" }}>
                  0{i + 1}
                </span>

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl"
                    style={{
                      background: "rgba(212,175,55,0.10)",
                      border: "1px solid rgba(212,175,55,0.30)",
                      color: s.accent,
                    }}>
                    <s.icon size={22} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-display font-bold text-white text-[17px] leading-snug">
                        {s.label}
                      </h3>
                      <ArrowUpRight size={16} className="text-[#D4AF37] flex-none transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                    <p className="mt-1.5 font-body text-[12.5px] leading-[1.6] text-white/55">
                      {s.blurb}
                    </p>
                  </div>
                </div>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
                  style={{ background: "linear-gradient(90deg,#D4AF37,#C8A96A)" }} />
              </Link>
            ))}
          </div>

        </div>
      </div>

      {/* ── client logos bar ── */}
      <div className="relative z-10 border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-[1440px] px-6 md:px-16">
          <p className="text-center font-body text-[9px] uppercase tracking-[3px] text-white/55 mb-7 font-bold">
            Trusted by businesses across 18 markets
          </p>
          <ClientLogosBar variant="dark" />
        </div>
      </div>
    </section>
  );
}
