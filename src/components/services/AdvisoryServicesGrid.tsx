import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ADVISORY_SERVICES } from "@/data/advisoryServices";

type Variant = "light" | "dark";

interface Props {
  variant?: Variant;
  showHeading?: boolean;
  className?: string;
}

export function AdvisoryServicesGrid({
  variant = "light",
  showHeading = true,
  className = "",
}: Props) {
  const isDark = variant === "dark";

  return (
    <div className={className}>
      {showHeading && (
        <div className="max-w-2xl mb-10 md:mb-12">
          <p
            className={`font-display text-[11px] font-semibold uppercase tracking-[3px] ${
              isDark ? "text-gold" : ""
            }`}
            style={isDark ? undefined : { color: "#D4AF37" }}
          >
            Specialized Advisory
          </p>
          <h3
            className={`mt-3 font-display font-extrabold leading-[1.1] ${
              isDark ? "text-white" : "text-[#1D1C1C]"
            }`}
            style={{ fontSize: "clamp(24px, 3vw, 36px)", letterSpacing: "-0.02em" }}
          >
            Core advisory services
          </h3>
          <p
            className={`mt-3 font-body text-[15px] leading-relaxed font-bold ${
              isDark ? "text-white/55" : ""
            }`}
            style={isDark ? undefined : { color: "rgba(29,28,28,0.65)" }}
          >
            Delivered standalone or as part of our Corporate Finance & Strategic Advisory practice.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ADVISORY_SERVICES.map((service) => {
          const Icon = service.icon;
          return (
            <Link
              key={service.slug}
              to={`/services#${service.slug}`}
              id={service.slug}
              className={`group scroll-mt-28 flex flex-col rounded-2xl p-6 transition-all hover:-translate-y-1 ${
                isDark
                  ? "border border-gold/20 bg-white/[0.04] hover:border-gold/35"
                  : "border border-gold/18 bg-white hover:shadow-[0_16px_40px_rgba(29,28,28,0.06)]"
              }`}
              style={
                isDark
                  ? undefined
                  : { boxShadow: "0 8px 24px rgba(29,28,28,0.03)" }
              }
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl mb-5 transition-colors group-hover:bg-gold group-hover:text-white"
                style={{
                  background: isDark ? "rgba(212,175,55,0.12)" : "rgba(212,175,55,0.08)",
                  color: "#D4AF37",
                }}
              >
                <Icon size={20} />
              </div>
              <h4
                className={`font-display font-bold text-[17px] leading-snug ${
                  isDark ? "text-white" : "text-[#1D1C1C]"
                }`}
              >
                {service.title}
              </h4>
              <p
                className={`mt-2.5 flex-1 font-body text-[13px] leading-[1.75] font-semibold ${
                  isDark ? "text-white/55" : ""
                }`}
                style={isDark ? undefined : { color: "rgba(29,28,28,0.62)" }}
              >
                {service.summary}
              </p>
              <span
                className="mt-5 inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-[2px] font-semibold text-gold group-hover:gap-2.5 transition-all"
              >
                Learn more <ArrowUpRight size={12} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
