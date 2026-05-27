import { motion } from "framer-motion";

const PARTNERS = [
  { name: "First Abu Dhabi Bank", src: "/bank-logo-1.png" },
  { name: "Abu Dhabi Commercial Bank", src: "/bank-logo-2.png" },
  { name: "Dubai Islamic Bank", src: "/bank-logo-3.png" },
  { name: "RAKBANK", src: "/bank-logo-4.png" },
  { name: "Mashreq", src: "/bank-logo-5.png" },
  { name: "Emirates NBD", src: "/bank-logo-6.png" },
];

export function BankingPartners() {
  return (
    <section className="relative overflow-hidden bg-[#121212] py-16 border-t border-b border-gold/10">
      {/* Background grid texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "64px 64px"
      }} />
      
      {/* Subtle gold center radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle 500px at 50% 50%, rgba(212,175,55,0.03) 0%, transparent 80%)"
      }} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-16">
        {/* Centered section header */}
        <div className="text-center mb-12">
          <p className="font-display text-[10px] font-semibold uppercase tracking-[3px] text-gold/80 mb-2">
            Institutional Network
          </p>
          <h2 className="font-display font-extrabold text-white text-[22px] md:text-[26px] leading-tight tracking-tight">
            We Work Closely With
          </h2>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center">
          {PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="flex items-center justify-center w-full h-20 px-6 py-4 rounded-xl transition-all duration-300 cursor-default select-none"
              style={{
                background: "rgba(20,20,20,0.4)",
                border: "1px solid rgba(212,175,55,0.05)",
              }}
              whileHover={{
                y: -4,
                background: "rgba(25,25,25,0.75)",
                borderColor: "rgba(212,175,55,0.30)",
                boxShadow: "0 8px 24px rgba(212,175,55,0.06)",
              }}
            >
              <img
                src={partner.src}
                alt={`${partner.name} Logo`}
                className="max-h-9 md:max-h-11 max-w-full w-auto object-contain opacity-65 hover:opacity-100 transition-all duration-300 filter brightness-105 contrast-[1.05]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
