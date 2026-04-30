import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";
import { PageHero } from "@/components/ui/PageHero";
import { StatCounter } from "@/components/ui/StatCounter";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { RevealText } from "@/components/ui/RevealText";
import { FounderSection } from "@/components/home/FounderSection";

const milestones = [
  { year: "2019", event: "Founded in Dubai with a focus on global structuring." },
  { year: "2021", event: "First 10 clients across 5 countries; Banking practice launched." },
  { year: "2023", event: "Expanded to 18 active markets; Debt Raising practice added." },
  { year: "2026", event: "60+ businesses structured globally with 8 specialists onboard." },
];

const values = [
  { icon: "🔍", title: "Transparency",  body: "Fixed fees, clear timelines, no surprises in the engagement." },
  { icon: "🎯", title: "Expertise",     body: "Cross-border specialists with first-hand jurisdictional knowledge." },
  { icon: "⚡", title: "Execution",     body: "We don't just advise — we file, open, and operate alongside you." },
  { icon: "🔒", title: "Privacy",       body: "Discreet engagement and tight data hygiene throughout." },
  { icon: "🛡️", title: "Compliance",   body: "FCA-aware practices, OECD-aligned reporting standards." },
  { icon: "🤝", title: "Trust",         body: "Long-term relationships built on doing exactly what we said we would." },
];

function StoryTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const path  = ref.current.querySelector<SVGLineElement>("[data-line]");
    const items = ref.current.querySelectorAll<HTMLElement>("[data-mile]");

    if (path) {
      const len = (path as unknown as SVGGeometryElement).getTotalLength?.() ?? 400;
      path.style.strokeDasharray  = `${len}`;
      path.style.strokeDashoffset = `${len}`;
      gsap.to(path, {
        strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
      });
    }
    gsap.fromTo(items,
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, stagger: 0.2, duration: 0.75, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 75%", once: true } });
  }, []);

  return (
    <div
      ref={ref}
      className="rounded-3xl text-white p-10 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0D0D0D 0%, #111 100%)",
        border: "1px solid rgba(67,97,238,0.15)",
        boxShadow: "0 24px 60px rgba(0,0,0,0.35)",
      }}
    >
      <div className="absolute inset-0 grid-texture opacity-60 pointer-events-none" />
      <div className="relative">
        <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Timeline</p>
        <h3 className="mt-3 font-display text-3xl">Our Journey</h3>
        <div className="mt-8 relative pl-8">
          <svg className="absolute left-0 top-0 w-2 h-full" viewBox="0 0 4 400" preserveAspectRatio="none">
            <line data-line x1="2" y1="0" x2="2" y2="400" stroke="#4361EE" strokeWidth="2" />
          </svg>
          <ul className="space-y-8">
            {milestones.map((m) => (
              <li key={m.year} data-mile className="relative">
                <span className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-gold border-2 border-[#0D0D0D]" />
                <div className="font-display italic text-gold text-2xl">{m.year}</div>
                <p className="mt-2 font-body text-sm text-white/50 leading-relaxed">{m.event}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const valRef  = useScrollReveal<HTMLDivElement>({ childSelector: "[data-val]", stagger: 0.1, y: 30 });
  const teamRef = useScrollReveal<HTMLDivElement>({ childSelector: "[data-tstat]", stagger: 0.1, y: 30 });

  return (
    <main>
      <PageHero
        breadcrumb="About"
        title="Built for Entrepreneurs"
        titleAccent="Who Think Global."
        subtitle="We are a Dubai-based financial advisory firm, structured to support founders, family offices and ambitious businesses operating across borders."
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-4 max-w-3xl">
          {[
            { v: 60,  s: "+", l: "Clients" },
            { v: 18,  s: "",  l: "Countries" },
            { v: 145, s: "%", l: "Growth" },
            { v: 100, s: "%", l: "Compliant" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display italic gold-shimmer" style={{ fontSize: "clamp(36px, 4.5vw, 52px)", lineHeight: 1 }}>
                <StatCounter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-2 font-body text-[10px] uppercase tracking-[2px] text-white/35">{s.l}</div>
            </div>
          ))}
        </div>
      </PageHero>

      {/* Our Story */}
      <section className="bg-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-white opacity-60 pointer-events-none" />
        <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 md:px-16 lg:grid-cols-2 lg:gap-20 items-start">
          <div>
            <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Our Story</p>
            <h2 className="mt-5 font-display font-medium leading-[1.08]" style={{ fontSize: "clamp(32px, 3.8vw, 54px)" }}>
              <RevealText trigger="scroll" stagger={0.06} className="text-charcoal">Founded to</RevealText>{" "}
              <RevealText trigger="scroll" stagger={0.06} delay={0.2} className="italic text-gold">
                Execute, Not Just Advise.
              </RevealText>
            </h2>
            <div className="mt-8 space-y-5 font-body text-sm text-muted2 leading-[1.9] max-w-lg">
              <p>
                Orpheus Financial was founded in Dubai in 2019 to fix one specific problem: most advisory firms tell entrepreneurs what to do, but won't actually do it with them. We built the opposite.
              </p>
              <p>
                Today we structure offshore companies, secure global banking, and raise debt for businesses across 18 markets — from Vancouver to Hong Kong, Geneva to Kampala.
              </p>
              <p>
                Our clients range from first-generation founders raising their first round to multi-generational family offices restructuring across jurisdictions. The constant: we run the engagement end-to-end.
              </p>
            </div>
          </div>
          <StoryTimeline />
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#0D0D0D] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-60 pointer-events-none" />
        <div className="orb w-[500px] h-[500px] bg-gold/[0.05] top-0 left-[-100px]" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">What Guides Us</p>
            <h2 className="mt-5 font-display font-medium leading-[1.08]" style={{ fontSize: "clamp(32px, 4vw, 56px)" }}>
              <RevealText trigger="scroll" stagger={0.06}>The Principles Behind</RevealText>{" "}
              <RevealText trigger="scroll" stagger={0.06} delay={0.2} className="italic gold-shimmer-slow">
                Every Engagement
              </RevealText>
            </h2>
          </div>
          <div ref={valRef} className="mt-16 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                data-val
                className="group rounded-2xl border border-gold/[0.12] bg-white/[0.03] p-8 transition-all duration-300 hover:bg-gold/[0.06] hover:border-gold/30"
              >
                <div className="text-3xl">{v.icon}</div>
                <h3 className="mt-5 font-display text-xl text-white">{v.title}</h3>
                <p className="mt-3 font-body text-sm text-white/45 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FounderSection />

      {/* Team Stats */}
      <section className="relative py-0 overflow-hidden bg-[#111]">
        <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(67,97,238,0.3), transparent)" }} />
        <div ref={teamRef} className="relative mx-auto grid max-w-[1280px] grid-cols-2 md:grid-cols-4 px-6 md:px-16">
          {[
            { v: 8,  s: "",  l: "Team Members" },
            { v: 5,  s: "+", l: "Nationalities" },
            { v: 18, s: "",  l: "Countries" },
            { v: 60, s: "+", l: "Clients" },
          ].map((s, i) => (
            <div
              key={s.l}
              data-tstat
              className={`px-6 py-14 text-center md:text-left ${i > 0 ? "md:border-l border-gold/[0.1]" : ""}`}
            >
              <div className="font-display italic text-white stat-number" style={{ fontSize: "clamp(36px, 4.5vw, 58px)", lineHeight: 1 }}>
                <StatCounter to={s.v} suffix={s.s} />
              </div>
              <div className="mt-3 font-body text-[11px] uppercase tracking-[2.5px] text-gold">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(67,97,238,0.3), transparent)" }} />
      </section>
    </main>
  );
}
