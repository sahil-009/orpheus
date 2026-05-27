import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "@/lib/gsapSetup";
import { PageHero } from "@/components/ui/PageHero";
import { OButton } from "@/components/ui/OButton";
import { Link } from "react-router-dom";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { ClientLogosMarquee } from "@/components/services/ClientLogosMarquee";
import { CORPORATE_FINANCE_ADVISORY } from "@/data/corporateFinanceAdvisory";
import { ADVISORY_SERVICES } from "@/data/advisoryServices";
import { AdvisoryServicesGrid } from "@/components/services/AdvisoryServicesGrid";
import { Briefcase, LineChart, Globe2, Handshake, Lightbulb, TrendingUp } from "lucide-react";

/* ── World Map Visual ──────────────────────────────────────── */
function WorldMapVisual() {
  return (
    <div
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden flex items-center justify-center"
      style={{
        background: "radial-gradient(circle at 50% 50%, #1e1e1e 0%, #0d0d0d 100%)",
        border: "1px solid rgba(212,175,55,0.25)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)"
      }}
    >
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      {/* SVG Map Path or Network Map */}
      <svg viewBox="0 0 400 300" className="w-[85%] h-[85%] relative z-10">
        <g stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.45" strokeDasharray="3 3">
          {/* Paths connecting global hubs */}
          <path d="M80 120 Q190 60 200 150" />
          <path d="M200 150 Q210 240 320 180" strokeWidth="1.5" strokeDasharray="none" />
          <path d="M80 120 Q190 220 200 150" />
          <path d="M200 150 Q280 80 320 180" />
        </g>

        {/* Global nodes */}
        {[
          { x: 80, y: 120, label: "North America" },
          { x: 200, y: 150, label: "Dubai HQ" },
          { x: 320, y: 180, label: "Asia-Pacific" },
        ].map((n, i) => (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={i === 1 ? "8" : "5"} fill="#D4AF37" fillOpacity={i === 1 ? "0.9" : "0.75"} />
            <circle cx={n.x} cy={n.y} r={i === 1 ? "14" : "10"} fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" className="pulse-ring" style={{ transformOrigin: `${n.x}px ${n.y}px` }} />
            <text x={n.x} y={n.y - (i === 1 ? 18 : 12)} textAnchor="middle" fontSize="9" fill="#E5CB7E" fontFamily="Inter" fontWeight="600" letterSpacing="1px">
              {n.label}
            </text>
          </g>
        ))}
      </svg>

    </div>
  );
}

/* ── Bank Card Visual ──────────────────────────────────────── */
function BankCardVisual() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current || !window.matchMedia("(pointer: fine)").matches) return;
    const el = ref.current;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5) * 14;
      const y = ((e.clientY - r.top) / r.height - 0.5) * -14;
      gsap.to(el, { rotateY: x, rotateX: y, transformPerspective: 900, duration: 0.5, ease: "power2.out" });
    };
    const onLeave = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.9, ease: "elastic.out(1,0.4)" });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  return (
    <div className="flex justify-center" style={{ perspective: "1000px" }}>
      <div
        ref={ref}
        className="w-full max-w-[400px] rounded-2xl p-7 text-white"
        style={{
          background: "linear-gradient(135deg, #111 0%, #1A1A1A 60%, #222 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(212,175,55,0.2)",
          border: "1px solid rgba(212,175,55,0.18)",
        }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="font-body text-[10px] uppercase tracking-[2px] text-gold">Corporate Account</div>
            <div className="mt-2 font-display text-xl">Orpheus Treasury</div>
          </div>
          <span className="rounded-full bg-gold/15 border border-gold/30 px-3 py-1 font-body text-[10px] uppercase tracking-[2px] text-gold">
            Active
          </span>
        </div>

        <div className="mt-8 flex gap-2">
          {["🇺🇸", "🇦🇪", "🇪🇺", "🇬🇧"].map((f) => (
            <span key={f} className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.07] text-base">{f}</span>
          ))}
        </div>

        <div className="mt-6 font-body text-sm tracking-widest text-white/50">•••• •••• •••• 4821</div>

        <div className="mt-6 flex items-end justify-between">
          <div>
            <div className="font-body text-[10px] uppercase tracking-[2px] text-gold/60">Balance</div>
            <div className="font-display text-2xl">$ 1,284,500</div>
          </div>
          <div className="font-body text-[10px] text-white/30">USD · AED · EUR · GBP</div>
        </div>
      </div>
    </div>
  );
}

/* ── Advisory Visual ───────────────────────────────────────── */
const ADVISORY_ITEMS = ADVISORY_SERVICES.map(({ icon, title }) => ({
  icon,
  label: title,
}));

function AdvisoryVisual() {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
      style={{ background: "#F3F5F8", border: "1px solid rgba(212,175,55,0.22)", borderRadius: "1rem", padding: "2rem" }}
    >
      {ADVISORY_ITEMS.map(({ icon: Icon, label }) => (
        <div
          key={label}
          className="flex items-center gap-4 rounded-xl p-4 bg-white border border-gold/15"
          style={{ boxShadow: "0 8px 24px rgba(29,28,28,0.03)" }}
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold">
            <Icon size={20} />
          </div>
          <span className="font-body text-sm font-semibold text-[#1D1C1C] leading-snug">{label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Funnel Visual ─────────────────────────────────────────── */
function FunnelVisual() {
  return (
    <div
      className="relative aspect-square w-full rounded-2xl flex items-center justify-center p-6"
      style={{
        background: "radial-gradient(circle at 50% 50%, #1e1e1e 0%, #0d0d0d 100%)",
        border: "1px solid rgba(212,175,55,0.25)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.45)"
      }}
    >
      <style>{`
        @keyframes pulseRing {
          0% { transform: scale(0.95); opacity: 0.8; }
          50% { transform: scale(1.1); opacity: 0.4; }
          100% { transform: scale(1.25); opacity: 0; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(0.8); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(200px) scale(0.4); opacity: 0; }
        }
        .animate-pulse-ring {
          animation: pulseRing 3s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
        .particle-1 { animation: floatParticle 4s linear infinite; }
        .particle-2 { animation: floatParticle 4s linear infinite 1.3s; }
        .particle-3 { animation: floatParticle 4s linear infinite 2.6s; }
      `}</style>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.08]" style={{
        backgroundImage: "radial-gradient(circle, #D4AF37 1px, transparent 1px)",
        backgroundSize: "20px 20px"
      }} />

      <svg viewBox="0 0 400 380" className="w-[90%] h-[90%] relative z-10">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="50%" stopColor="#C8A96A" />
            <stop offset="100%" stopColor="#A88829" />
          </linearGradient>
          <radialGradient id="glowGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Central glowing column of capital flow */}
        <line x1="240" y1="50" x2="240" y2="280" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.6" />
        
        {/* Floating animated particles */}
        <circle cx="240" cy="60" r="3" fill="#D4AF37" className="particle-1" style={{ transformOrigin: "240px 60px" }} />
        <circle cx="240" cy="60" r="2.5" fill="#E5CB7E" className="particle-2" style={{ transformOrigin: "240px 60px" }} />
        <circle cx="240" cy="60" r="3" fill="#A88829" className="particle-3" style={{ transformOrigin: "240px 60px" }} />

        {/* 3D stacked ellipses for each funnel stage */}
        {[
          { y: 70, rx: 90, ry: 18, label: "Strategy & Model", desc: "Capital Stack Design" },
          { y: 140, rx: 70, ry: 14, label: "Data Room & Dossier", desc: "Institutional Ready Pack" },
          { y: 210, rx: 50, ry: 10, label: "Investor Matching", desc: "Targeted Lender Outreach" },
        ].map((ring, idx) => (
          <g key={idx} className="group">
            {/* Soft background glow for the ring */}
            <ellipse cx="240" cy={ring.y} rx={ring.rx + 20} ry={ring.ry + 8} fill="url(#glowGrad)" />

            {/* Main structural 3D ring border */}
            <ellipse cx="240" cy={ring.y} rx={ring.rx} ry={ring.ry} stroke="url(#goldGradient)" strokeWidth="1.5" fill="rgba(212,175,55,0.02)" />
            <ellipse cx="240" cy={ring.y + 4} rx={ring.rx} ry={ring.ry} stroke="url(#goldGradient)" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />

            {/* Label texts positioned elegantly to the left and right */}
            <text x={240 - ring.rx - 15} y={ring.y + 4} textAnchor="end" fontSize="11" fill="#FFFFFF" fontFamily="Inter" fontWeight="600" letterSpacing="0.5px">
              {ring.label}
            </text>
            <text x={240 - ring.rx - 15} y={ring.y + 18} textAnchor="end" fontSize="8" fill="#D4AF37" fontFamily="Inter" fontWeight="500" opacity="0.8">
              {ring.desc}
            </text>
          </g>
        ))}

        {/* Bottom Destination Node - Capital Secured */}
        <g>
          {/* Animated pulsing outer rings */}
          <circle cx="240" cy="290" r="28" fill="none" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" className="animate-pulse-ring" style={{ transformOrigin: "240px 290px" }} />
          <circle cx="240" cy="290" r="18" fill="none" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" className="animate-pulse-ring" style={{ transformOrigin: "240px 290px", animationDelay: "1.5s" }} />

          {/* Central sunburst glowing node */}
          <circle cx="240" cy="290" r="9" fill="url(#goldGradient)" />
          <circle cx="240" cy="290" r="15" fill="none" stroke="#D4AF37" strokeWidth="1.5" />
          
          <text x="240" y="338" textAnchor="middle" fontSize="12" fill="#FFFFFF" fontFamily="Inter" fontWeight="800" letterSpacing="1px">
            CAPITAL SECURED
          </text>
        </g>
      </svg>

      <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-gold/15 border border-gold/25 px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
        <span className="font-body text-[10px] uppercase tracking-[2px] text-gold font-bold">Closed Efficiently</span>
      </div>
    </div>
  );
}

/* ── Service Block ─────────────────────────────────────────── */
function ServiceBlock({
  num, title, body, bullets, visual, reverse, dark,
}: {
  num: string; title: ReactNode; body: string;
  bullets: { flag?: string; label: string; tag?: string }[];
  visual?: ReactNode; reverse?: boolean; dark?: boolean;
}) {
  const bg = dark ? "bg-[#1D1C1C] text-white" : "bg-white text-[#1D1C1C]";

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${bg}`}>
      {dark && <div className="absolute inset-0 grid-texture opacity-60 pointer-events-none" />}
      {!dark && <div className="absolute inset-0 grid-texture-white opacity-70 pointer-events-none" />}

      <div className={`relative mx-auto px-6 md:px-16 ${visual ? "grid max-w-[1280px] gap-16 lg:grid-cols-2 lg:gap-20 items-center" : "max-w-[800px]"} ${visual && reverse ? "lg:[&>*:first-child]:order-last" : ""}`}>
        <div className="relative">
          <span aria-hidden className="absolute -top-10 -left-2 font-display select-none pointer-events-none"
            style={{ fontSize: "130px", lineHeight: 1, color: dark ? "rgba(212,175,55,0.05)" : "rgba(212,175,55,0.07)" }}>
            {num}
          </span>
          <div className="relative">
            <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Service {num}</p>
            <h2 className={`mt-5 font-display font-extrabold leading-[1.08] ${dark ? "text-white" : "text-[#1D1C1C]"}`}
              style={{ fontSize: "clamp(32px, 3.5vw, 52px)", letterSpacing: "-0.03em" }}>
              {title}
            </h2>
            <p className={`mt-6 font-body text-[15px] leading-[1.85] max-w-lg font-bold ${dark ? "text-white/60" : "text-[#1D1C1C]/65"}`}>
              {body}
            </p>

            <ul className={`mt-8 space-y-0 divide-y ${dark ? "divide-gold/[0.1]" : "divide-gold/[0.12]"}`}>
              {bullets.map((b) => (
                <li key={b.label} className="flex items-center justify-between py-3.5">
                  <span className="flex items-center gap-3">
                    {b.flag && (
                      b.flag.startsWith("http") ? (
                        <img src={b.flag} loading="lazy" decoding="async" width={24} height={15} className="w-[24px] h-[15px] object-cover rounded-sm border border-gold/15 flex-none" alt="" />
                      ) : (
                        <span className="text-lg">{b.flag}</span>
                      )
                    )}
                    <span className={`font-body text-sm ${dark ? "text-white/75" : "text-[#1D1C1C]"}`}>{b.label}</span>
                  </span>
                  {b.tag && (
                    <span className="rounded-full border border-gold/25 bg-gold/[0.08] px-3 py-1 font-body text-[10px] uppercase tracking-[1.5px] text-gold">
                      {b.tag}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-9">
              <Link to="/contact"><OButton variant={dark ? "gold" : "gold"}>Discuss Your Case →</OButton></Link>
            </div>
          </div>
        </div>
        {visual && <div>{visual}</div>}
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function ServicesPage() {
  return (
    <main>
      <PageHero
        breadcrumb="Services"
        title="Our Services"
        titleAccent="Built for Execution."
        subtitle="Three integrated practice areas tailored for institutions and corporations: offshore structure, corporate finance advisory, and debt capital raising — delivered with institutional-grade precision."
      >
        <div className="flex flex-wrap gap-3">
          {["Offshore Structure & Banking", CORPORATE_FINANCE_ADVISORY.title, "Debt Raising"].map((t) => (
            <span key={t} className="rounded-full border border-gold/30 bg-gold/[0.08] px-5 py-2 font-body text-xs text-gold">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <div id="offshore-structure-banking" className="scroll-mt-28">
        <ServiceBlock
          num="01"
          title={
            <>
              Offshore Structure <span className="font-serif italic font-medium text-gold block sm:inline">& Banking</span>
            </>
          }
          body="We structure entities in optimal jurisdictions and secure the global banking facilities they require. We deliver regulatory compliance, tax-efficient structuring, IP holding setups, and operational hubs for financial institutions, fund vehicles, and cross-border corporations."
          bullets={[
            { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/uae.png", label: "United Arab Emirates",    tag: "Popular" },
            { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/british.png", label: "British Virgin Islands",  tag: "Tax-efficient" },
            { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/Cayman-Islands.png", label: "Cayman Islands",          tag: "Funds" },
            { flag: "🇭🇰", label: "Hong Kong",               tag: "Asia hub" },
            { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/Seychelles.png", label: "Seychelles",              tag: "IBC" },
            { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/marshall-island.png", label: "Marshall Islands",     tag: "Confidential" },
            { flag: "🇲🇺", label: "Mauritius",               tag: "Treaties" },
            { label: "Account Structuring" },
            { label: "Documentation & KYC Support" },
            { label: "Bank Coordination" },
            { label: "Ongoing Compliance" },
          ]}
          dark={false}
        />
      </div>

      <div id="corporate-finance-advisory" className="scroll-mt-28">
        <ServiceBlock
          num="02"
          title={
            <>
              Corporate Finance <span className="font-serif italic font-medium text-gold block sm:inline">Advisory</span>
            </>
          }
          body={CORPORATE_FINANCE_ADVISORY.description}
          bullets={CORPORATE_FINANCE_ADVISORY.capabilities.map((label) => ({ label }))}
          reverse
          dark
        />
      </div>

      <div id="debt-raising" className="scroll-mt-28">
        <ServiceBlock
          num="03"
          title={
            <>
              Debt <span className="font-serif italic font-medium text-gold block sm:inline">Raising</span>
            </>
          }
          body="Comprehensive debt capital advisory and process execution for businesses and funds. We design the capital stack, build institutional-ready data rooms, run structured lender outreach, and negotiate term sheets to secure competitive credit facilities."
          bullets={[
            { label: "Capital Strategy" },
            { label: "Documentation & Data Room" },
            { label: "Investor Matching" },
            { label: "Negotiation & Close" },
          ]}
          dark={false}
        />
      </div>

      <section className="bg-[#F3F5F8] py-16 md:py-20">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16">
          <ClientLogosMarquee
            variant="light"
            label="Trusted by businesses across 18 markets"
          />
        </div>
      </section>

      <ProcessTimeline />
    </main>
  );
}
