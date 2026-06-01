import { useScrollReveal } from "@/lib/useScrollReveal";
import {
  MapPin, Puzzle, Cog, Zap, ShieldCheck, Users,
  Flag, Globe,
} from "lucide-react";

const features = [
  { icon: <MapPin size={18} />,   title: "Based in Dubai, Operating Internationally", body: "Operating from Dubai with strong on-ground support across 18 global jurisdictions." },
  { icon: <Puzzle size={18} />,   title: "Comfortable With Complex Structures",       body: "Structuring complex SPVs, layered holding companies, and fund vehicles across highly regulated financial jurisdictions." },
  { icon: <Cog size={18} />,      title: "True End-to-End Execution",                 body: "From corporate registry filing to institutional banking access and regulatory compliance, we manage the entire institutional lifecycle." },
  { icon: <Zap size={18} />,      title: "Fast and Fully Transparent",                body: "Clear timelines, fixed fees, and complete cost visibility." },
  { icon: <ShieldCheck size={18} />, title: "Compliance-First Approach",              body: "Compliance-first advisory aligned with OECD reporting, FATF guidelines, AML compliance, and international financial regulations." },
  { icon: <Users size={18} />,    title: "Truly International Team",                  body: "A global team with cross-border experience supporting diverse client needs." },
];

const jurisdictions = [
  { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/uae.png", name: "United Arab Emirates", tag: "Popular",      color: "#D4AF37" },
  { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/british.png", name: "British Virgin Islands", tag: "Tax-efficient", color: "#D4AF37" },
  { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/Cayman-Islands.png", name: "Cayman Islands",         tag: "Funds",        color: "#D4AF37" },
  { flag: "🇭🇰", name: "Hong Kong",              tag: "Asia hub",     color: "#D4AF37" },
  { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/Seychelles.png", name: "Seychelles",             tag: "IBC",          color: "#D4AF37" },
  { flag: "https://www.orpheusfinancial.co/wp-content/uploads/2026/04/marshall-island.png", name: "Marshall Islands",     tag: "Confidential", color: "#D4AF37" },
  { flag: "🇲🇺", name: "Mauritius",              tag: "Treaties",     color: "#D4AF37" },
];

export function WhyChoose() {
  const leftRef  = useScrollReveal<HTMLDivElement>({ childSelector: "[data-feat]", stagger: 0.08, y: 30 });
  const rightRef = useScrollReveal<HTMLDivElement>({ childSelector: "[data-jur]",  stagger: 0.07, y: 20 });

  return (
    <section className="bg-[#1D1C1C] text-white py-28 md:py-36 relative overflow-hidden">
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      {/* gold orb */}
      <div className="absolute" style={{
        top: "-5%", right: "-10%", width: "50%", height: "70%",
        background: "radial-gradient(ellipse at 60% 30%, rgba(212,175,55,0.08) 0%, transparent 65%)",
        filter: "blur(60px)", pointerEvents: "none",
      }} />

      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 md:px-16 lg:grid-cols-2 lg:gap-20">

        {/* Left */}
        <div>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Why Choose Us</p>
          <h2 className="mt-4 font-display font-extrabold leading-[1.0]"
            style={{ fontSize: "clamp(34px, 4.2vw, 58px)", letterSpacing: "-0.03em" }}>
            Why Leading Businesses{" "}
            <span className="font-serif italic text-gold" style={{ fontSize: "0.92em" }}>
              Trust Orpheus
            </span>
          </h2>

          <div ref={leftRef} className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f) => (
              <div key={f.title} data-feat
                className="group rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:bg-gold/[0.07] hover:border-gold/30 cursor-default"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold/10 text-gold mb-4 transition-all group-hover:bg-gold group-hover:text-charcoal">
                  {f.icon}
                </div>
                <h4 className="type-feature-title">{f.title}</h4>
                <p className="type-feature-body">{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Jurisdictions */}
        <div>
          <div
            ref={rightRef}
            className="rounded-3xl border border-gold/15 p-8 md:p-10 lg:sticky lg:top-32"
            style={{
              background: "rgba(20,20,20,0.95)",
              boxShadow: "0 32px 80px rgba(0,0,0,0.15), inset 0 1px 0 rgba(212,175,55,0.08)",
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Globe size={16} className="text-gold" />
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Top Jurisdictions</p>
            </div>
            <h3 className="font-display font-bold text-[26px] text-white leading-tight">Where We Structure</h3>
            <p className="type-prose-body-on-dark mt-2 text-white/72">Most frequently used offshore locations.</p>

            <ul className="mt-8 divide-y divide-white/[0.06]">
              {jurisdictions.map((j) => (
                <li key={j.name} data-jur
                  className="flex items-center justify-between py-4 group hover:bg-gold/[0.04] px-2 -mx-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-4">
                    {j.flag.startsWith("http") ? (
                      <img src={j.flag} className="w-[30px] h-[19px] object-cover rounded-sm border border-white/10 flex-none" alt={j.name} />
                    ) : (
                      <span className="text-[22px]">{j.flag}</span>
                    )}
                    <span className="font-body text-[15px] font-medium text-white/80 transition-colors group-hover:text-white">{j.name}</span>
                  </div>
                  <span className="rounded-full border border-gold/25 bg-gold/[0.08] px-3 py-1 font-display text-[9px] uppercase tracking-[1.5px] text-gold font-semibold">
                    {j.tag}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
              <p className="font-body text-[14px] font-medium text-white/45">+12 more active jurisdictions</p>
              <Flag size={13} className="text-gold/30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
