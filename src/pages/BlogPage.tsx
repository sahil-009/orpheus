import { Link } from "react-router-dom";
import { useScrollReveal } from "@/lib/useScrollReveal";
import { OButton } from "@/components/ui/OButton";
import { blogPosts } from "@/data/blogPosts";
import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsapSetup";
import { GridTexture } from "@/components/ui/GridTexture";

const featured = blogPosts[0];
const rest = blogPosts.slice(1);

const goldAccentStyle: CSSProperties = {
  fontSize: "0.95em",
  background: "linear-gradient(130deg, #D4AF37 0%, #C8A96A 50%, #A88829 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export default function BlogPage() {
  const gridRef = useScrollReveal<HTMLDivElement>({ childSelector: "[data-pcard]", stagger: 0.1, y: 40 });
  const imgRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imgRef.current) return;
    const el = imgRef.current;
    const onEnter = () => gsap.to(el, { scale: 1.05, duration: 0.6, ease: "power2.out" });
    const onLeave = () => gsap.to(el, { scale: 1, duration: 0.6 });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
  }, []);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#FFFFFF] pt-40 pb-48 border-b border-[#1D1C1C]/[0.06]">
        <GridTexture />
        <div className="orb w-[500px] h-[500px] bg-gold/[0.06] top-[-80px] right-[-100px]" />

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0">
          <span className="font-display font-bold text-[#1D1C1C]/[0.02]"
            style={{ fontSize: "clamp(100px, 18vw, 280px)", lineHeight: 1 }}>
            INSIGHTS
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-16">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: "#D4AF37" }}>
            Our Perspective
          </p>
          <h1
            className="mt-4 font-display font-extrabold leading-[1.0] text-[#1D1C1C]"
            style={{ fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.03em" }}
          >
            Insights &{" "}
            <span className="font-serif italic" style={goldAccentStyle}>
              Updates
            </span>
          </h1>
          <p className="mt-5 max-w-2xl font-body text-[16px] leading-relaxed font-bold" style={{ color: "rgba(29,28,28,0.85)" }}>
            Strategic analysis of global market trends, offshore structuring evolution, and institutional wealth preservation frameworks.
          </p>
        </div>
      </section>

      {/* Featured */}
      <section className="relative z-20 -mt-32 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1280px] px-6 md:px-16">
          <Link to={`/blog/${featured.slug}`} className="block group">
            <article
              className="grid lg:grid-cols-2 gap-0 overflow-hidden rounded-2xl bg-white"
              style={{ boxShadow: "0 32px 64px rgba(0,0,0,0.14)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden h-80 lg:h-auto">
                <div
                  ref={imgRef}
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,13,13,0.3), rgba(212,175,55,0.1))" }} />
                <div className="absolute top-6 left-6">
                  <span className="rounded-full bg-gold px-3 py-1 font-body text-[9px] uppercase tracking-[1.5px] text-charcoal font-semibold">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center p-10 md:p-14 lg:p-16 bg-white">
                <div className="font-body text-[10px] uppercase tracking-[2px] text-gold font-semibold">{featured.category}</div>
                <h2 className="mt-4 font-display font-extrabold text-3xl md:text-4xl text-charcoal leading-[1.15]" style={{ letterSpacing: "-0.03em" }}>{featured.title}</h2>
                <p className="mt-6 font-body text-[15px] text-muted2 leading-[1.85] max-w-xl">{featured.excerpt}</p>
                <div className="mt-10 flex items-center justify-between border-t border-gold/[0.12] pt-8">
                  <div className="flex items-center gap-4">
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-full font-display text-charcoal text-xs font-semibold"
                      style={{ background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)" }}
                    >
                      {featured.author.initials}
                    </div>
                    <div>
                      <div className="font-body text-sm text-charcoal font-semibold">{featured.author.name}</div>
                      <div className="font-body text-[10px] text-muted2 uppercase tracking-wide mt-0.5">{featured.author.role}</div>
                    </div>
                  </div>
                  <span className="font-body text-[10px] uppercase tracking-[2px] text-gold font-semibold group-hover:translate-x-1 transition-transform">
                    Read Analysis →
                  </span>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </section>

      {/* Grid */}
      <section className="bg-[#F3F5F8] py-20 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture-white opacity-70 pointer-events-none" />
        <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px]" style={{ color: "#D4AF37" }}>
            From the desk
          </p>
          <h2
            className="mt-4 font-display font-extrabold leading-[1.0] text-[#1D1C1C]"
            style={{ fontSize: "clamp(28px, 3.5vw, 44px)", letterSpacing: "-0.03em" }}
          >
            Latest{" "}
            <span className="font-serif italic" style={goldAccentStyle}>
              Articles
            </span>
          </h2>
          <div ref={gridRef} className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => (
              <Link
                to={`/blog/${p.slug}`}
                key={p.slug}
                data-pcard
                className="group block overflow-hidden rounded-2xl border border-gold/[0.12] bg-white transition-all hover:-translate-y-2 hover:border-gold/35 hover:shadow-[0_24px_48px_rgba(212,175,55,0.06)]"
              >
                <div
                  className="relative aspect-[16/10] overflow-hidden"
                  style={{ background: "linear-gradient(135deg, #1A1A1A 0%, #111 100%)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="font-display italic text-gold/20 text-5xl">{p.category}</span>
                  </div>
                  <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/[0.05] transition-colors" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 font-body text-[10px] uppercase tracking-[2px]">
                    <span className="text-gold font-semibold">{p.category}</span>
                    <span className="text-muted2">·</span>
                    <span className="text-muted2">{p.date}</span>
                  </div>
                  <h4 className="mt-3 font-display text-lg text-charcoal leading-snug">{p.title}</h4>
                  <p className="mt-3 font-body text-[13px] leading-relaxed line-clamp-3" style={{ color: "rgba(29,28,28,0.65)" }}>{p.excerpt}</p>
                  <div className="mt-5 font-body text-xs uppercase tracking-[2px] text-gold font-semibold group-hover:translate-x-1 transition-transform inline-block">
                    Read More →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-[#1D1C1C] text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 grid-texture opacity-50 pointer-events-none" />
        <div className="orb w-[400px] h-[400px] bg-gold/[0.05] top-[-80px] left-[50%] -translate-x-1/2" />
        <div className="relative mx-auto max-w-2xl px-6 md:px-16 text-center">
          <p className="font-display text-[11px] font-semibold uppercase tracking-[3px] text-gold">Newsletter</p>
          <h3
            className="mt-4 font-display font-extrabold leading-[1.0] text-white"
            style={{ fontSize: "clamp(30px, 4vw, 52px)", letterSpacing: "-0.03em" }}
          >
            Stay{" "}
            <span className="font-serif italic" style={goldAccentStyle}>
              Informed.
            </span>
          </h3>
          <p className="mt-4 font-body text-sm text-white/40">Quarterly insights on structuring, banking and capital. No spam.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-8 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              placeholder="you@company.com"
              className="flex-1 h-12 rounded-lg bg-white/[0.04] border border-gold/25 px-4 font-body text-sm text-white placeholder:text-white/30 outline-none focus:border-gold focus:shadow-[0_0_0_3px_rgba(212,175,55,0.08)]"
            />
            <OButton variant="gold">Subscribe</OButton>
          </form>
          <p className="mt-4 font-body text-[11px] text-white/25">By subscribing you agree to our privacy policy.</p>
        </div>
      </section>
    </main>
  );
}
