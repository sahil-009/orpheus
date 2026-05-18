import { useEffect, useRef } from "react";
import { gsap, setupGsap } from "@/lib/gsapSetup";
import { OButton } from "@/components/ui/OButton";
import { Linkedin, Award, Globe, Users } from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const highlights = [
  { icon: <Globe size={14} />,  label: "18 Markets" },
  { icon: <Users size={14} />,  label: "60+ Clients" },
  { icon: <Award size={14} />,  label: "Dubai-based" },
];

export function FounderSection() {
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imgRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setupGsap();

    gsap.fromTo(leftRef.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: leftRef.current, start: "top 80%", once: true } });
    gsap.fromTo(rightRef.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 1.1, ease: "power3.out",
        scrollTrigger: { trigger: rightRef.current, start: "top 80%", once: true } });
    gsap.to(quoteRef.current, { y: -14, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5 });

    if (imgRef.current)
      gsap.to(imgRef.current, {
        yPercent: -10, ease: "none",
        scrollTrigger: { trigger: imgRef.current, start: "top bottom", end: "bottom top", scrub: true },
      });
  }, []);

  return (
    <section className="bg-[#F3F5F8] py-28 md:py-36 relative overflow-hidden">
      <FloatingParticles count={45} color="rgba(212,175,55,0.4)" ringColor="rgba(212,175,55,0.26)" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 md:px-16 lg:grid-cols-2 lg:gap-20 items-center">

        {/* LEFT — image */}
        <div ref={leftRef} className="relative needs-asset" data-marker="Asset: founder portrait (high-res)">
          <div className="absolute -top-3 -left-3 right-3 bottom-3 border-2 border-gold/40 rounded-3xl" />

          <div ref={imgRef} className="relative aspect-[0.85] rounded-3xl overflow-hidden"
            style={{ background: "linear-gradient(135deg, #D4AF3715, #11111108)" }}>
            <img
              src="https://media.licdn.com/dms/image/v2/D4D03AQEgp7EqO1XxMQ/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1673252878733?e=1779321600&v=beta&t=sNeJs21_znAv6zBbi1rZgl_XKpBUGYWUoyggkoQBuh0"
              alt="Rachit Yadav — Founder & CEO"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/3"
              style={{ background: "linear-gradient(to top, rgba(8,8,8,0.45), transparent)" }} />
          </div>

          {/* Floating quote card */}
          <div ref={quoteRef}
            className="absolute -bottom-6 -right-2 md:-right-8 max-w-[270px] rounded-2xl p-6"
            style={{
              background: "#1D1C1C",
              boxShadow: "0 28px 64px rgba(29,28,28,0.12), inset 0 1px 0 rgba(255,255,255,0.08)",
              border: "1px solid rgba(212,175,55,0.22)",
            }}
          >
            <span className="font-serif text-[40px] leading-none text-gold/25">"</span>
            <p className="font-serif italic text-white text-[15px] leading-snug -mt-2">
              We don't just advise — we execute.
            </p>
            <p className="mt-3 font-display font-semibold text-[10px] uppercase tracking-[2px] text-gold">
              Rachit Yadav, Founder & CEO
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div ref={rightRef}>
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Founder</p>
          <h2 className="mt-4 font-display font-extrabold leading-[1.0] text-[#1D1C1C]"
            style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.03em" }}>
            Rachit Yadav
          </h2>

          {/* Highlights row */}
          <div className="mt-6 flex flex-wrap gap-3">
            {highlights.map((h) => (
              <div key={h.label}
                className="flex items-center gap-2 rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-1.5">
                <span className="text-gold">{h.icon}</span>
                <span className="font-display font-semibold text-[11px] uppercase tracking-[1.5px] text-[#1D1C1C]">{h.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-5 font-body text-[14px] leading-[1.9] max-w-lg font-bold" style={{ color: "rgba(29,28,28,0.85)" }}>
            <p>
              Rachit Yadav founded Orpheus Financial with a single belief: international businesses deserve a financial partner who <em className="text-[#1D1C1C] font-semibold">actually executes</em> — not just advises.
            </p>
            <p>
              With a background spanning corporate finance, offshore structuring, and banking across emerging markets, Rachit has helped 60+ businesses from 18 countries set up globally, access banking, and raise capital.
            </p>
            <p>
              Based in Dubai, his team has built a reputation for taking on complex cases — oil, crypto, cross-border commodities — that most firms turn away.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-2">
            {["Offshore Structuring", "Banking Strategy", "Capital Raising", "Cross-border Tax", "Compliance"].map((t) => (
              <span key={t} className="rounded-full border border-gold/25 bg-gold/[0.07] px-4 py-1.5 font-display font-semibold text-[10px] uppercase tracking-[1.5px] text-gold-dark">
                {t}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <a href="https://www.linkedin.com/in/rachit-yadav-96a3951b9" target="_blank" rel="noopener noreferrer">
              <OButton variant="gold">
                <Linkedin size={14} /> Connect on LinkedIn
              </OButton>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
