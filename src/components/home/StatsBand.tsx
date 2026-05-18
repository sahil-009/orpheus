import { useRef } from "react";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { StatCounter } from "@/components/ui/StatCounter";
import { Users, Globe, TrendingUp, ShieldCheck } from "lucide-react";

const stats = [
  { val: 60,  suffix: "+", label: "Trusted Clients",  desc: "across 18 countries",      icon: <Users size={20} /> },
  { val: 18,  suffix: "",  label: "Active Markets",   desc: "in operation globally",     icon: <Globe size={20} /> },
  { val: 145, suffix: "%", label: "YoY Growth",       desc: "annual performance",        icon: <TrendingUp size={20} /> },
  { val: 100, suffix: "%", label: "Compliance",        desc: "OECD-aligned standards",   icon: <ShieldCheck size={20} /> },
];

export function StatsBand() {
  const ref = useScrollReveal<HTMLDivElement>({ childSelector: "[data-stat]", stagger: 0.12, y: 30 });

  return (
    <section className="relative overflow-hidden bg-[#080808]">
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      {/* gold glow center */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-40 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 100% at 50% 50%, rgba(212,175,55,0.08) 0%, transparent 70%)",
      }} />

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />

      <div ref={ref} className="relative mx-auto max-w-[1440px] grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            data-stat
            className={`group relative px-8 py-16 text-center md:text-left transition-colors hover:bg-gold/[0.04] ${i > 0 ? "md:border-l border-gold/[0.09]" : ""} border-t border-b border-gold/[0.09]`}
          >
            {/* top accent on hover */}
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-transparent via-gold to-transparent transition-all duration-700 group-hover:w-full" />

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gold/10 text-gold mt-1 md:mt-2 transition-all group-hover:bg-gold group-hover:text-charcoal">
                {s.icon}
              </div>
              <div>
                <div className="font-display font-extrabold text-white stat-number"
                  style={{ fontSize: "clamp(40px, 5vw, 62px)", lineHeight: 1, letterSpacing: "-0.03em" }}>
                  <StatCounter to={s.val} suffix={s.suffix} />
                </div>
                <div className="mt-2 font-display font-semibold text-[11px] uppercase tracking-[2.5px] text-gold">
                  {s.label}
                </div>
                <div className="mt-1 font-body text-[11px] text-white/25">{s.desc}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
    </section>
  );
}
