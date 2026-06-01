import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ArrowRight } from "lucide-react";

const PHONE = "97145587968";
const NAV_LOGO = "/brands/favicon.png";

const messageSuggestions = [
  {
    label: "Ask now",
    text: "Hi Orpheus, I'd like to speak with an advisor now.",
  },
  {
    label: "Free consultation",
    text: "Hello Orpheus Financial, I'd like to book a free consultation.",
  },
  {
    label: "Offshore & banking",
    text: "Hello, I'd like help with offshore structure and corporate banking setup.",
  },
  {
    label: "Debt raising",
    text: "Hello, I'd like to discuss debt raising and capital options.",
  },
];

export function WhatsAppChat() {
  const [loaderReady, setLoaderReady] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);

  useEffect(() => {
    const onLoaderComplete = () => {
      setLoaderReady(true);
      setShowTeaser(true);
    };

    if ((window as Window & { orpheusLoaderFinished?: boolean }).orpheusLoaderFinished) {
      onLoaderComplete();
      return;
    }

    window.addEventListener("orpheusLoaderComplete", onLoaderComplete, { once: true });
    return () => window.removeEventListener("orpheusLoaderComplete", onLoaderComplete);
  }, []);

  const dismissTeaser = () => {
    setShowTeaser(false);
    setTeaserDismissed(true);
  };

  const openWhatsApp = (text: string) => {
    const finalMsg = text.trim() || "Hello Orpheus Financial, I'd like to get a free consultation.";
    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(finalMsg)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setIsOpen(false);
    setMessage("");
    dismissTeaser();
  };

  const handleSend = () => openWhatsApp(message);

  if (!loaderReady) return null;

  const teaserVisible = !isOpen && showTeaser && !teaserDismissed;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      <AnimatePresence>
        {teaserVisible && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="mb-3 w-[min(320px,calc(100vw-48px))] overflow-hidden rounded-2xl border border-gold/25 shadow-[0_16px_40px_rgba(0,0,0,0.5)]"
            style={{ background: "#161616" }}
          >
            <div className="flex items-center justify-between border-b border-gold/15 px-4 py-3">
              <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                WhatsApp us
              </p>
              <button
                type="button"
                onClick={dismissTeaser}
                className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Dismiss suggestions"
              >
                <X size={14} />
              </button>
            </div>
            <div className="space-y-2 p-3">
              {messageSuggestions.slice(0, 3).map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => openWhatsApp(item.text)}
                  className="group flex w-full items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-left transition-all hover:border-gold/50 hover:bg-gold"
                >
                  <span className="font-display text-[12px] font-bold uppercase tracking-wide text-white group-hover:text-black">
                    {item.label}
                  </span>
                  <ArrowRight
                    size={14}
                    className="shrink-0 text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:text-black"
                  />
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setShowTeaser(false);
                  setIsOpen(true);
                }}
                className="w-full py-2 font-body text-[11px] font-semibold text-white/70 transition-colors hover:text-white"
              >
                More options →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 flex w-[360px] max-w-[calc(100vw-32px)] flex-col overflow-hidden rounded-2xl border border-gold/25 shadow-[0_20px_50px_rgba(0,0,0,0.55)]"
            style={{ background: "#161616" }}
          >
            <div
              className="flex items-center justify-between border-b border-gold/15 p-5"
              style={{
                background: "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={NAV_LOGO}
                    alt="Orpheus Financial"
                    className="h-9 w-auto max-w-[100px] object-contain object-left brightness-110"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 animate-pulse rounded-full border border-[#161616] bg-emerald-500" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
                    Advisory Desk
                  </h4>
                  <p className="font-body text-[10px] font-semibold text-white/75">
                    Online · Reply on WhatsApp
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-white/50 transition-colors hover:bg-white/5 hover:text-white"
                aria-label="Close chat window"
              >
                <X size={16} />
              </button>
            </div>

            <div className="relative max-h-[320px] flex-1 space-y-4 overflow-y-auto p-5">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.025]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10 flex max-w-[90%] flex-col items-start">
                <span className="mb-1 ml-2 font-body text-[9px] uppercase tracking-wider text-white/40">
                  Orpheus
                </span>
                <div
                  className="rounded-2xl rounded-tl-none border border-gold/15 p-4 font-body text-[13px] font-medium leading-relaxed text-white"
                  style={{ background: "rgba(255,255,255,0.05)" }}
                >
                  Hi! Pick a quick message below or type your own — we&apos;ll open WhatsApp so you can
                  send it in one tap.
                </div>
              </div>

              <div className="relative z-10 space-y-2">
                <span className="ml-1 font-body text-[9px] uppercase tracking-wider text-white/50">
                  Suggested messages
                </span>
                {messageSuggestions.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => openWhatsApp(item.text)}
                    className="group flex w-full items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.06] px-4 py-3 text-left transition-all hover:border-gold hover:bg-gold"
                  >
                    <div className="min-w-0">
                      <span className="block font-display text-[12px] font-bold uppercase tracking-wide text-white group-hover:text-black">
                        {item.label}
                      </span>
                      <span className="mt-0.5 line-clamp-1 font-body text-[11px] text-white/75 group-hover:text-black/75">
                        {item.text}
                      </span>
                    </div>
                    <ArrowRight
                      size={16}
                      className="shrink-0 text-white/80 group-hover:translate-x-0.5 group-hover:text-black"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 border-t border-gold/15 bg-white/5 p-4">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Or type your message..."
                className="flex-1 rounded-xl border border-gold/15 bg-black/40 px-4 py-2.5 font-body text-xs text-white outline-none transition-all placeholder:text-white/40 focus:ring-1 focus:ring-gold/40"
              />
              <button
                type="button"
                onClick={handleSend}
                className="flex h-9 w-9 flex-none items-center justify-center rounded-xl text-black transition-all hover:scale-105 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                  boxShadow: "0 0 10px rgba(212,175,55,0.3)",
                }}
                aria-label="Send message to WhatsApp"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22, delay: 0.05 }}
        onClick={() => {
          setIsOpen((prev) => !prev);
          if (!isOpen) setShowTeaser(false);
        }}
        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
        style={{
          background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)",
          border: "1px solid rgba(212,175,55,0.35)",
        }}
        whileTap={{ scale: 0.94 }}
        aria-label={isOpen ? "Close WhatsApp chat" : "Open WhatsApp chat"}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
