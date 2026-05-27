import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send } from "lucide-react";

export function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const phoneNumber = "97145587968"; // Orpheus active phone number

  const quickPrompts = [
    { label: "🌐 Offshore Structure", text: "Hello Orpheus, I'd like to inquire about setting up an offshore entity." },
    { label: "💳 Global Banking", text: "Hello Orpheus, I need assistance with corporate bank account opening." },
    { label: "📈 Debt Raising", text: "Hello Orpheus, I'd like to discuss corporate debt raising options." },
    { label: "🤝 Speak with Advisor", text: "Hello Orpheus, I'd like to schedule a call with a financial advisor." },
  ];

  const handleSend = () => {
    const finalMsg = message.trim() || "Hello Orpheus Financial, I'd like to get a free consultation.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* ── Chat Window Overlay ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[360px] max-w-[calc(100vw-32px)] overflow-hidden rounded-2xl border border-gold/25 shadow-[0_20px_50px_rgba(0,0,0,0.55)] flex flex-col"
            style={{
              background: "#161616",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Header */}
            <div 
              className="p-5 flex items-center justify-between border-b border-gold/15"
              style={{
                background: "linear-gradient(135deg, #1A1A1A 0%, #0F0F0F 100%)",
              }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://orpheusfinancial.co/wp-content/uploads/2025/03/Orpheus-Logo-1-1.png"
                    alt="Orpheus Desk"
                    className="h-10 w-10 rounded-full border border-gold/20 object-contain bg-white/5"
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border border-[#161616] animate-pulse" />
                </div>
                <div>
                  <h4 className="font-display text-sm font-bold text-white uppercase tracking-wider">
                    Orpheus Financial
                  </h4>
                  <p className="font-body text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                    Advisory Desk • Typically replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/40 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5"
                aria-label="Close chat window"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-5 flex-1 max-h-[300px] overflow-y-auto space-y-4 relative">
              {/* Grid texture background */}
              <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
                backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
                backgroundSize: "24px 24px"
              }} />

              {/* Bot Welcome Bubble */}
              <div className="flex flex-col items-start max-w-[85%] relative z-10">
                <span className="font-body text-[9px] text-white/30 mb-1 ml-2 uppercase tracking-wider">Orpheus</span>
                <div 
                  className="rounded-2xl rounded-tl-none p-4 text-white font-body text-[13px] leading-relaxed font-medium"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(212,175,55,0.15)",
                  }}
                >
                  Hello! How can we help you structure your corporate banking or capital today? Select an inquiry below or type a message.
                </div>
              </div>

              {/* Quick prompts */}
              <div className="pt-2 flex flex-col gap-2 relative z-10">
                <span className="font-body text-[9px] text-white/30 uppercase tracking-wider ml-1">Inquiry Options</span>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt.label}
                      onClick={() => setMessage(prompt.text)}
                      className="text-left px-3 py-2 rounded-xl text-[11px] font-display font-semibold transition-all hover:bg-gold hover:text-black border"
                      style={{
                        background: "rgba(212,175,55,0.07)",
                        borderColor: "rgba(212,175,55,0.22)",
                        color: "#E5CB7E",
                      }}
                    >
                      {prompt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-gold/15 bg-white/5 flex gap-2 items-center">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 bg-black/40 border border-gold/15 rounded-xl px-4 py-2.5 font-body text-xs text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-gold/40 transition-all"
              />
              <button
                onClick={handleSend}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold text-black transition-all hover:scale-105 active:scale-95 flex-none"
                style={{
                  background: "linear-gradient(135deg, #D4AF37 0%, #A88829 100%)",
                  boxShadow: "0 0 10px rgba(212,175,55,0.3)"
                }}
                aria-label="Send message to WhatsApp"
              >
                <Send size={14} className="ml-0.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Bubble Button ── */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #075E54 0%, #128C7E 100%)",
          border: "1px solid rgba(212,175,55,0.35)",
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Toggle live chat"
      >
        {/* Pulsing ring indicator */}
        <span className="absolute inset-0 rounded-full border border-gold/30 animate-ping opacity-60" style={{ animationDuration: "2.5s" }} />
        
        {/* Toggle icon */}
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 45, opacity: 0 }} transition={{ duration: 0.18 }}>
              <X size={22} className="text-white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 45, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -45, opacity: 0 }} transition={{ duration: 0.18 }}>
              <MessageSquare size={22} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
