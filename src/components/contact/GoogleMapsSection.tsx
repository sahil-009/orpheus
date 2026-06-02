import { ExternalLink, MapPin } from "lucide-react";
import { GOOGLE_MAPS_EMBED_URL, GOOGLE_MAPS_URL, OFFICE_ADDRESS } from "@/data/siteLinks";
import { OButton } from "@/components/ui/OButton";

type Variant = "light" | "dark";

export function GoogleMapsSection({ variant = "light" }: { variant?: Variant }) {
  const isDark = variant === "dark";

  return (
    <section
      className={`relative overflow-hidden py-20 md:py-28 ${isDark ? "bg-[#1D1C1C] text-white" : "bg-[#F3F5F8] text-[#1D1C1C]"}`}
    >
      {isDark && (
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{
          backgroundImage:
            "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }} />
      )}

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[3px] text-gold">
            Google Maps
          </p>
          <h2
            className="mt-4 font-display font-extrabold leading-[1.08]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", letterSpacing: "-0.03em" }}
          >
            Visit Our Dubai Office
          </h2>
          <p
            className={`type-prose-body mx-auto mt-4 max-w-lg ${isDark ? "!text-white/70" : ""}`}
          >
            {OFFICE_ADDRESS}
          </p>
        </div>

        <div
          className={`mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border shadow-[0_24px_64px_rgba(0,0,0,0.12)] ${
            isDark ? "border-gold/20 bg-black/30" : "border-gold/18 bg-white"
          }`}
        >
          <iframe
            title="Orpheus Financial on Google Maps"
            src={GOOGLE_MAPS_EMBED_URL}
            className="block h-[min(420px,55vh)] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-body text-[15px] font-semibold text-gold transition-colors hover:text-[#E5CB7E]"
          >
            <MapPin size={16} />
            Open in Google Maps
            <ExternalLink size={14} />
          </a>
          <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer">
            <OButton variant={isDark ? "ghost-light" : "gold"}>
              Get directions
            </OButton>
          </a>
        </div>
      </div>
    </section>
  );
}
