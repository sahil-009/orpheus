import { useEffect, useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";
import { Briefcase, TrendingUp, ArrowUpRight, Globe2 } from "lucide-react";
import { ClientLogosMarquee } from "@/components/services/ClientLogosMarquee";
import { CORPORATE_FINANCE_ADVISORY } from "@/data/corporateFinanceAdvisory";
import { AdvisoryServicesGrid } from "@/components/services/AdvisoryServicesGrid";

type ServiceCard = {
  icon: string | ReactNode;
  n: string;
  title: string;
  body: string;
  tags?: string[];
  capabilities?: readonly string[];
  href: string;
};

const services: ServiceCard[] = [
  {
    icon: <Globe2 size={26} />,
    n: "01",
    title: "Offshore Structure & Banking",
    body: "Establish regulated and tax-efficient entities globally and secure institutional banking access. We handle corporate structuring, regulatory licensing, multi-currency treasury accounts, and compliance for financial institutions and cross-border enterprises.",
    tags: ["UAE", "BVI & Cayman", "Corporate Banking", "KYC Pack"],
    href: "/services",
  },
  {
    icon: <Briefcase size={26} />,
    n: "02",
    title: CORPORATE_FINANCE_ADVISORY.title,
    body: CORPORATE_FINANCE_ADVISORY.cardSummary,
    capabilities: CORPORATE_FINANCE_ADVISORY.capabilities,
    href: "/services#corporate-finance-advisory",
  },
  {
    icon: <TrendingUp size={26} />,
    n: "03",
    title: "Debt Raising",
    body: "Secure institutional debt capital and structured financing. We coordinate debt advisory, capital stack optimization, and targeted matching with credit funds, institutional lenders, and commercial banks.",
    tags: ["Structured Finance", "Private Credit", "Capital stack"],
    href: "/services",
  },
];

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardsRef.current) return;
    const cards = cardsRef.current.querySelectorAll<HTMLElement>("[data-card]");
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReduced) {
      gsap.fromTo(cards,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.12, duration: 0.85, ease: "power3.out",
          scrollTrigger: { trigger: cardsRef.current, start: "top 78%", once: true } });
    }

    if (!window.matchMedia("(pointer: fine)").matches) return;

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
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden" style={{ background: "#F3F5F8" }}>

      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.04) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
        opacity: 0.45,
      }} />

      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.05), transparent)"
      }} />

      <div className="absolute pointer-events-none" style={{
        top: "-10%", right: "-5%", width: "45%", height: "70%",
        background: "radial-gradient(ellipse at 70% 30%, rgba(212,175,55,0.07) 0%, transparent 65%)",
      }} />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">

        <div className="max-w-3xl">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: "#D4AF37" }}>
            Services
          </p>
          <h2
            className="mt-4 font-display font-extrabold leading-[1.0]"
            style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.03em", color: "#1D1C1C" }}
          >
            End-to-End Solutions{" "}
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
              That Deliver
            </span>
          </h2>
          <p className="mt-5 font-body text-[16px] max-w-xl leading-relaxed font-bold" style={{ color: "rgba(29,28,28,0.85)" }}>
            Three specialized practices — institutional corporate structuring, corporate finance advisory, and debt capital raising — tailored for financial services firms, funds, and expanding businesses.
          </p>
        </div>

        <div ref={cardsRef} className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.title}
              data-card
              className="group relative overflow-hidden rounded-3xl cursor-pointer flex flex-col"
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(212,175,55,0.18)",
                boxShadow: "0 12px 32px rgba(29,28,28,0.04), 0 1px 0 rgba(255,255,255,0.9) inset",
                transformStyle: "preserve-3d",
                padding: "36px",
              }}
            >
              <div
                data-bar
                className="absolute top-0 left-0 h-[3px] rounded-t-3xl"
                style={{
                  width: "0%",
                  background: "linear-gradient(90deg, #D4AF37, #C8A96A)",
                }}
              />

              <span
                aria-hidden
                className="absolute -top-3 right-5 font-display font-extrabold select-none pointer-events-none"
                style={{ fontSize: "110px", lineHeight: 1, color: "rgba(212,175,55,0.04)" }}
              >
                {s.n}
              </span>

              <div className="relative flex flex-col flex-1">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl mb-7 transition-all duration-300 overflow-hidden"
                  style={{
                    background: typeof s.icon === "string" ? "transparent" : "rgba(212,175,55,0.08)",
                    color: "#D4AF37",
                  }}
                  onMouseEnter={(e) => {
                    if (typeof s.icon !== "string") {
                      (e.currentTarget as HTMLElement).style.background = "#D4AF37";
                      (e.currentTarget as HTMLElement).style.color = "#ffffff";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (typeof s.icon !== "string") {
                      (e.currentTarget as HTMLElement).style.background = "rgba(212,175,55,0.08)";
                      (e.currentTarget as HTMLElement).style.color = "#D4AF37";
                    }
                  }}
                >
                  {typeof s.icon === "string" ? (
                    <img src={s.icon} alt="" loading="lazy" decoding="async" width={56} height={56} className="h-full w-full object-cover rounded-2xl" />
                  ) : (
                    s.icon
                  )}
                </div>

                <h3 className="font-display font-bold text-[20px] md:text-[22px] leading-tight" style={{ color: "#1D1C1C" }}>
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-[14px] leading-[1.8] font-bold flex-1" style={{ color: "rgba(29,28,28,0.65)" }}>
                  {s.body}
                </p>

                {s.capabilities ? (
                  <ul className="mt-5 space-y-2 border-t border-gold/12 pt-5">
                    {s.capabilities.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 font-body text-[12.5px] font-semibold leading-snug"
                        style={{ color: "rgba(29,28,28,0.72)" }}
                      >
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags?.map((t) => (
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
                )}

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

        <div className="mt-20 md:mt-24">
          <AdvisoryServicesGrid variant="light" />
        </div>

        <div className="mt-20 md:mt-24 pt-12 md:pt-16">
          <ClientLogosMarquee
            variant="light"
            label="Trusted by businesses across 18 markets"
          />
        </div>
      </div>
    </section>
  );
}
