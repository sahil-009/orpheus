import { ButtonHTMLAttributes, ReactNode, forwardRef } from "react";
import { Magnetic } from "@/components/interactive/Magnetic";

type Variant =
  | "gold"
  | "ghost-light"
  | "ghost-dark"
  | "white"
  | "outline-gold"
  | "outline-sky"
  | "sky";

interface OBProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
  magnetic?: boolean;
  fullWidth?: boolean;
}

const variants: Record<Variant, string> = {
  gold:
    "bg-gold text-charcoal hover:bg-gold-light shadow-[0_8px_28px_rgba(67,97,238,0.38)] font-semibold",
  white:
    "bg-white text-charcoal hover:bg-gold-ultra shadow-[0_4px_16px_rgba(0,0,0,0.12)]",
  "ghost-light":
    "bg-transparent text-white border border-white/25 hover:border-gold hover:text-gold hover:bg-gold/[0.06]",
  "ghost-dark":
    "bg-transparent text-charcoal border border-gold/35 hover:border-gold hover:bg-gold/[0.07]",
  "outline-gold":
    "bg-transparent text-gold border border-gold/40 hover:bg-gold hover:text-charcoal",
  "outline-sky":
    "bg-transparent text-gold border border-gold/40 hover:bg-gold hover:text-charcoal",
  sky:
    "bg-gold text-charcoal hover:bg-gold-light shadow-[0_8px_28px_rgba(67,97,238,0.35)] font-semibold",
};

export const OButton = forwardRef<HTMLButtonElement, OBProps>(
  ({ variant = "gold", children, magnetic = true, fullWidth, className = "", ...rest }, ref) => {
    const btn = (
      <button
        ref={ref}
        className={`group relative inline-flex items-center justify-center gap-2 rounded-lg px-7 py-3.5 font-body font-medium text-[13px] tracking-wide transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
    return magnetic ? <Magnetic strength={0.3}>{btn}</Magnetic> : btn;
  }
);
OButton.displayName = "OButton";
