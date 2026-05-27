import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapSetup";
import { Plus, Minus } from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const faqs = [
  { q: "How long does it take to form an offshore company?", a: "Most offshore companies are incorporated within 2–4 weeks, depending on jurisdiction, documentation readiness, regulatory checks, and approval timelines." },
  { q: "Do you offer full execution or advisory-only services?", a: "We offer end-to-end execution, structuring, incorporation, banking coordination, compliance assistance, and delivery of a fully functional entity." },
  { q: "Which offshore and onshore jurisdictions do you support?", a: "We operate in 18 territories, such as the UAE, BVI, Cayman Islands, Hong Kong, Seychelles, and Mauritius, to suit business, tax, and banking requirements." },
  { q: "Is offshore structuring compliant with international regulations?", a: "Yes. When structured correctly, offshore entities are fully legal and compliant with international tax laws, AML requirements, and global reporting standards." },
  { q: "What types of businesses and institutions do you serve?", a: "We serve financial institutions (asset managers, fund managers, investment platforms), fintech scale-ups, multinational trading firms, and large family offices requiring robust cross-border structures, corporate banking, and institutional capital access." },
  { q: "How is your pricing structured?", a: "We operate under an open, flat-rate system on a jurisdiction and scope basis, with deadlines and no surprises." },
  { q: "Do you assist with corporate banking and account opening?", a: "Yes. We manage the end-to-end banking coordination process, preparing institutional-grade KYC packs, interfacing with corporate and investment banks, and managing compliance onboarding." },
];

function FaqItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bodyRef.current) return;
    if (open) {
      gsap.fromTo(bodyRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.45, ease: "power3.out" });
    } else {
      gsap.to(bodyRef.current,
        { height: 0, opacity: 0, duration: 0.35, ease: "power2.in" });
    }
  }, [open]);

  return (
    <div
      className={`border-b transition-colors duration-200 ${open ? "border-gold/30" : "border-black/[0.08]"}`}
      data-faq={idx}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
      >
        <span className="font-display font-semibold text-[16px] text-[#1D1C1C] group-hover:text-gold transition-colors leading-snug">
          {q}
        </span>
        <span className={`flex-none flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
          open ? "border-gold bg-gold text-charcoal" : "border-black/15 text-[#1D1C1C]/50 group-hover:border-gold group-hover:text-gold"
        }`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="pb-6 font-body text-[14px] text-[#1D1C1C] leading-[1.85] max-w-3xl font-bold">{a}</p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const items = ref.current.querySelectorAll("[data-faq]");
    gsap.fromTo(items,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.07, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 78%", once: true } });
  }, []);

  return (
    <section className="bg-white py-28 md:py-36 relative overflow-hidden">
      <FloatingParticles count={45} color="rgba(212,175,55,0.35)" ringColor="rgba(212,175,55,0.2)" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-16 grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
        {/* Label */}
        <div className="lg:pt-2">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">FAQ</p>
          <h2 className="mt-4 font-display font-extrabold leading-[1.0] text-[#1D1C1C]"
            style={{ fontSize: "clamp(30px, 3.5vw, 50px)", letterSpacing: "-0.03em" }}>
            Frequently<br />
            <span className="font-serif italic text-gold" style={{ fontSize: "0.95em" }}>Asked</span>
          </h2>
          <p className="mt-5 font-body text-[14px] leading-relaxed max-w-xs font-bold" style={{ color: "rgba(29,28,28,0.85)" }}>
            Can't find your answer? Email us at{" "}
            <a href="mailto:operations@orpheusfinancial.co" className="text-gold hover:underline">
              operations@orpheusfinancial.co
            </a>
          </p>
        </div>

        {/* Questions */}
        <div ref={ref} className="needs-copy" data-marker="Copy: confirm or replace FAQ entries">
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
