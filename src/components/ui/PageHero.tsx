import { ReactNode, useEffect, useRef } from "react";
import { GridTexture } from "@/components/ui/GridTexture";
import { Link } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";

interface Props {
  breadcrumb: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children?: ReactNode;
  short?: boolean;
}

export function PageHero({ breadcrumb, title, titleAccent, subtitle, children, short }: Props) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const els = titleRef.current.children;
      gsap.fromTo(els,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.1 }
      );
    }
  }, []);

  return (
    <section className={`relative overflow-hidden bg-[#0D0D0D] text-white ${short ? "pt-36 pb-16" : "pt-40 pb-28"}`}>
      <GridTexture />

      {/* Gold orbs */}
      <div className="orb w-[500px] h-[500px] bg-gold/[0.06] top-[-80px] right-[-120px]" />
      <div className="orb w-[300px] h-[300px] bg-gold/[0.03] bottom-0 left-[-60px]" />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #0D0D0D)" }} />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
        {/* Breadcrumb */}
        <nav className="font-body text-[10px] uppercase tracking-[3px] text-gold/60 flex items-center gap-2">
          <Link to="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="text-gold/25">/</span>
          <span className="text-gold">{breadcrumb}</span>
        </nav>

        <h1 ref={titleRef} className="mt-8 font-display font-extrabold leading-[1.0]" style={{ fontSize: "clamp(42px, 5.5vw, 80px)", letterSpacing: "-0.03em" }}>
          <span className="block text-white opacity-0">{title}</span>
          {titleAccent && (
            <span
              className="block font-serif italic text-transparent bg-clip-text opacity-0"
              style={{
                background: "linear-gradient(130deg, #C8A96A 0%, #D4AF37 30%, #F7EFD6 55%, #D4AF37 75%, #A88829 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {titleAccent}
            </span>
          )}
        </h1>

        {subtitle && (
          <p className="mt-7 max-w-2xl font-body text-[15px] font-bold text-white leading-[1.85]">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
