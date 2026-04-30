import { Link, useParams } from "react-router-dom";
import { getPostBySlug } from "@/data/blogPosts";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, setupGsap } from "@/lib/gsapSetup";
import NotFound from "./NotFound";
import { GridTexture } from "@/components/ui/GridTexture";
import { OrbBackground } from "@/components/ui/OrbBackground";
import { RevealText } from "@/components/ui/RevealText";

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getPostBySlug(slug) : undefined;
  const progressRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    setupGsap();
    if (!progressRef.current) return;
    gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left" });
    const tween = gsap.to(progressRef.current, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const triggers: ScrollTrigger[] = [];
    sectionRefs.current.forEach((el, i) => {
      if (!el) return;
      const t = ScrollTrigger.create({
        trigger: el,
        start: "top 30%",
        end: "bottom 30%",
        onToggle: (self) => self.isActive && setActiveIdx(i),
      });
      triggers.push(t);
    });
    return () => triggers.forEach((t) => t.kill());
  }, [post]);

  if (!post) return <NotFound />;

  return (
    <main>
      {/* Reading progress */}
      <div ref={progressRef} className="fixed top-0 left-0 right-0 h-[3px] bg-sky z-[1500]" />

      {/* Hero */}
      <section className="relative overflow-hidden bg-navy text-white pt-36 pb-20">
        <GridTexture />
        <OrbBackground />
        <div className="relative mx-auto max-w-3xl px-6 md:px-16">
          <Link to="/blog" className="font-body text-[11px] uppercase tracking-[3px] text-sky-light hover:text-white">← Back to Blog</Link>
          <div className="mt-7 flex items-center gap-3">
            <span className="rounded-full bg-sky/20 border border-sky/40 px-3 py-1 font-body text-[10px] uppercase tracking-[2px] text-sky-light">{post.category}</span>
            <span className="font-body text-xs text-sky-pale/60">{post.date} · {post.readTime}</span>
          </div>
          <h1 className="mt-5 font-display font-medium leading-[1.1]" style={{ fontSize: "clamp(36px, 5vw, 64px)" }}>
            <RevealText stagger={0.06}>{post.title}</RevealText>
          </h1>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full font-display text-white text-sm font-bold" style={{ background: "linear-gradient(135deg, #4A90D9 0%, #1E4A7A 100%)" }}>
              {post.author.initials}
            </div>
            <div>
              <div className="font-body text-sm text-white">{post.author.name}</div>
              <div className="font-body text-xs text-sky-pale/60">{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-[1100px] px-6 md:px-12 grid lg:grid-cols-[260px_1fr] gap-12">
          {/* TOC */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <div className="font-body text-[11px] uppercase tracking-[2px] text-sky mb-5">In this article</div>
              <ul className="space-y-3 border-l border-line">
                {post.body.map((s, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className={`block pl-4 -ml-px border-l-2 font-body text-xs leading-relaxed transition-all ${activeIdx === i ? "border-sky text-sky" : "border-transparent text-muted2 hover:text-navy"}`}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Body */}
          <article className="max-w-[740px] mx-auto w-full">
            {post.body.map((s, i) => (
              <section
                key={i}
                id={`section-${i}`}
                ref={(el) => (sectionRefs.current[i] = el)}
                className="mb-14"
              >
                <h2 className="font-display text-3xl md:text-4xl text-navy leading-tight">{s.heading}</h2>
                <div className="mt-6 space-y-5">
                  {s.paragraphs.map((p, k) => (
                    <p key={k} className="font-body text-base font-light text-ink leading-[1.9]">{p}</p>
                  ))}
                </div>
              </section>
            ))}

            <div className="mt-16 pt-10 border-t border-line">
              <Link to="/blog" className="font-body text-xs uppercase tracking-[2px] text-sky hover:underline">← All Articles</Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
