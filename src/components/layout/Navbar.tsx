import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";
import { ArrowRight, Menu, Phone, X, Globe2, Briefcase, TrendingUp, ChevronDown } from "lucide-react";

const links = [
  { to: "/",         label: "Home"     },
  { to: "/services", label: "Services" },
  { to: "/about",    label: "About"    },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
];

const PHONE_TEL = "tel:+97145587968";
const PHONE_DISPLAY = "+971 4 558 7968";
const NAV_LOGO = "/brands/favicon.png";

const serviceCategories = [
  {
    to: "/services#offshore-structure-banking",
    label: "Offshore Structure & Banking",
    desc: "Tax-efficient entities, global corporate accounts & KYC compliance.",
    icon: Globe2
  },
  {
    to: "/services#corporate-finance-advisory",
    label: "Corporate Finance & Advisory",
    desc: "Strategic transactions, holding structures & cross-border advisory.",
    icon: Briefcase
  },
  {
    to: "/services#debt-raising",
    label: "Debt Raising",
    desc: "Capital stacked advisory & institutional lender coordination.",
    icon: TrendingUp
  }
];

export function Navbar() {
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [open, setOpen]           = useState(false);
  
  const progressRef = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const location    = useLocation();

  /* scroll position + progress bar */
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (progressRef.current) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressRef.current.style.transform = `scaleX(${total > 0 ? window.scrollY / total : 0})`;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  /* mobile overlay entrance */
  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const items = overlayRef.current.querySelectorAll("[data-mob]");
    gsap.fromTo(items,
      { y: 56, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );
  }, [open]);

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          DESKTOP — Fully Extended Top Navbar (hidden on mobile)
      ══════════════════════════════════════════════════════ */}
      <header
        className="fixed inset-x-0 top-0 z-[1000] hidden lg:block transition-all duration-300 border-b"
        style={{
          background: scrolled ? "rgba(10,10,10,0.98)" : "rgba(10,10,10,0.94)",
          borderColor: "rgba(212,175,55,0.15)",
          boxShadow: scrolled ? "0 4px 20px rgba(0,0,0,0.4)" : "none",
        }}
      >
        {/* scroll progress */}
        <div
          ref={progressRef}
          className="absolute bottom-0 left-0 h-[2px] w-full origin-left pointer-events-none"
          style={{
            background: "linear-gradient(90deg, #A88829, #D4AF37, #E5CB7E)",
            transform: "scaleX(0)",
            opacity: scrolled ? 1 : 0,
            transition: "opacity 0.35s",
          }}
        />

        <div className="mx-auto max-w-[1440px] px-6 md:px-16 h-20 flex items-center justify-between">
          <Link
            to="/"
            className="flex shrink-0 items-center py-1"
            aria-label="Orpheus Financial — Home"
          >
            <img
              src={NAV_LOGO}
              alt="Orpheus Financial"
              width={220}
              height={48}
              className="h-10 w-auto max-w-[200px] object-contain object-left brightness-110 contrast-105 lg:h-11 lg:max-w-[240px]"
            />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-1">
            {links.map((l) => {
              if (l.label === "Services") {
                return (
                  <div
                    key={l.label}
                    className="relative"
                    onMouseEnter={() => setServicesDropdownOpen(true)}
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <NavLink to="/services" end>
                      {({ isActive }) => (
                        <span
                          className="relative flex items-center gap-1.5 px-4 py-2 rounded-full font-display font-bold text-[11px] uppercase tracking-[1.5px] transition-all duration-200 cursor-pointer"
                          style={{
                            background: isActive ? "rgba(212,175,55,0.15)" : "transparent",
                            color: isActive ? "#E5CB7E" : "rgba(255,255,255,0.65)",
                          }}
                        >
                          {l.label}
                          <ChevronDown size={11} className={`transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
                          {isActive && (
                            <span
                              className="h-1 w-1 rounded-full bg-[#D4AF37]"
                              style={{ boxShadow: "0 0 6px #D4AF37" }}
                            />
                          )}
                        </span>
                      )}
                    </NavLink>

                    {/* Desktop Dropdown Panel */}
                    <AnimatePresence>
                      {servicesDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 15, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 15, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full mt-1 w-[380px] rounded-2xl border border-gold/25 p-3 flex flex-col gap-1 z-[1000]"
                          style={{
                            background: "rgba(12,12,12,0.98)",
                            boxShadow: "0 24px 60px rgba(0,0,0,0.65)",
                          }}
                        >
                          {serviceCategories.map((sub) => {
                            const Icon = sub.icon;
                            return (
                              <Link
                                key={sub.to}
                                to={sub.to}
                                className="group flex items-start gap-3.5 p-3 rounded-xl hover:bg-gold/[0.07] transition-all duration-200"
                                onClick={() => setServicesDropdownOpen(false)}
                              >
                                <div className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-gold/10 text-gold group-hover:bg-gold group-hover:text-black transition-all">
                                  <Icon size={16} />
                                </div>
                                <div className="min-w-0">
                                  <h4 className="font-display font-bold text-[11px] uppercase tracking-[1.5px] text-white/95 group-hover:text-[#E5CB7E] transition-colors leading-none">
                                    {sub.label}
                                  </h4>
                                  <p className="mt-1.5 font-body text-[10px] leading-[1.45] text-white/50 group-hover:text-white/70 transition-colors font-semibold">
                                    {sub.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <NavLink key={l.to} to={l.to} end={l.to === "/"}>
                  {({ isActive }) => (
                    <span
                      className="relative flex items-center gap-1.5 px-4 py-2 rounded-full font-display font-bold text-[11px] uppercase tracking-[1.5px] transition-all duration-200"
                      style={{
                        background: isActive ? "rgba(212,175,55,0.15)" : "transparent",
                        color: isActive ? "#E5CB7E" : "rgba(255,255,255,0.65)",
                      }}
                    >
                      {l.label}
                      {isActive && (
                        <span
                          className="h-1 w-1 rounded-full bg-[#D4AF37]"
                          style={{ boxShadow: "0 0 6px #D4AF37" }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 xl:gap-4">
            <a
              href={PHONE_TEL}
              className="group flex items-center gap-2 rounded-full border border-gold/20 bg-white/[0.04] px-4 py-2.5 font-body text-[12px] font-semibold text-white/75 transition-all hover:border-gold/40 hover:bg-gold/[0.08] hover:text-[#E5CB7E] whitespace-nowrap"
            >
              <Phone size={14} className="text-gold transition-colors group-hover:text-[#E5CB7E]" />
              {PHONE_DISPLAY}
            </a>
            <Link to="/contact">
              <motion.button
                className="flex items-center gap-1.5 rounded-full px-5 py-2.5 font-display font-bold text-[10.5px] uppercase tracking-[1.5px] text-white whitespace-nowrap"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                  boxShadow: "0 3px 14px rgba(212,175,55,0.38), inset 0 1px 0 rgba(255,255,255,0.14)",
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 6px 20px rgba(212,175,55,0.58)",
                }}
                whileTap={{ scale: 0.96 }}
              >
                Consult <ArrowRight size={10} />
              </motion.button>
            </Link>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          MOBILE header pill
      ══════════════════════════════════════════════════════ */}
      <header className="fixed inset-x-0 top-0 z-[1000] lg:hidden">
        <div
          className="mx-4 mt-4 flex items-center justify-between px-3.5 py-2.5 rounded-2xl"
          style={{
            background: "rgba(10,10,10,0.97)",
            border: "1px solid rgba(212,175,55,0.2)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.35)",
          }}
        >
          <Link
            to="/"
            className="flex min-w-0 shrink items-center py-0.5"
            aria-label="Orpheus Financial — Home"
          >
            <img
              src={NAV_LOGO}
              alt="Orpheus Financial"
              width={180}
              height={40}
              className="h-9 w-auto max-w-[min(160px,42vw)] object-contain object-left brightness-110 contrast-105"
            />
          </Link>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_TEL}
              aria-label={`Call ${PHONE_DISPLAY}`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/20 bg-white/[0.05] text-gold transition-all hover:border-gold/40 hover:bg-gold/[0.12] active:scale-95"
            >
              <Phone size={16} />
            </a>
            <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300"
            style={{
              background: open ? "rgba(212,175,55,0.22)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${open ? "rgba(212,175,55,0.35)" : "rgba(255,255,255,0.08)"}`,
              color: "#fff",
            }}
          >
            <AnimatePresence mode="wait">
              {open
                ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={16} /></motion.span>
                : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={16} /></motion.span>
              }
            </AnimatePresence>
          </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════════════
          MOBILE overlay
      ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {open && (
          <motion.div
            ref={overlayRef}
            key="mobile-overlay"
            className="fixed inset-0 z-[999] lg:hidden flex flex-col"
            style={{ background: "#1D1C1C", paddingTop: "88px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            {/* grid */}
            <div className="absolute inset-0 opacity-[0.035]" style={{
              backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }} />
            {/* glow */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "radial-gradient(ellipse 70% 55% at 50% 65%, rgba(212,175,55,0.1) 0%, transparent 70%)"
            }} />

            <nav className="relative flex flex-col px-8 pt-4 flex-1 overflow-y-auto">
              {links.map((l) => {
                if (l.label === "Services") {
                  return (
                    <div key={l.label} data-mob className="border-b" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="group flex items-center justify-between w-full py-5 text-left"
                      >
                        <span
                          className="font-display font-extrabold leading-none text-white/85"
                          style={{
                            fontSize: "clamp(34px, 9.5vw, 52px)",
                            letterSpacing: "-0.03em",
                          }}
                        >
                          {l.label}
                        </span>
                        <ChevronDown
                          size={24}
                          className="transition-transform duration-300 text-gold"
                          style={{
                            transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)"
                          }}
                        />
                      </button>

                      {/* Mobile Accordion Menu */}
                      <AnimatePresence>
                        {mobileServicesOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="pl-3 pb-4 flex flex-col gap-1 overflow-hidden"
                          >
                            {serviceCategories.map((sub) => {
                              const SubIcon = sub.icon;
                              return (
                                <Link
                                  key={sub.to}
                                  to={sub.to}
                                  className="group flex items-center justify-between py-3 border-b border-gold/[0.06]"
                                  onClick={() => setOpen(false)}
                                >
                                  <div className="flex items-center gap-3">
                                    <SubIcon size={16} className="text-gold" />
                                    <span className="font-display font-bold text-sm text-white/70 group-hover:text-[#E5CB7E] transition-colors">
                                      {sub.label}
                                    </span>
                                  </div>
                                  <ArrowRight size={14} className="text-white/20 group-hover:text-gold transition-all group-hover:translate-x-1" />
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === "/"}
                    data-mob
                    className="group flex items-center justify-between py-5 border-b"
                    style={{ borderColor: "rgba(212,175,55,0.1)" }}
                  >
                    {({ isActive }) => (
                      <>
                        <span
                          className="font-display font-extrabold leading-none"
                          style={{
                            fontSize: "clamp(34px, 9.5vw, 52px)",
                            letterSpacing: "-0.03em",
                            color: isActive ? "#C8A96A" : "rgba(255,255,255,0.85)",
                            textShadow: isActive ? "0 0 40px rgba(212,175,55,0.45)" : "none",
                          }}
                        >
                          {l.label}
                        </span>
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover:translate-x-1.5"
                          style={{ color: isActive ? "#D4AF37" : "rgba(255,255,255,0.14)" }}
                        />
                      </>
                    )}
                  </NavLink>
                );
              })}

              <div data-mob className="mt-auto pb-10 pt-8 flex flex-col gap-4">
                <a
                  href={PHONE_TEL}
                  className="flex items-center gap-2 font-body text-[13px] text-white/38 hover:text-[#C8A96A] transition-colors"
                >
                  <Phone size={13} /> {PHONE_DISPLAY}
                </a>
                <Link to="/contact">
                  <button
                    className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-display font-bold text-[13px] uppercase tracking-[2px] text-white"
                    style={{
                      background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                      boxShadow: "0 8px 32px rgba(212,175,55,0.38)",
                    }}
                  >
                    Free Consultation <ArrowRight size={13} />
                  </button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
