import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap, setupGsap } from "@/lib/gsapSetup";
import { Facebook, Instagram, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    setupGsap();
    if (!ref.current) return;
    const cols = ref.current.querySelectorAll("[data-foot-col]");
    const tween = gsap.fromTo(cols,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", once: true } });
    return () => { tween.scrollTrigger?.kill(); tween.kill(); };
  }, []);

  return (
    <footer ref={ref} className="bg-[#080808] text-white relative overflow-hidden">

      {/* ── Links grid ─────────────────────────────── */}
      <div className="mx-auto max-w-[1440px] px-6 md:px-16 pt-12 pb-10">
        <div className="h-px mb-12" style={{
          background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.18), transparent)"
        }} />

        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-5" data-foot-col>
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg font-display font-extrabold text-charcoal text-[15px] transition-transform group-hover:scale-110"
                style={{ background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)" }}>
                O
              </div>
              <span className="font-display font-bold text-[17px]">Orpheus Financial</span>
            </Link>
            <p className="mt-5 font-body text-[13px] text-white/35 max-w-sm leading-relaxed">
              Dubai-based financial advisory firm structuring offshore companies, banking, and capital across 18 active markets.
            </p>

            {/* Contact pills */}
            <div className="mt-6 space-y-3">
              {[
                { icon: <MapPin size={12} />, text: "Business Bay, Dubai, UAE" },
                { icon: <Phone size={12} />,  text: "+971 4 558 7968", href: "tel:+97145587968" },
                { icon: <Mail size={12} />,   text: "operations@orpheusfinancial.co", href: "mailto:operations@orpheusfinancial.co" },
              ].map((c) => (
                c.href
                  ? <a key={c.text} href={c.href} className="flex items-center gap-2 font-body text-[12px] text-white/30 hover:text-white/60 transition-colors">
                      <span className="text-gold/60">{c.icon}</span>{c.text}
                    </a>
                  : <div key={c.text} className="flex items-center gap-2 font-body text-[12px] text-white/30">
                      <span className="text-gold/60">{c.icon}</span>{c.text}
                    </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2.5">
              {[
                { icon: <Linkedin size={14} />, href: "https://www.linkedin.com/company/orpheuss/", label: "LinkedIn" },
                { icon: <Instagram size={14} />, href: "https://www.instagram.com/thisisorpheuss/", label: "Instagram" },
                { icon: <Facebook size={14} />, href: "https://www.facebook.com/profile.php?id=61584116284120", label: "Facebook" },
              ].map((s) => (
                <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 text-white/40 hover:bg-gold hover:text-charcoal hover:border-gold transition-all">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {[
            { title: "Services",
              items: [
                { l: "Offshore Setup",    to: "/services" },
                { l: "Banking Solutions", to: "/services" },
                { l: "Debt Raising",      to: "/services" },
                { l: "Compliance",        to: "/services" },
              ]
            },
            { title: "Company",
              items: [
                { l: "About",   to: "/about" },
                { l: "Blog",    to: "/blog" },
                { l: "Contact", to: "/contact" },
                { l: "Careers", to: "/about" },
              ]
            },
            { title: "Jurisdictions",
              items: [
                { l: "United Arab Emirates",    to: "/services" },
                { l: "British Virgin Islands",  to: "/services" },
                { l: "Cayman Islands",          to: "/services" },
                { l: "Hong Kong",               to: "/services" },
                { l: "Seychelles",              to: "/services" },
              ]
            },
          ].map((col) => (
            <div key={col.title} className="md:col-span-2" data-foot-col>
              <h4 className="font-display font-semibold text-[10px] uppercase tracking-[2.5px] text-gold mb-5">
                {col.title}
              </h4>
              <ul className="space-y-3.5">
                {col.items.map((it) => (
                  <li key={it.l}>
                    <Link to={it.to}
                      className="font-body text-[13px] text-white/35 hover:text-white/70 transition-colors">
                      {it.l}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(212,175,55,0.09)" }}>
          <p className="font-body text-[11px] text-white/20">
            © {new Date().getFullYear()} Orpheus Financial®. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Cookies"].map((l) => (
              <a key={l} href="#"
                className="font-body text-[11px] text-white/20 hover:text-white/50 transition-colors">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
