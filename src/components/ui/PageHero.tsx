import { ReactNode } from "react";
import { GridTexture } from "@/components/ui/GridTexture";
import { RevealText } from "@/components/ui/RevealText";
import { Link } from "react-router-dom";

interface Props {
  breadcrumb: string;
  title: string;
  titleAccent?: string;
  subtitle?: string;
  children?: ReactNode;
  short?: boolean;
}

export function PageHero({ breadcrumb, title, titleAccent, subtitle, children, short }: Props) {
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

        <h1 className="mt-8 font-display font-medium leading-[1.04]" style={{ fontSize: "clamp(42px, 5.5vw, 80px)" }}>
          <RevealText className="block text-white">{title}</RevealText>
          {titleAccent && (
            <RevealText className="block italic gold-shimmer" delay={0.3}>{titleAccent}</RevealText>
          )}
        </h1>

        {subtitle && (
          <p className="mt-7 max-w-2xl font-body text-[15px] font-light text-white/50 leading-[1.85]">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
