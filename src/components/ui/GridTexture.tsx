interface Props {
  className?: string;
  variant?: "dark" | "light";
}
export function GridTexture({ className = "", variant = "dark" }: Props) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 ${variant === "dark" ? "grid-texture" : "grid-texture-light"} ${className}`}
    />
  );
}
