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
    <section ref={ref} className="relative overflow-hidden py-28 md:py-36" style={{ background: "linear-gradient(135deg, #E5CB7E 0%, #D4AF37 50%, #C8A96A 100%)" }}>
      <ParticleCanvas />

      {/* dark radial overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 70% 80% at 50% 50%, rgba(29,28,28,0.12) 0%, transparent 65%)"
      }} />
      {/* grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(29,28,28,1) 1px, transparent 1px), linear-gradient(90deg, rgba(29,28,28,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      {/* lines */}
      <div className="absolute top-0 inset-x-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(29,28,28,0.15), transparent)"
      }} />
      <div className="absolute bottom-0 inset-x-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(29,28,28,0.15), transparent)"
      }} />

      <div data-inner className="relative z-10 mx-auto max-w-[800px] px-6 text-center text-[#1D1C1C]">
        <p className="font-display text-[11px] font-bold uppercase tracking-[3px] text-[#1D1C1C]/60">Ready to Begin?</p>
        <h2 className="mt-5 font-display font-extrabold leading-[1.0]"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)", letterSpacing: "-0.03em" }}>
          Ready to{" "}
          <span className="font-serif italic text-white" style={{ textShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            Structure Your Future?
          </span>
        </h2>
        <p className="mt-6 font-body text-[15px] text-[#1D1C1C] max-w-xl mx-auto leading-relaxed font-bold">
          Book a free 30-minute consultation. We'll map your structure, jurisdictions and next steps in plain English. No commitment required.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/contact">
            <button className="flex items-center gap-2 rounded-xl px-7 py-3.5 font-display font-semibold text-[13px] text-white transition-all hover:scale-105 hover:brightness-110 active:scale-95 bg-[#1D1C1C] shadow-lg shadow-black/15">
              Book Free Consultation <ArrowRight size={14} />
            </button>
          </Link>
          <a href="tel:+97145587968" className="flex items-center gap-2 rounded-xl px-7 py-3.5 font-display font-semibold text-[13px] text-[#1D1C1C] border border-[#1D1C1C]/35 transition-all hover:bg-[#1D1C1C]/5 active:scale-95">
            <PhoneCall size={14} /> +971 4 558 7968
          </a>
        </div>
      </div>
    </section>
  );
}
