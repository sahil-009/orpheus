import { useMemo } from "react";

interface Props {
  count?: number;
  /** dot color — use rgba for transparency */
  color?: string;
  /** ring/outline color */
  ringColor?: string;
}

interface Dot {
  id: number;
  left: number;     // % across section
  top: number;      // % down section (start position)
  size: number;     // px
  delay: number;    // s
  dur: number;      // s float duration
  swayDur: number;  // s sway duration
  swayDelay: number;
  opacity: number;
  kind: "dot" | "ring" | "diamond";
}

/* deterministic spread via golden-ratio indexing so values are
   stable across re-renders without needing seeded RNG          */
function gen(count: number): Dot[] {
  const φ = 0.6180339887; // 1/golden-ratio
  return Array.from({ length: count }, (_, i) => {
    const a = (i * φ) % 1;
    const b = (i * φ * 1.3 + 0.17) % 1;
    const c = (i * φ * 0.7 + 0.42) % 1;
    const d = (i * φ * 1.7 + 0.08) % 1;
    return {
      id: i,
      left:      a * 94 + 3,           // 3–97 %
      top:       b * 94 + 3,           // 3–97 %
      size:      c * 6  + 2,           // 2–8 px
      delay:     d * 3.5,              // 0–3.5 s (was 7)
      dur:       a * 1.6 + 1.4,        // 1.4–3 s (was 3–7)
      swayDur:   b * 1.4 + 1.1,        // 1.1–2.5 s (was 2.5–5.5)
      swayDelay: c * 2,                // 0–2 s
      opacity:   d * 0.32 + 0.10,      // 0.10–0.42 (was 0.06–0.28)
      kind:      (["dot", "ring", "dot", "diamond"] as Dot["kind"][])[i % 4],
    };
  });
}

export function FloatingParticles({
  count = 50,
  color    = "rgba(212,175,55,0.55)",
  ringColor = "rgba(212,175,55,0.35)",
}: Props) {
  return null;
}
