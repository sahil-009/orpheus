import { motion } from "framer-motion";
import { Shield, Sparkles, Network, Briefcase, Globe } from "lucide-react";

const clientDetails = [
  {
    name: "U Remit",
    src: "/uremit-removebg-preview.png",
    sector: "Fintech & Remittances",
    description: "Structuring cross-border transaction channels and treasury bank accounts across multi-currency corridors.",
    icon: Globe
  },
  {
    name: "Konsälidön",
    src: "/konsilodon-removebg-preview.png",
    sector: "Global Consulting Platform",
    description: "Setting up tax-efficient corporate holding structures and operational branches across EMEA.",
    icon: Network
  },
  {
    name: "Vantage",
    src: "/vantage-removebg-preview.png",
    sector: "Wealth Management",
    description: "Designing offshore holding structures and securing institutional private banking partnerships.",
    icon: Shield
  },
  {
    name: "Axiom",
    src: "/axiom-removebg-preview.png",
    sector: "Corporate Finance",
    description: "Advising on cross-border corporate reorganizations, SPV setups, and debt capital stack allocations.",
    icon: Briefcase
  },
  {
    name: "Meridian",
    src: "/Meridian%20Logo.gif",
    sector: "Asset Holding",
    description: "Establishing robust offshore asset-holding vehicles and private banking compliance infrastructure.",
    icon: Sparkles
  }
];

export function TrustedBySection() {
  return (
    <section className="bg-charcoal py-24 relative overflow-hidden border-t border-b border-gold/10">
      {/* Background visual graphics */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
        backgroundSize: "48px 48px"
      }} />

      {/* radial gold mesh */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(circle 500px at 50% 50%, rgba(212,175,55,0.06) 0%, transparent 80%)"
      }} />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-16">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div 
            className="inline-flex items-center gap-2 rounded-full px-3.5 py-1 mb-5"
            style={{ background: "rgba(212,175,55,0.08)", border: "1px solid rgba(212,175,55,0.25)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            <span className="font-display text-[9px] font-semibold uppercase tracking-[2px] text-[#C8A96A]">
              TRACK RECORD & CREDIBILITY
            </span>
          </div>

          <h2 className="font-display font-extrabold text-white text-[32px] md:text-[46px] leading-[1.1] tracking-tight">
            Trusted by Regulated Networks & <span className="gold-shimmer font-semibold">Global Enterprises</span>
          </h2>
          <p className="mt-4 font-body text-sm md:text-base leading-relaxed text-white/50 font-medium">
            We partner with leading remittance firms, consulting consortia, regulated corporate finance houses, and asset managers to design robust global banking setups and capital solutions.
          </p>
        </div>

        {/* Client Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          {clientDetails.map((client, idx) => {
            const Icon = client.icon;
            return (
              <motion.div
                key={client.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between"
                style={{
                  background: "rgba(20,20,20,0.65)",
                  borderColor: "rgba(212,175,55,0.12)",
                }}
                whileHover={{
                  y: -6,
                  borderColor: "rgba(212,175,55,0.45)",
                  boxShadow: "0 12px 30px rgba(212,175,55,0.18)",
                  background: "rgba(25,25,25,0.85)"
                }}
              >
                <div>
                  {/* Card Header (Logo + Icon) */}
                  <div className="flex items-center justify-between gap-4 mb-8">
                    <div className="h-10 max-w-[110px] flex items-center">
                      <img
                        src={client.src}
                        alt={`${client.name} Logo`}
                        className="h-full w-auto object-contain object-left opacity-75 group-hover:opacity-100 transition-opacity filter brightness-105"
                      />
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-gold/[0.08] text-gold flex items-center justify-center border border-gold/15 group-hover:bg-gold group-hover:text-black transition-all">
                      <Icon size={14} />
                    </div>
                  </div>

                  {/* Sector Tag */}
                  <span className="inline-block text-[9.5px] font-display font-bold uppercase tracking-wider text-gold mb-3">
                    {client.sector}
                  </span>

                  {/* Description */}
                  <p className="font-body text-[11.5px] leading-relaxed text-white/55 group-hover:text-white/80 transition-colors font-medium">
                    {client.description}
                  </p>
                </div>

                {/* Subtle bottom line accent */}
                <div className="w-0 h-[2px] bg-gradient-to-r from-gold/50 to-gold rounded-full mt-6 group-hover:w-full transition-all duration-300" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
