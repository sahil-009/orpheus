import { CLIENT_LOGOS } from "@/data/clientLogos";

type Variant = "light" | "dark";

interface Props {
  variant?: Variant;
  className?: string;
  label?: string;
}

function LogoImage({
  name,
  src,
  variant,
  className = "",
}: {
  name: string;
  src: string;
  variant: Variant;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      decoding="async"
      width={160}
      height={48}
      className={`h-8 md:h-10 w-auto max-w-[130px] md:max-w-[150px] object-contain object-center transition-opacity duration-300 hover:opacity-100 ${className} ${
        variant === "light"
          ? "opacity-65"
          : "opacity-75"
      }`}
    />
  );
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
      className={`flex flex-wrap items-center justify-center gap-x-8 gap-y-6 md:gap-x-12 lg:gap-x-14 ${className}`}
    >
      {CLIENT_LOGOS.map((logo) => (
        <LogoImage key={logo.name} {...logo} variant={variant} />
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
        className={`text-center font-body text-[11px] uppercase tracking-[2.5px] font-semibold mb-8 ${
          variant === "light" ? "text-[#1D1C1C]/50" : "text-white/45"
        }`}
      >
        {label}
      </p>

      <div className="overflow-hidden py-2">
        <div className="client-logos-track flex w-max items-center gap-2">
          {items.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 items-center px-6 md:px-10"
            >
              <LogoImage {...logo} variant={variant} className="max-w-[120px] md:max-w-[140px]" />
            </div>
          ))}
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24"
        style={{ background: `linear-gradient(to right, ${fade}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24"
        style={{ background: `linear-gradient(to left, ${fade}, transparent)` }}
      />
    </div>
  );
}
