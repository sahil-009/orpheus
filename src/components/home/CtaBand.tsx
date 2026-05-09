import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";
import { OButton } from "@/components/ui/OButton";
import { ArrowRight, PhoneCall } from "lucide-react";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

export function CtaBand() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current.querySelector("[data-inner]"),
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true } });
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36 bg-[#080808]">
      <ParticleCanvas />

      {/* gold radial */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(212,175,55,0.12) 0%, transparent 65%)"
      }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      {/* lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)"
      }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)"
      }} />

      <div data-inner className="relative z-10 mx-auto max-w-[800px] px-6 text-center text-white">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Ready to Begin?</p>
        <h2 className="mt-5 font-display font-extrabold leading-[1.0]"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-0.03em" }}>
          Ready to{" "}
          <span className="font-serif italic" style={{
            background: "linear-gradient(130deg, #C8A96A, #D4AF37, #F7EFD6, #D4AF37, #A88829)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            Structure Your Future?
          </span>
        </h2>
        <p className="mt-6 font-body text-[15px] text-white/40 max-w-xl mx-auto leading-relaxed">
          Book a free 30-minute consultation. We'll map your structure, jurisdictions and next steps in plain English. No commitment required.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <OButton variant="gold">
              Book Free Consultation <ArrowRight size={14} />
            </OButton>
          </Link>
          <a href="tel:+97145587968">
            <OButton variant="ghost-light">
              <PhoneCall size={14} /> +971 4 558 7968
            </OButton>
          </a>
        </div>
      </div>
    </section>
  );
}
