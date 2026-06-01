import { motion } from "framer-motion";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { BANKING_PARTNERS } from "@/data/bankingPartners";

export function BankingPartners() {
  return (
    <section className="relative overflow-hidden border-b border-t border-gold/10 bg-[#121212] py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle 500px at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 80%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1440px] px-6 md:px-16">
        <div className="mb-14 text-center">
          <p className="type-eyebrow mb-3 text-gold/85">Institutional Network</p>
          <h2 className="type-section-title text-white">We Work Closely With</h2>
        </div>

        <div className="grid grid-cols-2 items-stretch justify-items-center gap-5 md:grid-cols-3 md:gap-6 lg:grid-cols-6">
          {BANKING_PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.07 }}
              className="flex w-full min-h-[100px] cursor-default select-none items-center justify-center rounded-xl px-3 py-5 transition-all duration-300 md:min-h-[112px]"
              style={{
                background: "rgba(20,20,20,0.5)",
                border: "1px solid rgba(212,175,55,0.08)",
              }}
              whileHover={{
                y: -4,
                background: "rgba(25,25,25,0.8)",
                borderColor: "rgba(212,175,55,0.28)",
                boxShadow: "0 10px 28px rgba(212,175,55,0.08)",
              }}
            >
              <BrandLogo
                src={partner.src}
                alt={`${partner.name} logo`}
                variant="dark"
                size="md"
                className="w-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
