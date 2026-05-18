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
      className="rounded-3xl p-10 relative overflow-hidden"
      style={{
        background: "#F3F5F8",
        border: "1px solid rgba(212,175,55,0.22)",
        boxShadow: "0 24px 60px rgba(29,28,28,0.04)",
      }}
    >
      <div className="absolute inset-0 grid-texture opacity-60 pointer-events-none" />
      <div className="relative">
        <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Timeline</p>
        <h3 className="mt-3 font-display text-3xl text-[#1D1C1C]">Our Journey</h3>
        <div className="mt-8 relative pl-8">
          <svg className="absolute left-0 top-0 w-2 h-full" viewBox="0 0 4 400" preserveAspectRatio="none">
            <line data-line x1="2" y1="0" x2="2" y2="400" stroke="#D4AF37" strokeWidth="2" />
          </svg>
          <ul className="space-y-8">
            {milestones.map((m) => (
              <li key={m.year} data-mile className="relative">
                <span className="absolute -left-[34px] top-1 h-3 w-3 rounded-full bg-gold border-2 border-[#F3F5F8]" />
                <div className="font-display italic text-gold text-2xl">{m.year}</div>
                <p className="mt-2 font-body text-sm text-[#1D1C1C]/65 leading-relaxed font-bold">{m.event}</p>
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
            <h2 className="mt-5 font-display font-extrabold leading-[1.08]" style={{ fontSize: "clamp(32px, 3.8vw, 54px)", letterSpacing: "-0.03em" }}>
              <RevealText trigger="scroll" stagger={0.06} className="text-charcoal">Founded to</RevealText>{" "}
              <RevealText trigger="scroll" stagger={0.06} delay={0.2} className="italic text-gold">
                Execute, Not Just Advise.
              </RevealText>
            </h2>
            <div className="mt-8 space-y-6 font-body text-sm text-muted2 leading-[1.9] max-w-xl font-bold">
              <p>
                Orpheus Financial was founded with a singular vision—to empower businesses and individuals with strategic financial solutions that transcend borders. In an increasingly complex global economy, navigating offshore setups, banking solutions, asset management, and corporate financial planning requires expertise, trust, and discretion. Recognizing this need, we built Orpheus Financial as a dedicated partner for those seeking seamless and secure financial services tailored to their unique goals.
              </p>
              <p>
                From the very beginning, we set out to bridge the gap between financial ambition and execution. Our journey started with a team of industry experts who understood the intricacies of global banking, investment structuring, and corporate financial management. With years of experience in the field, we recognized that many businesses and high-net-worth individuals faced challenges in establishing offshore entities, accessing international banking solutions, and managing their wealth effectively. Orpheus Financial was created to remove these barriers, offering personalized, compliant, and result-driven financial solutions.
              </p>
              <p>
                At the heart of our success is a commitment to confidentiality, integrity, and excellence. We prioritize our clients’ privacy, ensuring that every financial transaction and strategy is executed with the highest level of security and discretion. Our strong global network of banking institutions, legal advisors, and financial experts allows us to deliver seamless services, helping clients optimize their assets while staying fully compliant with international regulations.
              </p>
              <p>
                Over the years, we have helped businesses expand into new markets, facilitated offshore company formations, structured complex asset management plans, and assisted clients in securing corporate banking solutions that align with their long-term vision. Our reputation for reliability and professionalism has made us a trusted name in the financial industry, and we continue to innovate and adapt to the evolving financial landscape.
              </p>
              <p>
                At Orpheus Financial, our story is defined by our clients’ success. We don’t just offer financial services—we create pathways to financial freedom, stability, and growth. Whether you are looking to establish an offshore entity, optimize your banking strategy, or manage your wealth more efficiently, we stand ready to guide you every step of the way. Welcome to Orpheus Financial.
              </p>
            </div>
          </div>
          <StoryTimeline />
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#F3F5F8] py-24 md:py-32 relative overflow-hidden border-t border-b border-[#1D1C1C]/[0.06]">
        <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/[0.03] rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
          <div className="grid gap-8 lg:grid-cols-2 items-stretch">
            {/* Vision Card */}
            <div 
              className="relative rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col justify-between"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow: "0 20px 50px rgba(29,28,28,0.03)"
              }}
            >
              <div className="absolute inset-0 grid-texture opacity-20 pointer-events-none" />
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 mb-8">
                  <span className="text-gold text-xl">👁️</span>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-wide text-[#1D1C1C]">Orpheus on Vision</h3>
                <p className="mt-6 font-body text-sm text-[#1D1C1C]/65 leading-[1.8] font-bold">
                  At Orpheus, we believe that your financial journey should be straightforward and stress-free. Our mission is to simplify complexities, empower you to achieve your business goals, and make the world of finance accessible and efficient.
                </p>
              </div>
              <div className="mt-8 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </div>

            {/* Mission Card */}
            <div 
              className="relative rounded-3xl p-8 md:p-12 overflow-hidden flex flex-col justify-between"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow: "0 20px 50px rgba(29,28,28,0.03)"
              }}
            >
              <div className="absolute inset-0 grid-texture opacity-20 pointer-events-none" />
              <div>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gold/10 border border-gold/20 mb-8">
                  <span className="text-gold text-xl">🚀</span>
                </div>
                <h3 className="font-display text-2xl font-medium tracking-wide text-[#1D1C1C]">Orpheus on Mission</h3>
                <p className="mt-6 font-body text-sm text-[#1D1C1C]/65 leading-[1.8] font-bold">
                  We envision Orpheus as your steadfast companion in the dynamic world of business and asset management. We strive to create an ecosystem where you can grow and prosper seamlessly. Imagine having all your financial needs met in one place, where opportunities are endless, and success is within reach.
                </p>
              </div>
              <div className="mt-8 h-px bg-gradient-to-r from-gold/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#FFFFFF] py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-30 pointer-events-none" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="orb w-[500px] h-[500px] bg-gold/[0.05] top-0 left-[-100px]" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">What Guides Us</p>
            <h2 className="mt-5 font-display font-extrabold leading-[1.08] text-[#1D1C1C]" style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em" }}>
              <RevealText trigger="scroll" stagger={0.06} className="text-[#1D1C1C]">The Principles Behind</RevealText>{" "}
              <RevealText trigger="scroll" stagger={0.06} delay={0.2} className="italic text-gold">
                Every Engagement
              </RevealText>
            </h2>
          </div>
          <div ref={valRef} className="mt-16 grid gap-5 md:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                data-val
                className="group rounded-2xl border border-gold/[0.18] bg-[#F3F5F8] p-8 transition-all duration-300 hover:bg-[#FFFFFF] hover:border-gold/40 hover:shadow-lg hover:shadow-black/[0.02]"
              >
                <div className="text-3xl">{v.icon}</div>
                <h3 className="mt-5 font-display text-xl text-[#1D1C1C]">{v.title}</h3>
                <p className="mt-3 font-body text-sm text-[#1D1C1C]/65 leading-relaxed font-bold">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Pillars */}
      <section className="bg-white py-24 md:py-32 relative overflow-hidden border-t border-gold/10">
        <div className="absolute inset-0 grid-texture-white opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            
            {/* Confidentiality & Trust */}
            <div>
              <span className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Corporate Pillar I</span>
              <h3 className="mt-4 font-display text-3xl font-medium text-charcoal">Confidentiality & Trust</h3>
              <div className="mt-6 space-y-4 font-body text-sm text-muted2 leading-[1.8] font-bold">
                <p>
                  At Orpheus Financial, confidentiality is at the core of our operations. We understand that financial matters require the highest level of discretion, and we take every measure to ensure the privacy and security of our clients’ information. Our secure systems and stringent protocols are designed to protect sensitive data, ensuring that all transactions and communications remain strictly confidential.
                </p>
                <p>
                  Whether it’s offshore setup, banking solutions, asset management, or corporate account openings, our clients can trust us to handle their financial needs with absolute integrity. We believe that trust is built over time through consistent reliability and ethical business practices, which is why we maintain a transparent yet secure environment for all our financial dealings.
                </p>
              </div>
            </div>

            {/* Expertise & Reliability */}
            <div>
              <span className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Corporate Pillar II</span>
              <h3 className="mt-4 font-display text-3xl font-medium text-charcoal">Expertise & Reliability</h3>
              <div className="mt-6 space-y-4 font-body text-sm text-muted2 leading-[1.8] font-bold">
                <p>
                  Orpheus Financial is backed by a team of professionals with years of experience in the financial sector. Our expertise spans across various domains, including offshore company formations, global banking solutions, wealth and asset management, and debt-raising strategies.
                </p>
                <p>
                  We take a client-centric approach, ensuring that every financial solution we offer is tailored to meet the unique needs of businesses and individuals. Our strong network of banking institutions and corporate partners allows us to provide seamless and efficient financial services, empowering our clients with the flexibility and security they need to grow their assets. With a focus on compliance, strategic planning, and long-term financial stability, Orpheus Financial stands as a trusted partner for those seeking expert financial solutions worldwide.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      <FounderSection />

      {/* Team Stats */}
      <section className="relative py-0 overflow-hidden bg-[#1D1C1C]">
        <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
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
        <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)" }} />
      </section>
    </main>
  );
}
