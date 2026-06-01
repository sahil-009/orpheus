import { cn } from "@/lib/utils";

export type LogoVariant = "light" | "dark";
export type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<LogoSize, string> = {
  sm: "h-10 max-w-[130px]",
  md: "h-14 max-w-[170px] md:h-16 md:max-w-[210px]",
  lg: "h-16 max-w-[200px] md:h-[72px] md:max-w-[260px]",
  xl: "h-20 max-w-[220px] md:h-24 md:max-w-[300px]",
};

interface BrandLogoProps {
  src: string;
  alt: string;
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  /** Light backing pad — default on dark backgrounds for colored logos */
  padded?: boolean;
}

export function BrandLogo({
  src,
  alt,
  variant = "light",
  size = "md",
  className,
  padded,
}: BrandLogoProps) {
  const onDark = variant === "dark";
  const usePad = padded ?? onDark;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        usePad &&
          "rounded-xl bg-white/[0.96] px-4 py-2.5 shadow-[0_2px_16px_rgba(0,0,0,0.14)] md:px-5 md:py-3",
        className
      )}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          sizeClasses[size],
          "w-auto object-contain object-center transition-opacity duration-300",
          usePad ? "opacity-100" : "opacity-90 hover:opacity-100"
        )}
      />
    </div>
  );
}
