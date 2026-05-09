import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";
import { Globe, Landmark, TrendingUp, ArrowUpRight } from "lucide-react";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

const services = [
  {
    icon: <Globe size={26} />,
    n: "01",
    title: "Offshore Setup",
    body: "Form companies in UAE, BVI, Cayman, Hong Kong, Seychelles and Mauritius — picked to fit your tax, banking, and operational reality.",
    tags: ["UAE", "BVI", "Cayman", "HK"],
    href: "/services",
  },
  {
    icon: <Landmark size={26} />,
    n: "02",
    title: "Banking Solutions",
    body: "Open multi-currency corporate accounts. We handle documentation, bank coordination, KYC packs and ongoing compliance support.",
    tags: ["Multi-currency", "KYC", "Compliance"],
    href: "/services",
  },
  {
    icon: <TrendingUp size={26} />,
    n: "03",
    title: "Debt Raising",
    body: "Strategy, documentation and investor matching to help you secure the capital your business needs to scale — on the right terms.",
    tags: ["Capital", "Structuring", "Term Sheet"],
    href: "/services",
  },
];

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-card]");

    gsap.fromTo(cards,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: cardsRef.current, start: "top 78%", once: true } });

    cards.forEach((card) => {
      const bar = card.querySelector<HTMLElement>("[data-bar]");

      const onEnter = () => {
        gsap.to(card, { y: -12, duration: 0.4, ease: "power2.out" });
        gsap.to(bar, { width: "100%", duration: 0.5, ease: "power2.out" });
      };
      const onLeave = () => {
        gsap.to(card, { y: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
        gsap.to(bar, { width: "0%", duration: 0.4, ease: "power2.in" });
      };
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - 0.5) * 12;
        const y = ((e.clientY - r.top)  / r.height - 0.5) * -12;
        gsap.to(card, { rotateX: y, rotateY: x, transformPerspective: 900, duration: 0.4, ease: "power2.out" });
      };
      const onOut = () => gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1,0.4)" });

      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("mousemove",  onMove);
      card.addEventListener("mouseleave", onOut);
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden" style={{ background: "#F5F4F0" }}>

      <FloatingParticles count={50} color="rgba(212,175,55,0.45)" ringColor="rgba(212,175,55,0.3)" />

      {/* subtle warm dot texture */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.45,
      }} />

      {/* faint top edge line */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)"
      }} />
      {/* faint bottom edge line */}
      <div className="absolute inset-x-0 bottom-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)"
      }} />

      {/* warm blue tint orb top-right */}
      <div className="absolute pointer-events-none" style={{
        top: "-10%", right: "-5%", width: "45%", height: "70%",
        background: "radial-gradient(ellipse at 70% 30%, rgba(212,175,55,0.07) 0%, transparent 65%)",
      }} />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">

        {/* Label + heading */}
        <div className="max-w-3xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: "#D4AF37" }}>
            Services
          </p>
          <h2
            className="mt-4 font-display font-extrabold leading-[1.0]"
            style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.03em", color: "#0A0A0A" }}
          >
            Smart Solutions for{" "}
            <span
              className="font-serif italic"
              style={{
                fontSize: "0.95em",
                background: "linear-gradient(130deg, #D4AF37 0%, #C8A96A 50%, #A88829 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Modern Businesses
            </span>
          </h2>
          <p className="mt-5 font-body text-[16px] max-w-xl leading-relaxed" style={{ color: "#6B6B6B" }}>
            Three core practice areas — fully integrated. We don't just advise, we execute every step alongside you.
          </p>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-5 md:grid-cols-3 needs-copy" data-marker="Copy: confirm service descriptions">
          {services.map((s) => (
            <div
              key={s.title}
              data-card
              className="group relative overflow-hidden rounded-3xl cursor-pointer"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(0,0,0,0.07)",
                boxShadow: "0 2px 12px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.9) inset",
                transformStyle: "preserve-3d",
                padding: "36px",
              }}
            >
              {/* animated top bar */}
              <div
                data-bar
                className="absolute top-0 left-0 h-[3px] rounded-t-3xl"
                style={{
                  width: "0%",
                  background: "linear-gradient(90deg, #D4AF37, #C8A96A)",
                }}
              />

              {/* watermark number */}
              <span
                aria-hidden
                className="absolute -top-3 right-5 font-display font-extrabold select-none pointer-events-none"
                style={{ fontSize: "110px", lineHeight: 1, color: "rgba(212,175,55,0.04)" }}
              >
                {s.n}
              </span>

              <div className="relative">
                {/* icon */}
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl mb-7 transition-all duration-300"
                  style={{
                    background: "rgba(212,175,55,0.08)",
                    color: "#D4AF37",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "#D4AF37";
                    (e.currentTarget as HTMLElement).style.color = "#ffffff";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.08)";
                    (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                  }}
                >
                  {s.icon}
                </div>

                <h3 className="font-display font-bold text-[22px] leading-tight" style={{ color: "#0A0A0A" }}>
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.8]" style={{ color: "#6B6B6B" }}>
                  {s.body}
                </p>

                {/* tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1 font-display text-[10px] uppercase tracking-[1.5px] font-semibold"
                      style={{
                        background: "rgba(212,175,55,0.07)",
                        color: "#A88829",
                        border: "1px solid rgba(212,175,55,0.12)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  to={s.href}
                  className="mt-7 inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[2px] font-semibold transition-all group-hover:gap-3"
                  style={{ color: "#D4AF37" }}
                >
                  Learn More <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
