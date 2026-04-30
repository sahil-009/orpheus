import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";
import {
  ArrowRight, ChevronUp,
} from "lucide-react";
import {
  LineChart, Line, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar, AreaChart, Area,
} from "recharts";

/* ── tiny recharts data sets ── */
const clientsTrend = [
  { v: 22 }, { v: 28 }, { v: 24 }, { v: 38 }, { v: 34 }, { v: 42 }, { v: 48 }, { v: 56 }, { v: 60 },
];
const marketsData = [
  { name: "UAE",     value: 35, color: "#4361EE" },
  { name: "UK",      value: 22, color: "#6B8AF4" },
  { name: "Cayman",  value: 18, color: "#A5BEFF" },
  { name: "Others",  value: 25, color: "#2D4BCC" },
];
const realtimeLine = [
  { v: 12 }, { v: 15 }, { v: 11 }, { v: 18 }, { v: 14 }, { v: 20 }, { v: 17 }, { v: 23 },
];
const gaugeData = [{ value: 74, fill: "#4361EE" }];

/* ── glass card wrapper ── */
function GlassCard({
  className = "", style = {}, children,
}: { className?: string; style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{
        background: "rgba(8,12,32,0.96)",
        border: "1px solid rgba(67,97,238,0.2)",
        boxShadow: "0 20px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ── avatar stack data ── */
const avatars = [
  "https://i.pravatar.cc/40?img=11",
  "https://i.pravatar.cc/40?img=22",
  "https://i.pravatar.cc/40?img=33",
  "https://i.pravatar.cc/40?img=44",
];

export function HomeHero() {
  const leftRef   = useRef<HTMLDivElement>(null);
  const rightRef  = useRef<HTMLDivElement>(null);
  const card1     = useRef<HTMLDivElement>(null);
  const card2     = useRef<HTMLDivElement>(null);
  const card3     = useRef<HTMLDivElement>(null);
  const card4     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    const leftEls = leftRef.current?.querySelectorAll("[data-anim]") ?? [];
    tl.fromTo(leftEls,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, stagger: 0.12 }, 0.2)
      .fromTo([card1.current, card2.current, card3.current, card4.current],
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.0, stagger: 0.15, ease: "power3.out" }, 0.55);

    /* floating */
    const floats = [
      { el: card1.current, y: -14, dur: 5.5 },
      { el: card2.current, y:  12, dur: 6.2 },
      { el: card3.current, y:  -9, dur: 4.8 },
      { el: card4.current, y:  11, dur: 5.8 },
    ];
    floats.forEach(({ el, y, dur }, i) => {
      gsap.to(el, { y, duration: dur, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 2 + i * 0.3 });
    });
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col" style={{ background: "#050913" }}>

      {/* blue mesh — pure CSS radial gradients, no filter:blur, GPU composited */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        background: [
          "radial-gradient(ellipse 65% 75% at 28% 40%, rgba(67,97,238,0.22) 0%, transparent 65%)",
          "radial-gradient(ellipse 55% 65% at 72% 28%, rgba(67,97,238,0.15) 0%, transparent 60%)",
          "radial-gradient(ellipse 45% 55% at 50% 80%, rgba(45,75,204,0.10) 0%, transparent 60%)",
          "linear-gradient(to bottom, transparent 75%, #050913 100%)",
        ].join(", "),
      }} />

      {/* grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(67,97,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(67,97,238,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* ── main grid ── */}
      <div className="relative z-10 flex-1 mx-auto w-full max-w-[1440px] px-6 md:px-16 grid lg:grid-cols-[1.1fr_0.9fr] gap-8 xl:gap-12 items-center pt-32 pb-16">

        {/* ══ LEFT ══════════════════════════════════════════ */}
        <div ref={leftRef}>

          {/* badge */}
          <div data-anim
            className="inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 mb-8"
            style={{ background: "rgba(67,97,238,0.1)", border: "1px solid rgba(67,97,238,0.35)" }}>
            <span className="h-2 w-2 rounded-full bg-[#4361EE] pulse-dot" style={{ boxShadow: "0 0 8px #4361EE" }} />
            <span className="font-display text-[10px] font-semibold uppercase tracking-[2.5px] text-[#6B8AF4]">
              Dubai · UAE · 18 Global Markets
            </span>
          </div>

          {/* headline */}
          <h1 data-anim
            className="font-display font-extrabold leading-[1.0] text-white"
            style={{ fontSize: "clamp(42px, 6vw, 90px)", letterSpacing: "-0.03em" }}
          >
            <span className="block">Structure Your</span>
            <span className="block" style={{
              background: "linear-gradient(130deg, #6B8AF4 0%, #4361EE 30%, #A5BEFF 55%, #4361EE 75%, #2D4BCC 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Capital.
            </span>
            <span className="block text-white/55 font-serif italic" style={{ fontSize: "0.72em", WebkitTextFillColor: "initial" }}>
              for the World.
            </span>
          </h1>

          {/* sub */}
          <p data-anim
            className="mt-6 max-w-[480px] font-body text-[15.5px] leading-[1.85] text-white/45">
            Dubai-based advisory structuring offshore companies, global banking &amp; debt
            across 18 markets.{" "}
            <span className="text-white/65">Quietly. Cleanly. Fully compliant.</span>
          </p>

          {/* email + CTA row */}
          <div data-anim className="mt-9 flex flex-col sm:flex-row gap-3 max-w-[480px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 rounded-xl px-4 py-3.5 font-body text-[14px] text-white placeholder-white/25 outline-none focus:ring-2 focus:ring-[#4361EE]/60 transition-all"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(67,97,238,0.3)",
              }}
            />
            <Link to="/contact">
              <button
                className="flex items-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 font-display font-semibold text-[13px] text-white transition-all hover:brightness-110 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #4361EE 0%, #2D4BCC 100%)",
                  boxShadow: "0 8px 32px rgba(67,97,238,0.45), inset 0 1px 0 rgba(255,255,255,0.12)",
                }}>
                Begin Consultation <ArrowRight size={14} />
              </button>
            </Link>
          </div>

          {/* social connect row */}
          <div data-anim className="mt-5 flex items-center gap-4">
            <span className="font-body text-[11px] text-white/30 uppercase tracking-[2px]">Or connect via</span>
            <div className="flex gap-2.5">
              {[
                { Icon: Linkedin,       label: "LinkedIn",  href: "https://www.linkedin.com/company/orpheuss/", bg: "#0A66C2" },
                { Icon: MessageCircle, label: "WhatsApp",  href: "https://wa.me/97145587968",                  bg: "#25D366" },
              ].map(({ Icon, label, href, bg }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl transition-all hover:scale-110 hover:brightness-125"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <Icon size={15} style={{ color: bg }} />
                </a>
              ))}
            </div>
          </div>

          {/* avatar + social proof */}
          <div data-anim className="mt-10 flex items-center gap-5">
            <div className="flex -space-x-2.5">
              {avatars.map((src, i) => (
                <img key={i} src={src} alt="client"
                  className="h-9 w-9 rounded-full object-cover"
                  style={{ border: "2px solid #050913", zIndex: 4 - i }} />
              ))}
            </div>
            <div className="flex items-center gap-6">
              {[
                { val: "60+",  label: "Clients" },
                { val: "18",   label: "Markets" },
                { val: "145%", label: "YoY Growth" },
              ].map(({ val, label }) => (
                <div key={label} className="text-center">
                  <div className="font-display font-bold text-[18px] leading-none text-white">{val}</div>
                  <div className="font-body text-[9px] uppercase tracking-[2px] text-white/30 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ══ RIGHT — stat cards ════════════════════════════ */}
        <div ref={rightRef} className="relative hidden lg:block" style={{ height: "560px" }}>

          {/* Card 1 — Total Clients (line chart) */}
          <div ref={card1} className="absolute top-0 right-0 w-[220px]">
            <GlassCard>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-[10px] uppercase tracking-[1.5px] text-white/35">Total Clients</span>
                <span className="flex items-center gap-1 font-display text-[11px] font-semibold text-green-400">
                  <ChevronUp size={11} /> 12%
                </span>
              </div>
              <div className="font-display font-bold text-[32px] leading-none text-white mb-3">60+</div>
              <ResponsiveContainer width="100%" height={60}>
                <LineChart data={clientsTrend}>
                  <Line type="monotone" dataKey="v" stroke="#4ADE80" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>

          {/* Card 2 — Markets pie */}
          <div ref={card2} className="absolute top-[170px] left-0 w-[210px]">
            <GlassCard>
              <div className="font-body text-[10px] uppercase tracking-[1.5px] text-white/35 mb-2">Markets</div>
              <div className="flex items-center gap-3">
                <ResponsiveContainer width={80} height={80}>
                  <PieChart>
                    <Pie data={marketsData} cx="50%" cy="50%" innerRadius={22} outerRadius={38} dataKey="value" strokeWidth={0}>
                      {marketsData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-col gap-1.5">
                  {marketsData.map((m) => (
                    <div key={m.name} className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full flex-none" style={{ background: m.color }} />
                      <span className="font-body text-[10px] text-white/40">{m.name}</span>
                      <span className="font-body text-[10px] text-white/70 ml-auto">{m.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Card 3 — Real-time clients */}
          <div ref={card3} className="absolute top-[160px] right-0 w-[200px]">
            <GlassCard>
              <div className="flex items-center justify-between mb-1">
                <span className="font-body text-[10px] uppercase tracking-[1.5px] text-white/35">Active Now</span>
                <span className="h-2 w-2 rounded-full bg-green-400 pulse-dot" />
              </div>
              <div className="font-display font-bold text-[28px] leading-none text-white mb-3">23</div>
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={realtimeLine}>
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4361EE" stopOpacity={0.4} />
                      <stop offset="100%" stopColor="#4361EE" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area type="monotone" dataKey="v" stroke="#4361EE" strokeWidth={2} fill="url(#areaGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </GlassCard>
          </div>

          {/* Card 4 — Capital gauge */}
          <div ref={card4} className="absolute bottom-0 right-[10px] w-[230px]">
            <GlassCard>
              <div className="font-body text-[10px] uppercase tracking-[1.5px] text-white/35 mb-1">Capital Structured</div>
              <div className="font-display font-bold text-[26px] leading-none text-white mb-1">$124M+</div>
              <div className="flex items-center gap-3 mt-2">
                <ResponsiveContainer width={80} height={80}>
                  <RadialBarChart cx="50%" cy="50%" innerRadius={22} outerRadius={38} data={gaugeData} startAngle={225} endAngle={-45}>
                    <RadialBar dataKey="value" cornerRadius={6} background={{ fill: "rgba(67,97,238,0.12)" }} />
                  </RadialBarChart>
                </ResponsiveContainer>
                <div>
                  <div className="font-display font-semibold text-[28px] leading-none" style={{
                    background: "linear-gradient(135deg,#6B8AF4,#4361EE)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>74%</div>
                  <div className="font-body text-[10px] text-white/30 mt-0.5">Target</div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* badge pill */}
          <div className="absolute top-[320px] left-[30px] flex items-center gap-2 rounded-full px-4 py-2"
            style={{ background: "rgba(10,15,40,0.9)", border: "1px solid rgba(67,97,238,0.28)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.5)" }}>
            <span className="h-2 w-2 rounded-full bg-[#4361EE]" style={{ boxShadow: "0 0 6px #4361EE" }} />
            <span className="font-body text-[11px] text-white/55">Structure formed in 48 hrs</span>
          </div>
        </div>
      </div>

      {/* ── client logos bar ── */}
      <div className="relative z-10 border-t border-white/[0.05] py-8">
        <div className="mx-auto max-w-[1440px] px-6 md:px-16">
          <p className="text-center font-body text-[9px] uppercase tracking-[3px] text-white/20 mb-7">
            Trusted by businesses across 18 markets
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
            {["Goldafrix", "U Remit", "Konsälidön", "Vantage", "Axiom", "Meridian"].map((c) => (
              <span key={c}
                className="font-display font-semibold text-[15px] text-white/15 hover:text-white/40 transition-colors duration-500 select-none tracking-wide">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
