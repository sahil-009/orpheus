import { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsapSetup";
import { Plus, Minus } from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const faqs = [
  { q: "How long does it take to set up an offshore company?", a: "Most structures are ready within 5–15 business days depending on the jurisdiction. UAE free zone entities can often be done in 3–5 days. We provide fixed timelines upfront before engagement." },
  { q: "Do you handle the entire process or just advise?", a: "We handle the entire process end-to-end — from selecting the right jurisdiction and structure, to filing documents, opening bank accounts, and ensuring ongoing compliance. You don't need to manage any third parties." },
  { q: "Which jurisdictions do you work in?", a: "We primarily work in UAE, British Virgin Islands, Cayman Islands, Hong Kong, Seychelles, Mauritius, and Marshall Islands. We choose the right jurisdiction based on your specific goals — tax, banking access, IP holding, or operational presence." },
  { q: "Is offshore structuring legal?", a: "Yes — absolutely. Offshore structuring is a legal and widely-used method of international tax and asset planning. We only work within fully compliant frameworks aligned with OECD and FATF standards. We don't operate in blacklisted jurisdictions." },
  { q: "What types of clients do you work with?", a: "We work with founders, family offices, high-net-worth individuals, growing businesses, and multinationals. Common use cases include tax optimisation, global banking access, IP holding, and capital raising." },
  { q: "How do you charge for your services?", a: "We charge fixed, transparent fees — no hourly billing, no surprise add-ons. Pricing is presented clearly in your strategy proposal before any commitment. Fees vary by jurisdiction and complexity of the structure." },
  { q: "Do you provide banking support as well?", a: "Yes — banking support is one of our core services. We handle the entire banking onboarding including KYC documentation, bank selection, and relationship management across UAE, Europe, Asia, and the Caribbean." },
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
        <span className="font-display font-semibold text-[16px] text-charcoal group-hover:text-gold transition-colors leading-snug">
          {q}
        </span>
        <span className={`flex-none flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 ${
          open ? "border-gold bg-gold text-charcoal" : "border-black/15 text-charcoal/50 group-hover:border-gold group-hover:text-gold"
        }`}>
          {open ? <Minus size={14} /> : <Plus size={14} />}
        </span>
      </button>
      <div ref={bodyRef} style={{ height: 0, overflow: "hidden", opacity: 0 }}>
        <p className="pb-6 font-body text-[14px] text-muted2 leading-[1.85] max-w-3xl">{a}</p>
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
      <FloatingParticles count={45} color="rgba(67,97,238,0.35)" ringColor="rgba(67,97,238,0.2)" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px", pointerEvents: "none",
      }} />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-16 grid lg:grid-cols-[1fr_2fr] gap-16 lg:gap-20">
        {/* Label */}
        <div className="lg:pt-2">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">FAQ</p>
          <h2 className="mt-4 font-display font-extrabold leading-[1.0] text-charcoal"
            style={{ fontSize: "clamp(30px, 3.5vw, 50px)", letterSpacing: "-0.03em" }}>
            Frequently<br />
            <span className="font-serif italic text-gold" style={{ fontSize: "0.95em" }}>Asked</span>
          </h2>
          <p className="mt-5 font-body text-[14px] text-muted2 leading-relaxed max-w-xs">
            Can't find your answer? Email us at{" "}
            <a href="mailto:operations@orpheusfinancial.co" className="text-gold hover:underline">
              operations@orpheusfinancial.co
            </a>
          </p>
        </div>

        {/* Questions */}
        <div ref={ref}>
          {faqs.map((f, i) => (
            <FaqItem key={i} q={f.q} a={f.a} idx={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
