import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsapSetup";
import { MessageSquare, FileText, Cog, CheckCircle2 } from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const steps = [
  { n: "01", icon: <MessageSquare size={22} />, title: "Free Consultation",  body: "30-minute discovery call to understand your goals and constraints. No commitment." },
  { n: "02", icon: <FileText size={22} />,      title: "Strategy & Plan",    body: "Structuring proposal with jurisdictions, timelines and fixed pricing in 48 hours." },
  { n: "03", icon: <Cog size={22} />,           title: "Execution",          body: "We file, open banking, and handle documentation end-to-end. You stay informed." },
  { n: "04", icon: <CheckCircle2 size={22} />,  title: "Done & Live",        body: "You receive a fully operational structure with ongoing support from our team." },
];

export function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const path    = ref.current.querySelector<SVGPathElement>("[data-line]");
    const circles = ref.current.querySelectorAll<HTMLElement>("[data-step-circle]");
    const texts   = ref.current.querySelectorAll<HTMLElement>("[data-step-text]");

    if (path) {
      const len = path.getTotalLength();
      path.style.strokeDasharray  = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    }
    gsap.set(circles, { scale: 0, opacity: 0 });
    gsap.set(texts,   { y: 28, opacity: 0 });

    const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: "top 70%", once: true } });
    if (path) tl.to(path, { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" });
    tl.to(circles, { scale: 1, opacity: 1, duration: 0.55, stagger: 0.28, ease: "back.out(2.5)" }, "-=1.5");
    tl.to(texts,   { y: 0, opacity: 1, duration: 0.65, stagger: 0.22, ease: "power3.out" }, "-=1.3");
  }, []);

  return (
    <section className="bg-[#F5F4F0] py-28 md:py-36 relative overflow-hidden">
      <FloatingParticles count={45} color="rgba(212,175,55,0.42)" ringColor="rgba(212,175,55,0.28)" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      <div ref={ref} className="relative mx-auto max-w-[1280px] px-6 md:px-16">
        <div className="text-center max-w-2xl mx-auto">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Our Process</p>
          <h2 className="mt-4 font-display font-extrabold leading-[1.0]"
            style={{ fontSize: "clamp(34px, 4.2vw, 58px)", letterSpacing: "-0.03em" }}>
            From Inquiry to{" "}
            <span className="font-serif italic text-gold" style={{ fontSize: "0.92em" }}>Execution</span>
          </h2>
          <p className="mt-5 font-body text-[15px] text-muted2 max-w-lg mx-auto leading-relaxed">
            A clear four-step process. No ambiguity, no surprise fees.
          </p>
        </div>

        <div className="relative mt-20">
          <svg viewBox="0 0 1000 20" preserveAspectRatio="none"
            className="absolute left-[7%] right-[7%] top-9 h-5 w-[86%] hidden md:block">
            <path data-line d="M0 10 L1000 10"
              stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="6 6" fill="none" />
          </svg>

          <div className="relative grid gap-14 md:grid-cols-4 md:gap-6">
            {steps.map((s) => (
              <div key={s.n} className="text-center group">
                <div data-step-circle
                  className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full bg-white border-2 border-gold text-gold transition-all group-hover:bg-gold group-hover:text-white"
                  style={{ boxShadow: "0 8px 32px rgba(212,175,55,0.22)" }}>
                  {s.icon}
                </div>
                <div data-step-text className="mt-7">
                  <div className="font-display font-bold text-[12px] uppercase tracking-[2px] text-gold mb-2">{s.n}</div>
                  <h4 className="font-display font-bold text-[17px] text-charcoal">{s.title}</h4>
                  <p className="mt-3 font-body text-[13px] text-muted2 leading-relaxed max-w-[190px] mx-auto">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
