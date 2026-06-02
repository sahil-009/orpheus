import { cn } from "@/lib/utils";

export type LogoVariant = "light" | "dark";
export type LogoSize = "sm" | "md" | "lg" | "xl";

const sizeClasses: Record<LogoSize, string> = {
  sm: "max-h-10 max-w-full",
  md: "max-h-14 max-w-full md:max-h-16",
  lg: "max-h-16 max-w-full md:max-h-[72px]",
  xl: "max-h-20 max-w-full md:max-h-24",
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
          "w-auto h-auto max-w-[75%] object-contain object-center transition-opacity duration-300",
          usePad ? "opacity-100" : "opacity-90 hover:opacity-100"
        )}
      />
    </div>
  );
}
