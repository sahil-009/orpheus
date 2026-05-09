import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsapSetup";
import { GridTexture } from "@/components/ui/GridTexture";
import { RevealText } from "@/components/ui/RevealText";
import { OButton } from "@/components/ui/OButton";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const infoBlocks = [
  { icon: "📍", label: "Visit Us",  value: "Business Bay, Dubai, UAE\nC 1802 Ontario Tower" },
  { icon: "📞", label: "Call Us",   value: "+971 4 558 7968" },
  { icon: "✉️", label: "Email",     value: "operations@orpheusfinancial.co" },
];

function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { y: 44, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 });
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast({ title: "Message sent", description: "We'll be in touch within 24 hours." });
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  const fieldCls =
    "w-full h-12 rounded-lg border border-gold/20 bg-white px-4 font-body text-sm text-charcoal outline-none transition-all focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.1)] placeholder:text-muted2/50";
  const labelCls =
    "block font-body text-[10px] font-semibold uppercase tracking-[1.5px] text-charcoal/60 mb-2";

  return (
    <form
      ref={ref}
      onSubmit={onSubmit}
      className="rounded-3xl border border-gold/15 bg-white p-8 md:p-10"
      style={{ boxShadow: "0 24px 64px rgba(0,0,0,0.08)" }}
    >
      <h3 className="font-display text-2xl text-charcoal">Send a Message</h3>
      <p className="mt-2 font-body text-sm text-muted2">We respond within 24 hours.</p>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className={labelCls}>Full Name</label>
          <input required name="name" type="text" className={fieldCls} placeholder="Your Name" />
        </div>
        <div>
          <label className={labelCls}>Company</label>
          <input name="company" type="text" className={fieldCls} placeholder="Acme Holdings" />
        </div>
        <div>
          <label className={labelCls}>Service Interest</label>
          <select name="service" className={fieldCls} defaultValue="">
            <option value="" disabled>Choose a service</option>
            <option>Offshore Setup</option>
            <option>Banking Solutions</option>
            <option>Debt Raising</option>
            <option>Other</option>
          </select>
        </div>
        <div>
          <label className={labelCls}>Country</label>
          <input name="country" type="text" className={fieldCls} placeholder="Canada" />
        </div>
        <div className="md:col-span-2">
          <label className={labelCls}>Message</label>
          <textarea
            name="message" rows={5}
            className={`${fieldCls} h-auto py-3 resize-none`}
            placeholder="Tell us about your situation..."
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-7 w-full rounded-lg bg-gold text-charcoal font-body font-semibold text-sm py-4 transition-all hover:-translate-y-0.5 hover:bg-gold-light hover:shadow-[0_12px_32px_rgba(212,175,55,0.38)] disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send Message →"}
      </button>

      <div className="mt-5 text-center">
        <span className="font-body text-xs text-muted2">Or </span>
        <a href="tel:+97145587968" className="font-body text-xs text-gold hover:underline">
          call us directly →
        </a>
      </div>
    </form>
  );
}

function WorldMap() {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const paths = ref.current.querySelectorAll<SVGPathElement>("[data-cont]");
    paths.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray  = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    gsap.to(paths, {
      strokeDashoffset: 0, duration: 2, stagger: 0.2, ease: "power2.inOut",
      scrollTrigger: { trigger: ref.current, start: "top 75%", once: true },
    });
  }, []);

  const dots = [
    { x: 590, y: 175, label: "UAE" },
    { x: 220, y: 130, label: "Canada" },
    { x: 800, y: 200, label: "Hong Kong" },
    { x: 580, y: 270, label: "Uganda" },
    { x: 470, y: 130, label: "EU" },
    { x: 290, y: 230, label: "Cayman" },
  ];

  return (
    <div className="relative">
      <svg ref={ref} viewBox="0 0 1000 450" className="w-full h-auto">
        <g stroke="#D4AF37" strokeWidth="0.7" fill="none" opacity="0.55">
          <path data-cont d="M150 130 Q200 100 280 110 T400 140 Q420 200 360 240 T220 250 Q160 220 140 180 Z" />
          <path data-cont d="M420 110 Q500 95 580 110 T700 140 Q720 180 660 200 T520 200 Q440 180 420 150 Z" />
          <path data-cont d="M730 130 Q820 110 880 150 T920 240 Q900 290 820 280 T740 230 Q720 180 730 150 Z" />
          <path data-cont d="M520 220 Q580 215 620 245 T640 320 Q610 360 560 360 T500 320 Q495 270 510 240 Z" />
          <path data-cont d="M250 220 Q310 215 350 235 T360 285 Q330 305 290 300 T240 270 Z" />
          <path data-cont d="M820 290 Q870 285 900 310 T905 365 Q880 385 845 380 T815 350 Z" />
        </g>
        {dots.map((d) => (
          <g key={d.label}>
            <circle cx={d.x} cy={d.y} r="6" fill="#D4AF37" />
            <circle cx={d.x} cy={d.y} r="6" fill="none" stroke="#D4AF37" strokeWidth="1.5"
              className="pulse-ring" style={{ transformOrigin: `${d.x}px ${d.y}px` }} />
            <text x={d.x + 12} y={d.y + 4} fontSize="11" fill="#E5CB7E" fontFamily="Inter" fontWeight="500">
              {d.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function ContactPage() {
  const infoRef = useScrollReveal<HTMLDivElement>({ childSelector: "[data-info]", stagger: 0.12, y: 30 });

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0D0D0D] text-white pt-36 pb-20">
        <GridTexture />
        <div className="orb w-[600px] h-[600px] bg-gold/[0.06] top-[-100px] right-[-150px]" />
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, #0D0D0D)" }} />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16 text-center">
          <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Contact</p>
          <h1 className="mt-6 font-display font-medium" style={{ fontSize: "clamp(56px, 8vw, 120px)", lineHeight: 1.0 }}>
            <RevealText mode="chars" stagger={0.04} duration={0.7} y={50}>Let's Talk.</RevealText>
          </h1>
          <p className="mt-6 mx-auto max-w-xl font-body text-[15px] font-light text-white/45 leading-[1.85]">
            30-minute free consultation. No commitment required.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="bg-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-white opacity-60 pointer-events-none" />
        <div className="relative mx-auto grid max-w-[1280px] gap-16 px-6 md:px-16 lg:grid-cols-2 lg:gap-20 items-start">

          <div ref={infoRef}>
            <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Get in touch</p>
            <h2 className="mt-5 font-display font-medium leading-[1.08] text-charcoal" style={{ fontSize: "clamp(30px, 3.5vw, 50px)" }}>
              <RevealText trigger="scroll" stagger={0.06}>Start Your</RevealText>{" "}
              <RevealText trigger="scroll" stagger={0.06} delay={0.2} className="italic text-gold">Journey</RevealText>
            </h2>

            <div className="mt-10 space-y-7">
              {infoBlocks.map((b) => (
                <div key={b.label} data-info className="flex gap-5">
                  <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-gold/10 border border-gold/20 text-xl">
                    {b.icon}
                  </div>
                  <div>
                    <div className="font-body text-[10px] uppercase tracking-[2px] text-gold font-semibold">{b.label}</div>
                    <div className="mt-1.5 font-body text-sm text-charcoal whitespace-pre-line">{b.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-10 flex gap-3">
              {[
                { l: "in", n: "LinkedIn",  href: "https://www.linkedin.com/company/orpheuss/" },
                { l: "ig", n: "Instagram", href: "https://www.instagram.com/thisisorpheuss/" },
                { l: "fb", n: "Facebook",  href: "https://www.facebook.com/profile.php?id=61584116284120" },
              ].map((s) => (
                <a key={s.n} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.n}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/25 text-gold hover:bg-gold hover:text-charcoal transition-all">
                  <span className="text-[10px] uppercase font-semibold">{s.l}</span>
                </a>
              ))}
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      {/* Global footprint */}
      <section className="bg-[#0D0D0D] text-white py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />
        <div className="orb w-[400px] h-[400px] bg-gold/[0.04] bottom-0 left-[-80px]" />

        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16 text-center">
          <p className="font-body text-[11px] uppercase tracking-[3px] text-gold font-semibold">Global Footprint</p>
          <h2 className="mt-5 font-display font-medium leading-[1.08]" style={{ fontSize: "clamp(30px, 4vw, 56px)" }}>
            <RevealText trigger="scroll" stagger={0.06}>Headquartered in</RevealText>{" "}
            <RevealText trigger="scroll" stagger={0.06} delay={0.2} className="italic gold-shimmer-slow">
              Business Bay, Dubai.
            </RevealText>
          </h2>
          <p className="mt-5 mx-auto max-w-xl font-body text-sm text-white/45">
            Active in 18 markets including UAE, Canada, Hong Kong, Uganda, the EU, and the Cayman Islands.
          </p>
          <div className="mt-14">
            <WorldMap />
          </div>
          <div className="mt-10">
            <Link to="/services"><OButton variant="ghost-light">Explore Our Services →</OButton></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
