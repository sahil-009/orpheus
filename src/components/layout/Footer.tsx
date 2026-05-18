import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { gsap, setupGsap } from "@/lib/gsapSetup";
import {
  Facebook, Instagram, Linkedin, MapPin, Phone, Mail,
  MessageCircle, Send, Clock, ShieldCheck, ArrowUpRight,
} from "lucide-react";

const SERVICES = [
  { l: "Offshore Setup",    to: "/services" },
  { l: "Banking Solutions", to: "/services" },
  { l: "Debt Raising",      to: "/services" },
  { l: "Capital Strategy",  to: "/services" },
  { l: "Compliance & KYC",  to: "/services" },
];

const COMPANY = [
  { l: "About",       to: "/about"   },
  { l: "Founder",     to: "/about"   },
  { l: "Blog",        to: "/blog"    },
  { l: "Contact",     to: "/contact" },
  { l: "Careers",     to: "/about"   },
];

const JURISDICTIONS = [
  { l: "United Arab Emirates",   to: "/services" },
  { l: "British Virgin Islands", to: "/services" },
  { l: "Cayman Islands",         to: "/services" },
  { l: "Hong Kong",              to: "/services" },
  { l: "Seychelles",             to: "/services" },
  { l: "Mauritius",              to: "/services" },
];

const RESOURCES = [
  { l: "Knowledge Base",    to: "/blog"    },
  { l: "Jurisdiction Guide",to: "/services"},
  { l: "Schedule a Call",   to: "/contact" },
  { l: "Press & Media",     to: "/about"   },
];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const cols = ref.current.querySelectorAll("[data-foot-col]");
    
    // Set initial animation state
    gsap.set(cols, { y: 40, opacity: 0 });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(cols, {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              duration: 0.85,
              ease: "power3.out",
              overwrite: "auto",
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer ref={ref} className="relative overflow-hidden text-white" style={{ background: "#0A0A0A" }}>

      {/* gold mesh + grid texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden style={{
        background: [
          "radial-gradient(ellipse 60% 70% at 20% 0%, rgba(212,175,55,0.10) 0%, transparent 60%)",
          "radial-gradient(ellipse 55% 65% at 85% 100%, rgba(200,169,106,0.07) 0%, transparent 60%)",
        ].join(", "),
      }} />
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]" aria-hidden style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />

      {/* ── Newsletter band ─────────────────────────────────────── */}
      <div className="relative border-b border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-16 py-12 md:py-14
          grid gap-8 md:grid-cols-[1.1fr_1fr] items-center">
          <div data-foot-col>
            <p className="font-display text-[10px] font-semibold uppercase tracking-[3px] text-[#D4AF37]">
              Stay Informed
            </p>
            <h3 className="mt-3 font-display font-extrabold text-white leading-[1.05]"
              style={{ fontSize: "clamp(24px, 2.4vw, 34px)", letterSpacing: "-0.02em" }}>
              Cross-border insights, delivered{" "}
              <span className="font-serif italic text-[#D4AF37]">monthly.</span>
            </h3>
            <p className="mt-3 font-body text-[13px] text-white/45 max-w-md leading-relaxed">
              Jurisdiction updates, banking trends and capital strategy briefings —
              written by our partners, for founders &amp; family offices.
            </p>
          </div>

          <form data-foot-col onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 rounded-xl px-4 py-3.5 font-body text-[13.5px] text-white placeholder-white/30 outline-none focus:ring-2 focus:ring-[#D4AF37]/60 transition-all"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(212,175,55,0.28)",
              }}
            />
            <button type="submit"
              className="flex items-center justify-center gap-2 whitespace-nowrap rounded-xl px-6 py-3.5 font-display font-semibold text-[12.5px] transition-all hover:brightness-110 active:scale-95"
              style={{
                color: "#0A0A0A",
                background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                boxShadow: "0 10px 28px rgba(212,175,55,0.32), inset 0 1px 0 rgba(255,255,255,0.18)",
              }}>
              {subscribed ? "Subscribed ✓" : <>Subscribe <Send size={13} /></>}
            </button>
          </form>
        </div>
      </div>

      {/* ── Main columns ────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1440px] px-6 md:px-16 pt-16 pb-12">
        <div className="grid gap-12 md:grid-cols-12">

          {/* Brand column */}
          <div className="md:col-span-4" data-foot-col>
            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg font-display font-extrabold text-[16px] transition-transform group-hover:scale-110"
                style={{
                  color: "#0A0A0A",
                  background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                  boxShadow: "0 6px 20px rgba(212,175,55,0.35)",
                }}>
                O
              </div>
              <div>
                <div className="font-display font-bold text-[17px] leading-none">Orpheus Financial</div>
                <div className="font-body text-[10px] uppercase tracking-[2.5px] text-[#C8A96A] mt-1">
                  Structure · Banking · Capital
                </div>
              </div>
            </Link>

            <p className="mt-6 font-body text-[13px] text-white/45 max-w-sm leading-[1.85]">
              Dubai-based financial advisory firm structuring offshore companies, global
              banking access &amp; debt raising across 18 active markets — quietly,
              cleanly, fully compliant.
            </p>

            {/* Contact rows */}
            <div className="mt-7 space-y-3.5">
              {[
                { icon: <MapPin size={13} />, text: "Business Bay, Dubai, UAE" },
                { icon: <Phone size={13} />,  text: "+971 4 558 7968", href: "tel:+97145587968" },
                { icon: <MessageCircle size={13} />, text: "WhatsApp · +971 4 558 7968", href: "https://wa.me/97145587968" },
                { icon: <Mail size={13} />,   text: "operations@orpheusfinancial.co", href: "mailto:operations@orpheusfinancial.co" },
                { icon: <Clock size={13} />,  text: "Mon–Fri · 09:00 – 18:00 GST" },
              ].map((c) =>
                c.href
                  ? <a key={c.text} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                      className="flex items-center gap-2.5 font-body text-[12.5px] text-white/45 hover:text-[#D4AF37] transition-colors">
                      <span className="text-[#D4AF37]/80">{c.icon}</span>{c.text}
                    </a>
                  : <div key={c.text} className="flex items-center gap-2.5 font-body text-[12.5px] text-white/45">
                      <span className="text-[#D4AF37]/80">{c.icon}</span>{c.text}
                    </div>
              )}
            </div>

            {/* Social */}
            <div className="mt-7 flex items-center gap-2.5">
              <span className="font-body text-[10px] uppercase tracking-[2px] text-white/30">Follow</span>
              <div className="flex gap-2">
                {[
                  { icon: <Linkedin size={14} />,  href: "https://www.linkedin.com/company/orpheuss/", label: "LinkedIn" },
                  { icon: <Instagram size={14} />, href: "https://www.instagram.com/thisisorpheuss/", label: "Instagram" },
                  { icon: <Facebook size={14} />,  href: "https://www.facebook.com/profile.php?id=61584116284120", label: "Facebook" },
                ].map((s) => (
                  <a key={s.label} href={s.href} aria-label={s.label} target="_blank" rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full transition-all hover:scale-110"
                    style={{
                      border: "1px solid rgba(212,175,55,0.25)",
                      color: "rgba(255,255,255,0.55)",
                      background: "rgba(212,175,55,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#D4AF37";
                      e.currentTarget.style.color = "#0A0A0A";
                      e.currentTarget.style.borderColor = "#D4AF37";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(212,175,55,0.04)";
                      e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                      e.currentTarget.style.borderColor = "rgba(212,175,55,0.25)";
                    }}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Services */}
          <FooterCol title="Services" items={SERVICES} className="md:col-span-2" />

          {/* Company */}
          <FooterCol title="Company" items={COMPANY} className="md:col-span-2" />

          {/* Jurisdictions */}
          <FooterCol title="Jurisdictions" items={JURISDICTIONS} className="md:col-span-2" />

          {/* Resources */}
          <FooterCol title="Resources" items={RESOURCES} className="md:col-span-2" />
        </div>

        {/* ── Trust strip ───────────────────────────────────────── */}
        <div data-foot-col
          className="mt-16 flex flex-wrap items-center justify-between gap-6 rounded-2xl px-6 py-5"
          style={{
            background: "rgba(212,175,55,0.04)",
            border: "1px solid rgba(212,175,55,0.18)",
          }}>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "rgba(212,175,55,0.10)", border: "1px solid rgba(212,175,55,0.28)", color: "#D4AF37" }}>
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="font-display font-semibold text-[12.5px] text-white">Fully compliant operations</div>
              <div className="font-body text-[11px] text-white/45 mt-0.5">
                OECD-aligned · FATF-compliant · Dubai-licensed advisory
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {["DIFC-aware", "ADGM-aware", "OECD", "FATF", "KYC/AML"].map((b) => (
              <span key={b}
                className="rounded-full px-3 py-1 font-display text-[10px] uppercase tracking-[1.5px] font-semibold"
                style={{
                  color: "#D4AF37",
                  background: "rgba(212,175,55,0.06)",
                  border: "1px solid rgba(212,175,55,0.22)",
                }}>
                {b}
              </span>
            ))}
          </div>

          <Link to="/contact"
            className="group inline-flex items-center gap-2 rounded-full px-5 py-2 font-display font-semibold text-[12px] transition-all hover:brightness-110"
            style={{
              color: "#0A0A0A",
              background: "linear-gradient(135deg, #D4AF37 0%, #C8A96A 100%)",
            }}>
            Book a Consultation
            <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* ── Disclosure ────────────────────────────────────────── */}
        <p
          className="mt-10 max-w-4xl font-body text-[11px] leading-[1.85] text-white/35"
        >
          <span className="text-[#C8A96A] font-semibold">Disclosure.</span>{" "}
          Orpheus Financial is a Dubai-based corporate advisory firm. Information on this
          website is general in nature and does not constitute legal, tax, accounting or
          investment advice. Specific structures, banking outcomes and capital
          arrangements depend on each client's profile, jurisdiction of operation and
          ongoing due diligence. Engagement is subject to KYC, source-of-funds review and
          jurisdictional eligibility. We do not operate in, nor advise on, sanctioned or
          FATF-blacklisted jurisdictions.
        </p>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(212,175,55,0.10)" }}>
          <p className="font-body text-[11px] text-white/30">
            © {new Date().getFullYear()} Orpheus Financial®. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
            {[
              { l: "Privacy Policy",    to: "#" },
              { l: "Terms of Service",  to: "#" },
              { l: "Cookies",           to: "#" },
              { l: "Sitemap",           to: "#" },
            ].map((l) => (
              <a key={l.l} href={l.to}
                className="font-body text-[11px] text-white/30 hover:text-[#D4AF37] transition-colors">
                {l.l}
              </a>
            ))}
          </div>

          <p className="font-body text-[11px] text-white/30">
            Made in Dubai · UAE
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title, items, className = "",
}: {
  title: string;
  items: { l: string; to: string }[];
  className?: string;
}) {
  return (
    <div className={className} data-foot-col>
      <h4 className="font-display font-semibold text-[10px] uppercase tracking-[2.5px] text-[#D4AF37] mb-5">
        {title}
      </h4>
      <ul className="space-y-3.5">
        {items.map((it) => (
          <li key={it.l}>
            <Link to={it.to}
              className="group inline-flex items-center gap-1.5 font-body text-[13px] text-white/45 hover:text-white transition-colors">
              <span className="h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-3" />
              {it.l}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
