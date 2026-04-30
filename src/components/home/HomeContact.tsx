import { useEffect, useRef, useState } from "react";
import { gsap, setupGsap } from "@/lib/gsapSetup";
import { ArrowRight, Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import WorldMapDemo from "@/components/world-map-demo";

/* ═══════════════════════════════════════════════════════════════
   GLOBE — orthographic projection, center lat=15°N lon=30°E
═══════════════════════════════════════════════════════════════ */
const R = 168, CX = 200, CY = 200;
const LAT0 = 15 * (Math.PI / 180);
const LON0 = 30;

function proj(latDeg: number, lonDeg: number) {
  const φ = latDeg * (Math.PI / 180);
  const λ = (lonDeg - LON0) * (Math.PI / 180);
  const c = Math.sin(LAT0) * Math.sin(φ) + Math.cos(LAT0) * Math.cos(φ) * Math.cos(λ);
  return {
    x: CX + R * Math.cos(φ) * Math.sin(λ),
    y: CY - R * (Math.sin(φ) * Math.cos(LAT0) - Math.cos(φ) * Math.cos(λ) * Math.sin(LAT0)),
    vis: c > 0.015,
  };
}

function toD(pts: ReturnType<typeof proj>[]) {
  const d: string[] = [];
  let on = false;
  for (const p of pts) {
    if (!p.vis) { on = false; continue; }
    d.push(on ? `L${p.x.toFixed(1)},${p.y.toFixed(1)}` : `M${p.x.toFixed(1)},${p.y.toFixed(1)}`);
    on = true;
  }
  return d.join("");
}

const PARALLELS = [-60, -30, 0, 30, 60].map(lat =>
  toD(Array.from({ length: 361 }, (_, i) => proj(lat, i - 180)))
);
const MERIDIANS = [-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map(lon =>
  toD(Array.from({ length: 171 }, (_, i) => proj(i - 85, lon)))
);

const RAW = [
  { name: "Dubai",      sub: "HQ",           lat: 25.2,  lon: 55.3,  hq: true  },
  { name: "London",     sub: "UK",            lat: 51.5,  lon: -0.1,  hq: false },
  { name: "Hong Kong",  sub: "Asia",          lat: 22.3,  lon: 114.2, hq: false },
  { name: "Singapore",  sub: "SEA",           lat:  1.3,  lon: 103.8, hq: false },
  { name: "BVI",        sub: "Caribbean",     lat: 18.4,  lon: -64.6, hq: false },
  { name: "Mauritius",  sub: "Indian Ocean",  lat: -20.3, lon: 57.5,  hq: false },
  { name: "Seychelles", sub: "Indian Ocean",  lat:  -4.7, lon: 55.5,  hq: false },
];

const CITIES = RAW.map(c => ({ ...c, ...proj(c.lat, c.lon) })).filter(c => c.vis);
const DUBAI  = CITIES.find(c => c.name === "Dubai")!;

/* ══════════════════════════════════════════════════════════════ */

function Globe() {
  return (
    <div className="relative mx-auto select-none" style={{ width: 400, height: 400 }}>

      {/* outer glow ring */}
      <div className="absolute inset-0 rounded-full pointer-events-none"
        style={{ boxShadow: "0 0 80px rgba(67,97,238,0.18), 0 0 0 1px rgba(67,97,238,0.12)" }} />

      <svg viewBox="0 0 400 400" width={400} height={400} className="overflow-visible">
        <defs>
          {/* sphere clip */}
          <clipPath id="globe-clip">
            <circle cx={CX} cy={CY} r={R} />
          </clipPath>
          {/* outer fade rim */}
          <radialGradient id="rim" cx="50%" cy="50%" r="50%">
            <stop offset="75%" stopColor="transparent" />
            <stop offset="100%" stopColor="rgba(5,9,19,0.85)" />
          </radialGradient>
          {/* atmosphere glow */}
          <radialGradient id="atmo" cx="38%" cy="30%" r="60%">
            <stop offset="0%"   stopColor="rgba(107,138,244,0.08)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          {/* sphere base */}
          <radialGradient id="sphere-bg" cx="40%" cy="35%" r="65%">
            <stop offset="0%"   stopColor="#0F1A3A" />
            <stop offset="55%"  stopColor="#080C1E" />
            <stop offset="100%" stopColor="#050813" />
          </radialGradient>
          {/* connection line gradient */}
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#4361EE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4361EE" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ── base sphere ── */}
        <circle cx={CX} cy={CY} r={R} fill="url(#sphere-bg)" />

        <g clipPath="url(#globe-clip)">
          {/* atmosphere */}
          <circle cx={CX} cy={CY} r={R} fill="url(#atmo)" />

          {/* lat/lon grid */}
          {PARALLELS.map((d, i) => (
            <path key={`par-${i}`} d={d} fill="none"
              stroke="rgba(67,97,238,0.18)" strokeWidth="0.7" />
          ))}
          {MERIDIANS.map((d, i) => (
            <path key={`mer-${i}`} d={d} fill="none"
              stroke="rgba(67,97,238,0.13)" strokeWidth="0.7" />
          ))}

          {/* connection arcs Dubai → other cities */}
          {CITIES.filter(c => !c.hq).map((c) => {
            const mx = (DUBAI.x + c.x) / 2;
            const my = Math.min(DUBAI.y, c.y) - 38;
            return (
              <path key={`arc-${c.name}`}
                d={`M${DUBAI.x.toFixed(1)},${DUBAI.y.toFixed(1)} Q${mx.toFixed(1)},${my.toFixed(1)} ${c.x.toFixed(1)},${c.y.toFixed(1)}`}
                fill="none" stroke="rgba(67,97,238,0.35)" strokeWidth="0.9"
                strokeDasharray="3 4" />
            );
          })}

          {/* city dots */}
          {CITIES.map((c) => (
            <g key={c.name}>
              {/* pulse ring */}
              <circle cx={c.x} cy={c.y} r={c.hq ? 9 : 6} fill="none"
                stroke={c.hq ? "rgba(67,97,238,0.5)" : "rgba(107,138,244,0.35)"}
                strokeWidth="1">
                <animate attributeName="r"
                  values={c.hq ? "7;14;7" : "5;10;5"}
                  dur={c.hq ? "2.2s" : "3s"} repeatCount="indefinite" />
                <animate attributeName="opacity"
                  values="0.7;0;0.7" dur={c.hq ? "2.2s" : "3s"} repeatCount="indefinite" />
              </circle>
              {/* dot */}
              <circle cx={c.x} cy={c.y} r={c.hq ? 4.5 : 3}
                fill={c.hq ? "#4361EE" : "#6B8AF4"}
                style={{ filter: c.hq ? "drop-shadow(0 0 5px #4361EE)" : "drop-shadow(0 0 3px #6B8AF4)" }} />
            </g>
          ))}
        </g>

        {/* rim fade overlay */}
        <circle cx={CX} cy={CY} r={R} fill="url(#rim)" />

        {/* outer border ring */}
        <circle cx={CX} cy={CY} r={R} fill="none"
          stroke="rgba(67,97,238,0.22)" strokeWidth="1" />

        {/* city labels (outside clip so they always show) */}
        {CITIES.map((c) => {
          const dx = c.x > CX ? 10 : -10;
          const anchor = c.x > CX ? "start" : "end";
          return (
            <g key={`lbl-${c.name}`}>
              <text x={c.x + dx} y={c.y - 3}
                fontSize="9" fontFamily="'Plus Jakarta Sans', sans-serif"
                fontWeight="600" fill="rgba(255,255,255,0.75)"
                textAnchor={anchor as "start" | "end"}
                style={{ letterSpacing: "0.5px" }}>
                {c.name}
              </text>
              <text x={c.x + dx} y={c.y + 8}
                fontSize="7.5" fontFamily="'Plus Jakarta Sans', sans-serif"
                fill="rgba(107,138,244,0.7)" textAnchor={anchor as "start" | "end"}>
                {c.sub}
              </text>
            </g>
          );
        })}
      </svg>

      {/* "18 markets" badge */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full px-4 py-1.5 pointer-events-none"
        style={{
          background: "rgba(8,12,30,0.9)",
          border: "1px solid rgba(67,97,238,0.25)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}>
        <span className="h-1.5 w-1.5 rounded-full bg-[#4361EE]"
          style={{ boxShadow: "0 0 6px #4361EE" }} />
        <span className="font-display font-semibold text-[10px] uppercase tracking-[2px] text-white/70">
          18 Active Markets
        </span>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Contact form
══════════════════════════════════════════════════════════════ */
const INPUT_STYLE: React.CSSProperties = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(67,97,238,0.2)",
  borderRadius: "12px",
  padding: "12px 16px",
  width: "100%",
  color: "#fff",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.25s",
};

const LABEL_STYLE: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontFamily: "'Plus Jakarta Sans', sans-serif",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "2px",
  color: "rgba(255,255,255,0.4)",
  marginBottom: "8px",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={LABEL_STYLE}>{label}</label>
      {children}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   Main section
══════════════════════════════════════════════════════════════ */
export function HomeContact() {
  const sectionRef = useRef<HTMLElement>(null);
  const footprintRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    setupGsap();
    if (!sectionRef.current) return;
    const els = sectionRef.current.querySelectorAll("[data-ca]");
    gsap.fromTo(els, { y: 40, opacity: 0 }, {
      y: 0, opacity: 1, stagger: 0.1, duration: 0.9, ease: "power3.out",
      scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
    });

    if (footprintRef.current) {
      const q = footprintRef.current.querySelectorAll("[data-fp]");
      gsap.fromTo(
        q,
        { opacity: 0, y: 24, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: footprintRef.current, start: "top 78%", once: true },
        },
      );
    }
  }, []);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const focusStyle = (name: string): React.CSSProperties => ({
    ...INPUT_STYLE,
    borderColor: focused === name ? "rgba(67,97,238,0.6)" : "rgba(67,97,238,0.2)",
    boxShadow: focused === name ? "0 0 0 3px rgba(67,97,238,0.08)" : "none",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section ref={sectionRef} className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#070B1C" }}>

      {/* grid texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(67,97,238,1) 1px, transparent 1px), linear-gradient(90deg, rgba(67,97,238,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
      }} />
      {/* top edge */}
      <div className="absolute inset-x-0 top-0 h-px" style={{
        background: "linear-gradient(90deg, transparent, rgba(67,97,238,0.3), transparent)"
      }} />

      <div className="relative z-10 mx-auto max-w-[1280px] px-6 md:px-16">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          {/* ══ LEFT: Form ══════════════════════════════ */}
          <div>
            <div data-ca>
              <p className="font-display text-[11px] font-semibold uppercase tracking-[3px]"
                style={{ color: "#4361EE" }}>
                Get In Touch
              </p>
              <h2 className="mt-4 font-display font-extrabold leading-[1.0] text-white"
                style={{ fontSize: "clamp(32px, 4vw, 58px)", letterSpacing: "-0.03em" }}>
                Let's Structure{" "}
                <span className="font-serif italic" style={{
                  background: "linear-gradient(130deg, #6B8AF4 0%, #A5BEFF 50%, #4361EE 100%)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                }}>
                  Your Future.
                </span>
              </h2>
              <p className="mt-4 font-body text-[15px] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.4)", maxWidth: 420 }}>
                Book a free 30-minute consultation. We'll map your structure, jurisdictions and next steps — in plain English.
              </p>
            </div>

            {/* contact pills */}
            <div data-ca className="mt-7 flex flex-wrap gap-3">
              {[
                { icon: <MapPin size={12} />, text: "Business Bay, Dubai" },
                { icon: <Phone size={12} />,  text: "+971 4 558 7968",             href: "tel:+97145587968" },
                { icon: <Mail size={12} />,   text: "operations@orpheusfinancial.co", href: "mailto:operations@orpheusfinancial.co" },
              ].map(p => (
                p.href
                  ? <a key={p.text} href={p.href}
                      className="flex items-center gap-2 rounded-full px-4 py-2 font-body text-[12px] transition-all hover:border-blue/40"
                      style={{ background: "rgba(67,97,238,0.07)", border: "1px solid rgba(67,97,238,0.18)", color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ color: "#6B8AF4" }}>{p.icon}</span>{p.text}
                    </a>
                  : <div key={p.text}
                      className="flex items-center gap-2 rounded-full px-4 py-2 font-body text-[12px]"
                      style={{ background: "rgba(67,97,238,0.07)", border: "1px solid rgba(67,97,238,0.18)", color: "rgba(255,255,255,0.55)" }}>
                      <span style={{ color: "#6B8AF4" }}>{p.icon}</span>{p.text}
                    </div>
              ))}
            </div>

            {/* form */}
            <div data-ca className="mt-10">
              {sent ? (
                <div className="flex flex-col items-start gap-4 rounded-2xl p-8"
                  style={{ background: "rgba(67,97,238,0.06)", border: "1px solid rgba(67,97,238,0.2)" }}>
                  <CheckCircle2 size={36} style={{ color: "#4ADE80" }} />
                  <div>
                    <p className="font-display font-bold text-[20px] text-white">Message sent!</p>
                    <p className="mt-1 font-body text-[14px]" style={{ color: "rgba(255,255,255,0.45)" }}>
                      We'll be in touch within 24 hours.
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Full Name">
                      <input type="text" placeholder="John Smith" value={form.name}
                        onChange={set("name")} required
                        style={focusStyle("name")}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)} />
                    </Field>
                    <Field label="Email Address">
                      <input type="email" placeholder="john@company.com" value={form.email}
                        onChange={set("email")} required
                        style={focusStyle("email")}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} />
                    </Field>
                  </div>
                  <Field label="Company (optional)">
                    <input type="text" placeholder="Your company name" value={form.company}
                      onChange={set("company")}
                      style={focusStyle("company")}
                      onFocus={() => setFocused("company")} onBlur={() => setFocused(null)} />
                  </Field>
                  <Field label="Message">
                    <textarea placeholder="Tell us about your goals…" value={form.message}
                      onChange={set("message")} required rows={4}
                      style={{ ...focusStyle("message"), resize: "none" }}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)} />
                  </Field>
                  <button type="submit"
                    className="flex items-center justify-center gap-2.5 rounded-xl py-4 font-display font-semibold text-[13px] uppercase tracking-[2px] text-white transition-all hover:-translate-y-0.5 hover:brightness-110 active:scale-[0.98]"
                    style={{
                      background: "linear-gradient(135deg, #4361EE 0%, #2D4BCC 100%)",
                      boxShadow: "0 8px 32px rgba(67,97,238,0.4), inset 0 1px 0 rgba(255,255,255,0.12)",
                    }}>
                    <Send size={14} /> Send Message <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* ══ RIGHT: Globe ════════════════════════════ */}
          <div data-ca className="flex justify-center lg:justify-end">
            <div ref={footprintRef} className="relative">
              {/* label above */}
              <p data-fp className="text-center font-body text-[10px] uppercase tracking-[3px] mb-6"
                style={{ color: "rgba(255,255,255,0.25)" }}>
                Our Global Footprint
              </p>
              <div data-fp className="rounded-2xl border border-white/10 bg-[#070B1C] p-2">
                <WorldMapDemo />
              </div>
              <p
                data-fp
                className="mt-4 text-center font-body text-[12px] uppercase tracking-[2px]"
                style={{ color: "rgba(255,255,255,0.45)" }}
              >
                Headquartered in Business Bay, Dubai.
              </p>
              {/* market list below globe */}
              <div data-fp className="mt-6 flex flex-wrap justify-center gap-2 max-w-[400px] mx-auto">
                {["UAE","BVI","Cayman","Hong Kong","Singapore","Mauritius","Seychelles","Luxembourg","Malta","UK","Switzerland","Cyprus"].map(m => (
                  <span key={m}
                    className="rounded-full px-2.5 py-1 font-display text-[9px] uppercase tracking-[1.5px] font-semibold"
                    style={{
                      background: "rgba(67,97,238,0.08)",
                      border: "1px solid rgba(67,97,238,0.15)",
                      color: "rgba(107,138,244,0.7)",
                    }}>
                    {m}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
