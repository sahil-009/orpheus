import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapSetup";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const items = [
  {
    quote: "We had an excellent experience working with Orpheus. Strong expertise, transparency, and attention to detail throughout the entire engagement from start to finish.",
    name: "U Remit",
    company: "Canada",
    initials: "UR",
    role: "Founder",
  },
  {
    quote: "Their team handled our financial matters efficiently and offered clear, well-structured advice that was easy to act on. Would highly recommend to any global business.",
    name: "Konsälidön",
    company: "Switzerland",
    initials: "KS",
    role: "CFO",
  },
  {
    quote: "Opening our company bank account was extremely difficult, but the Orpheus team managed everything professionally, patiently and with complete transparency throughout.",
    name: "Goldafrix Management",
    company: "Uganda",
    initials: "GA",
    role: "Managing Director",
  },
  {
    quote: "Orpheus helped us structure our international operations in a way that saved significant tax while remaining fully compliant. Exceptional service and deep expertise.",
    name: "Meridian Capital",
    company: "Singapore",
    initials: "MC",
    role: "CEO",
  },
  {
    quote: "The entire process from consultation to completion was seamless. Rachit and the team truly understand global financial structures and made our offshore setup effortless.",
    name: "TechVentures Inc",
    company: "Australia",
    initials: "TV",
    role: "Founder & Director",
  },
  {
    quote: "Working with Orpheus was a game-changer for our multi-jurisdictional operations. Their regulatory knowledge and practical approach saved us months of research and countless headaches.",
    name: "Global Trade Solutions",
    company: "Netherlands",
    initials: "GT",
    role: "Operations Manager",
  },
  {
    quote: "Exceptional professionalism and deep sector knowledge. They navigated complex regulatory requirements with precision and delivered results that exceeded our expectations.",
    name: "Capital Partners LLC",
    company: "United States",
    initials: "CP",
    role: "Managing Partner",
  },
  {
    quote: "From day one, Orpheus demonstrated a comprehensive understanding of our unique requirements. Their proactive approach and strategic guidance have been invaluable to our growth.",
    name: "Asian Finance Group",
    company: "Malaysia",
    initials: "AF",
    role: "Chief Financial Officer",
  },
];

export function Testimonials() {
  const [active, setActive] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const goto = (idx: number) => {
    const next = (idx + items.length) % items.length;
    if (!slideRef.current) { setActive(next); return; }
    gsap.to(slideRef.current, { opacity: 0, y: 20, duration: 0.25, ease: "power2.in",
      onComplete: () => {
        setActive(next);
        gsap.to(slideRef.current, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" });
      }
    });
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    gsap.fromTo(sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true } });
  }, []);

  const t = items[active];

  return (
    <section ref={sectionRef} className="bg-[#F3F5F8] py-28 md:py-36 relative overflow-hidden">
      <FloatingParticles count={50} color="rgba(212,175,55,0.38)" ringColor="rgba(212,175,55,0.22)" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />
      {/* gold top line */}
      <div className="absolute top-0 inset-x-0 h-[2px]" style={{
        background: "linear-gradient(90deg, transparent, #D4AF37, #E5CB7E, #D4AF37, transparent)"
      }} />

      <div className="relative mx-auto max-w-[900px] px-6 md:px-16 text-center">
        <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Testimonials</p>
        <h2 className="mt-4 font-display font-extrabold leading-[1.0]"
          style={{ fontSize: "clamp(32px, 4vw, 54px)", letterSpacing: "-0.03em", color: "#1D1C1C" }}>
          Why Clients{" "}
          <span className="font-serif italic text-gold" style={{ fontSize: "0.92em" }}>Love Working With Us</span>
        </h2>

        {/* slide area */}
        <div ref={slideRef} className="mt-14">
          {/* quote icon */}
          <Quote size={40} className="mx-auto text-gold/20 mb-6" />

          {/* stars */}
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={16} className="text-gold fill-gold" />
            ))}
          </div>

          <p className="font-serif italic leading-[1.85] text-[#1D1C1C] font-bold"
            style={{ fontSize: "clamp(17px, 2vw, 22px)" }}>
            "{t.quote}"
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full font-display font-bold text-white text-[15px]"
              style={{ background: "linear-gradient(135deg, #1D1C1C 0%, #0A0A0A 100%)" }}>
              {t.initials}
            </div>
            <div className="text-left">
              <div className="font-display font-bold text-[16px] text-[#1D1C1C]">{t.name}</div>
              <div className="font-body text-[12px] text-muted2">{t.role} · {t.company}</div>
            </div>
          </div>
        </div>

        {/* controls */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <button onClick={() => goto(active - 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold hover:bg-gold hover:text-charcoal transition-all">
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2.5">
            {items.map((_, i) => (
              <button key={i} onClick={() => goto(i)}
                className={`h-2 rounded-full transition-all duration-300 ${i === active ? "w-8 bg-gold" : "w-2 bg-gold/25"}`} />
            ))}
          </div>

          <button onClick={() => goto(active + 1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold hover:bg-gold hover:text-charcoal transition-all">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* review badges */}
        <div className="mt-10 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 rounded-full border border-gold/20 bg-white px-4 py-2" style={{ boxShadow: "0 4px 12px rgba(29,28,28,0.03)" }}>
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={11} className="text-gold fill-gold" />
              ))}
            </div>
            <span className="font-display font-semibold text-[12px] text-[#1D1C1C]">5.0</span>
            <span className="font-body text-[11px] text-muted2">Google Rating</span>
          </div>
          <div className="font-body text-[12px] text-muted2">7+ reviews</div>
        </div>
      </div>
    </section>
  );
}
