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
      className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden"
      style={{ background: "#F3F5F8", border: "1px solid rgba(212,175,55,0.25)", boxShadow: "0 24px 60px rgba(29,28,28,0.03)" }}
    >
      <img
        src="/image.png"
        alt="Formed in Days"
        loading="lazy"
        decoding="async"
        width={800}
        height={600}
        className="w-full h-full object-cover"
      />

      <div className="absolute bottom-5 right-5 flex items-center gap-2 rounded-full bg-gold/15 border border-gold/25 px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-gold pulse-dot" />
        <span className="font-body text-[10px] uppercase tracking-[2px] text-gold font-bold">Formed in Days</span>
      </div>
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
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll<SVGPathElement>("[data-fpath]");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray  = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    gsap.to(paths, {
      strokeDashoffset: 0, duration: 1.2, stagger: 0.25, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
    });
  }, []);

  const stages = ["Strategy", "Documentation", "Investor Matching", "Capital Secured"];
  return (
    <div
      className="relative aspect-square w-full rounded-2xl p-10"
      style={{ background: "#F3F5F8", border: "1px solid rgba(212,175,55,0.22)" }}
    >
      <svg ref={ref} viewBox="0 0 400 380" className="w-full h-auto">
        {[
          { d: "M40 40 L360 40 L320 110 L80 110 Z", x: 200, y: 78 },
          { d: "M80 130 L320 130 L290 200 L110 200 Z", x: 200, y: 168 },
          { d: "M110 220 L290 220 L260 290 L140 290 Z", x: 200, y: 258 },
          { d: "M140 310 L260 310 L235 365 L165 365 Z", x: 200, y: 342 },
        ].map((s, i) => (
          <g key={i}>
            <path data-fpath d={s.d} fill="rgba(212,175,55,0.04)" stroke="#D4AF37" strokeWidth="1.5" />
            <text x={s.x} y={s.y} textAnchor="middle" fontFamily="Inter" fontSize="12" fill="#D4AF37" fontWeight="600">
              {stages[i]}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ── Service Block ─────────────────────────────────────────── */
function ServiceBlock({
  num, title, body, bullets, visual, reverse, dark,
}: {
  num: string; title: string; body: string;
  bullets: { flag?: string; label: string; tag?: string }[];
  visual: ReactNode; reverse?: boolean; dark?: boolean;
}) {
  const bg = dark ? "bg-[#1D1C1C] text-white" : "bg-white text-[#1D1C1C]";

  return (
    <section className={`py-24 md:py-32 relative overflow-hidden ${bg}`}>
      {dark && <div className="absolute inset-0 grid-texture opacity-60 pointer-events-none" />}
      {!dark && <div className="absolute inset-0 grid-texture-white opacity-70 pointer-events-none" />}

      <div className={`relative mx-auto grid max-w-[1280px] gap-16 px-6 md:px-16 lg:grid-cols-2 lg:gap-20 items-center ${reverse ? "lg:[&>*:first-child]:order-last" : ""}`}>
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
        <div>{visual}</div>
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
        subtitle="Three integrated practice areas. Offshore structure, corporate finance advisory, and capital raising — delivered end-to-end under one advisory relationship."
      >
        <div className="flex flex-wrap gap-3">
          {["Offshore Structure & Banking", CORPORATE_FINANCE_ADVISORY.title, "Debt Raising"].map((t) => (
            <span key={t} className="rounded-full border border-gold/30 bg-gold/[0.08] px-5 py-2 font-body text-xs text-gold">
              {t}
            </span>
          ))}
        </div>
      </PageHero>

      <ServiceBlock
        num="01"
        title="Offshore Structure & Banking"
        body="We structure companies in the right jurisdiction and open the accounts they need — tax efficiency, banking access, IP holding, and operational presence in one integrated engagement. From incorporation and filings to KYC packs, banker introductions, and ongoing compliance across UAE, Europe, Asia, and the Caribbean."
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
        visual={
          <div className="flex flex-col gap-8">
            <WorldMapVisual />
            <BankCardVisual />
          </div>
        }
        dark={false}
      />

      <div id="corporate-finance-advisory" className="scroll-mt-28">
        <ServiceBlock
          num="02"
          title={CORPORATE_FINANCE_ADVISORY.title}
          body={CORPORATE_FINANCE_ADVISORY.description}
          bullets={CORPORATE_FINANCE_ADVISORY.capabilities.map((label) => ({ label }))}
          visual={<AdvisoryVisual />}
          reverse
          dark
        />
      </div>

      <section className="bg-white py-20 md:py-28 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-white opacity-70 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
          <AdvisoryServicesGrid variant="light" />
        </div>
      </section>

      <ServiceBlock
        num="03"
        title="Debt Raising"
        body="From lender selection to deal close. We build the data room, model the structure, run the process and negotiate term sheets — so you secure the right capital on the right terms."
        bullets={[
          { label: "Capital Strategy" },
          { label: "Documentation & Data Room" },
          { label: "Investor Matching" },
          { label: "Negotiation & Close" },
        ]}
        visual={<FunnelVisual />}
        dark={false}
      />

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
