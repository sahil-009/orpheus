import { BrandLogo, type LogoVariant } from "@/components/ui/BrandLogo";
import { CLIENT_LOGOS } from "@/data/clientLogos";

type Variant = LogoVariant;

interface Props {
  variant?: Variant;
  className?: string;
  label?: string;
}

/** Static row — hero “Trusted by businesses across 18 markets”. */
export function ClientLogosBar({
  variant = "dark",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-12 ${className}`}
    >
      {CLIENT_LOGOS.map((logo) => (
        <BrandLogo
          key={logo.name}
          src={logo.src}
          alt={logo.name}
          variant={variant}
          size="md"
        />
      ))}
    </div>
  );
}

/** CSS-driven marquee — no GSAP loop for better performance. */
export function ClientLogosMarquee({
  variant = "light",
  className = "",
  label = "Trusted by leading businesses & institutions",
}: Props) {
  const fade = variant === "light" ? "#F3F5F8" : "#1D1C1C";
  const items = [...CLIENT_LOGOS, ...CLIENT_LOGOS];

  return (
    <div className={`relative ${className}`}>
      <p
        className={`type-eyebrow mb-8 text-center ${
          variant === "light" ? "text-charcoal/55" : "text-white/50"
        }`}
      >
        {label}
      </p>

      <div className="overflow-hidden py-3">
        <div className="client-logos-track flex w-max items-center gap-4 md:gap-6">
          {items.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center px-4 md:px-8"
            >
              <BrandLogo
                src={logo.src}
                alt={logo.name}
                variant={variant}
                size="lg"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-28"
        style={{ background: `linear-gradient(to right, ${fade}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-28"
        style={{ background: `linear-gradient(to left, ${fade}, transparent)` }}
      />
    </div>
  );
}
