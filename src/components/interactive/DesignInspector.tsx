import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Paintbrush, X, Check } from "lucide-react";

const accentColors = [
  { name: "Sovereign Gold", value: "#D4AF37", soft: "#C8A96A" },
  { name: "Sovereign Blue", value: "#3B82F6", soft: "#60A5FA" },
  { name: "Emerald Forest", value: "#10B981", soft: "#34D399" },
  { name: "Crimson Royal", value: "#E11D48", soft: "#FB7185" },
  { name: "Platinum Light", value: "#E5E5E5", soft: "#A3A3A3" }
];

const fontFamilies = [
  { name: "Plus Jakarta", value: "'Plus Jakarta Sans', system-ui, sans-serif" },
  { name: "Avant-Garde Syne", value: "'Syne', system-ui, sans-serif" },
  { name: "DM Serif Display", value: "'DM Serif Display', Georgia, serif" }
];

export function DesignInspector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState("#D4AF37");
  const [currentFont, setCurrentFont] = useState("'Plus Jakarta Sans', system-ui, sans-serif");

  const changeAccentColor = (colorVal: string, softVal: string) => {
    setCurrentColor(colorVal);
    document.documentElement.style.setProperty("--gold", colorVal);
    document.documentElement.style.setProperty("--gold-soft", softVal);
    
    // Update legacy variables mapping
    document.documentElement.style.setProperty("--blue", colorVal);
    document.documentElement.style.setProperty("--blue-light", softVal);
    
    // Force updates for standard primary color
    // HSL representation helper for primary rings
    if (colorVal === "#D4AF37") {
      document.documentElement.style.setProperty("--primary", "44 65% 52%");
    } else if (colorVal === "#3B82F6") {
      document.documentElement.style.setProperty("--primary", "221 83% 53%");
    } else if (colorVal === "#10B981") {
      document.documentElement.style.setProperty("--primary", "162 76% 41%");
    } else if (colorVal === "#E11D48") {
      document.documentElement.style.setProperty("--primary", "343 80% 53%");
    } else {
      document.documentElement.style.setProperty("--primary", "0 0% 90%");
    }
  };

  const changeFont = (fontVal: string) => {
    setCurrentFont(fontVal);
    document.documentElement.style.setProperty("--font-display", fontVal);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[9999] flex flex-col items-start">
      {/* Settings Dialog Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[280px] p-5 rounded-2xl border border-gold/20 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col gap-5"
            style={{
              background: "#161616",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gold/15 pb-3">
              <span className="font-display text-[10.5px] font-bold uppercase tracking-[2px] text-white">
                Brand Inspector
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
                aria-label="Close brand inspector"
              >
                <X size={14} />
              </button>
            </div>

            {/* Accent Color Customizer */}
            <div className="flex flex-col gap-2.5">
              <label className="font-body text-[9px] uppercase tracking-wider text-white/40 font-bold">
                Accent Theme Color
              </label>
              <div className="flex flex-wrap gap-2">
                {accentColors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => changeAccentColor(color.value, color.soft)}
                    className="h-7 w-7 rounded-full border flex items-center justify-center transition-all relative overflow-hidden active:scale-90"
                    style={{
                      background: color.value,
                      borderColor: currentColor === color.value ? "#FFFFFF" : "rgba(255,255,255,0.15)",
                      boxShadow: currentColor === color.value ? `0 0 10px ${color.value}` : "none",
                    }}
                    title={color.name}
                  >
                    {currentColor === color.value && (
                      <Check size={11} className={color.value === "#E5E5E5" ? "text-black" : "text-white"} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Customizer */}
            <div className="flex flex-col gap-2.5">
              <label className="font-body text-[9px] uppercase tracking-wider text-white/40 font-bold">
                Display Typography
              </label>
              <div className="flex flex-col gap-1.5">
                {fontFamilies.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => changeFont(font.value)}
                    className="w-full text-left px-3 py-2 rounded-xl text-[11px] font-semibold border transition-all duration-200"
                    style={{
                      background: currentFont === font.value ? "rgba(212,175,55,0.08)" : "rgba(255,255,255,0.03)",
                      borderColor: currentFont === font.value ? "var(--gold)" : "rgba(255,255,255,0.08)",
                      color: currentFont === font.value ? "var(--gold-soft)" : "rgba(255,255,255,0.6)",
                      fontFamily: font.value
                    }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-11 w-11 items-center justify-center rounded-full text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative overflow-hidden"
        style={{
          background: "rgba(22,22,22,0.85)",
          border: "1px solid rgba(212,175,55,0.22)",
        }}
        whileHover={{ scale: 1.06, borderColor: "var(--gold)" }}
        whileTap={{ scale: 0.94 }}
        aria-label="Toggle brand settings panel"
      >
        <Paintbrush size={16} style={{ color: "var(--gold)" }} />
      </motion.button>
    </div>
  );
}
