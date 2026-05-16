import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { gsap } from "@/lib/gsapSetup";
import { ArrowRight, Menu, Phone, X } from "lucide-react";

const links = [
  { to: "/",         label: "Home"     },
  { to: "/services", label: "Services" },
  { to: "/about",    label: "About"    },
  { to: "/blog",     label: "Blog"     },
  { to: "/contact",  label: "Contact"  },
];

const spring = { type: "spring" as const, stiffness: 380, damping: 30 };

export function Navbar() {
  const [expanded, setExpanded]   = useState(true);
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

  useEffect(() => setOpen(false), [location.pathname]);

  /* mobile overlay entrance */
  useEffect(() => {
    if (!open || !overlayRef.current) return;
    const items = overlayRef.current.querySelectorAll("[data-mob]");
    gsap.fromTo(items,
      { y: 56, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out", delay: 0.1 }
    );
  }, [open]);

  const onEnter = () => { setExpanded(true); };
  const onLeave = () => { setExpanded(true); };

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          DESKTOP — Dynamic Island pill (hidden on mobile)
      ══════════════════════════════════════════════════════ */}
      <div className="fixed top-5 inset-x-0 z-[1000] justify-center hidden lg:flex pointer-events-none">
        <LayoutGroup>
          <motion.div
            layout
            className="relative pointer-events-auto rounded-full overflow-hidden"
            style={{
              backdropFilter: "blur(28px)",
              WebkitBackdropFilter: "blur(28px)",
            }}
            animate={{
              background: expanded
                ? "rgba(6,9,24,0.98)"
                : scrolled
                  ? "rgba(5,8,20,0.95)"
                  : "rgba(8,11,26,0.72)",
              boxShadow: expanded
                ? "0 16px 56px rgba(0,0,0,0.65), 0 0 0 1px rgba(212,175,55,0.22), 0 0 80px rgba(212,175,55,0.07)"
                : scrolled
                  ? "0 8px 36px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.05)"
                  : "0 4px 24px rgba(0,0,0,0.28), 0 0 0 1px rgba(255,255,255,0.04)",
            }}
            transition={spring}
            onHoverStart={onEnter}
            onHoverEnd={onLeave}
          >
            {/* scroll progress — thin line at very bottom of island */}
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

            {/* inner border ring (always) */}
            <div className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: "1px solid rgba(255,255,255,0.06)" }} />

            {/* ── Island content ── */}
            <div className="flex items-center px-2.5 py-2 gap-1">

              {/* Logo O mark */}
              <Link to="/" className="flex-none" onClick={() => setExpanded(false)}>
                <motion.div
                  className="h-8 w-8 rounded-full flex items-center justify-center font-display font-extrabold text-white text-[13px] flex-none"
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                    boxShadow: "0 0 0 0 rgba(212,175,55,0.4)",
                  }}
                  whileHover={{ scale: 1.15, boxShadow: "0 0 0 5px rgba(212,175,55,0.18)" }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 550, damping: 18 }}
                >
                  O
                </motion.div>
              </Link>

              {/* Brand name */}
              <motion.div layout="position" className="flex-none">
                <Link to="/">
                  <motion.span
                    className="font-display font-bold text-[13px] whitespace-nowrap px-2"
                    animate={{ color: expanded ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.8)" }}
                    transition={{ duration: 0.2 }}
                  >
                    Orpheus
                  </motion.span>
                </Link>
              </motion.div>

              {/* ── Nav links (appear on expand) ── */}
              <AnimatePresence>
                {expanded && (
                  <motion.div
                    key="nav"
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.14 }}
                  >
                    {/* left divider */}
                    <motion.div
                      className="w-px h-5 flex-none mx-2"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                    />

                    <div className="flex items-center gap-0.5">
                      {links.map((l, i) => (
                        <motion.div
                          key={l.to}
                          initial={{ opacity: 0, y: -8, scale: 0.88 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -5, scale: 0.92 }}
                          transition={{
                            delay: i * 0.038,
                            type: "spring",
                            stiffness: 450,
                            damping: 26,
                          }}
                        >
                          <NavLink to={l.to} end={l.to === "/"}>
                            {({ isActive }) => (
                              <motion.span
                                className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-display font-semibold text-[10.5px] uppercase tracking-[1.5px] whitespace-nowrap select-none"
                                animate={{
                                  background: isActive ? "rgba(212,175,55,0.22)" : "rgba(0,0,0,0)",
                                  color: isActive ? "#E5CB7E" : "rgba(255,255,255,0.5)",
                                  borderColor: isActive ? "rgba(212,175,55,0.28)" : "rgba(0,0,0,0)",
                                }}
                                whileHover={{
                                  background: "rgba(212,175,55,0.14)",
                                  color: "#ffffff",
                                }}
                                style={{ border: "1px solid transparent" }}
                                transition={{ duration: 0.18 }}
                              >
                                {l.label}
                                {isActive && (
                                  <motion.span
                                    layoutId="island-dot"
                                    className="h-[5px] w-[5px] rounded-full bg-[#D4AF37] flex-none"
                                    style={{ boxShadow: "0 0 7px #D4AF37" }}
                                    transition={spring}
                                  />
                                )}
                              </motion.span>
                            )}
                          </NavLink>
                        </motion.div>
                      ))}
                    </div>

                    {/* right divider */}
                    <motion.div
                      className="w-px h-5 flex-none mx-2"
                      style={{ background: "rgba(255,255,255,0.08)" }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      exit={{ scaleY: 0 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── CTA pill (always visible) ── */}
              <Link to="/contact" className="flex-none">
                <motion.button
                  className="flex items-center gap-1.5 rounded-full font-display font-semibold text-[10.5px] uppercase tracking-[1.5px] text-white whitespace-nowrap"
                  animate={{
                    paddingLeft: expanded ? 16 : 14,
                    paddingRight: expanded ? 16 : 14,
                    paddingTop: 7,
                    paddingBottom: 7,
                  }}
                  style={{
                    background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                    boxShadow: "0 3px 14px rgba(212,175,55,0.38), inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
                  whileHover={{
                    scale: 1.06,
                    boxShadow: "0 6px 26px rgba(212,175,55,0.58), inset 0 1px 0 rgba(255,255,255,0.14)",
                  }}
                  whileTap={{ scale: 0.93 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                >
                  Consult
                  <motion.span
                    animate={{ x: expanded ? 1 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <ArrowRight size={10} />
                  </motion.span>
                </motion.button>
              </Link>

            </div>
          </motion.div>
        </LayoutGroup>
      </div>

      {/* ══════════════════════════════════════════════════════
          MOBILE header pill
      ══════════════════════════════════════════════════════ */}
      <header className="fixed inset-x-0 top-0 z-[1000] lg:hidden">
        <div
          className="mx-4 mt-4 flex items-center justify-between px-3.5 py-2.5 rounded-2xl"
          style={{
            background: "rgba(5,8,20,0.94)",
            border: "1px solid rgba(255,255,255,0.06)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          <Link to="/" className="flex items-center gap-2.5">
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center font-display font-extrabold text-white text-[13px]"
              style={{ background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)" }}
            >
              O
            </div>
            <span className="font-display font-bold text-[14px] text-white/90">
              Orpheus Financial
            </span>
          </Link>

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
            style={{ background: "#050505", paddingTop: "88px" }}
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
              {links.map((l) => (
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
              ))}

              <div data-mob className="mt-auto pb-10 pt-8 flex flex-col gap-4">
                <a
                  href="tel:+97145587968"
                  className="flex items-center gap-2 font-body text-[13px] text-white/38 hover:text-[#C8A96A] transition-colors"
                >
                  <Phone size={13} /> +971 4 558 7968
                </a>
                <Link to="/contact">
                  <button
                    className="w-full flex items-center justify-center gap-2 rounded-2xl py-4 font-display font-semibold text-[13px] uppercase tracking-[2px] text-white"
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
