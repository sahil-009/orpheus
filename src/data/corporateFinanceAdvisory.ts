import { ADVISORY_SERVICES } from "./advisoryServices";

export const CORPORATE_FINANCE_ADVISORY = {
  title: "Corporate Finance & Strategic Advisory",
  shortTitle: "Corporate Finance & Advisory",
  /** Full copy for the services page detail block */
  description:
    "Partner-level advisory for founders, family offices, and international businesses making high-stakes capital and structuring decisions. We bring discipline to investment strategy, transaction design, and cross-border execution — so your structure, funding, and growth plans stay aligned, compliant, and commercially sound.",
  /** Shorter copy for homepage service cards */
  cardSummary:
    "Partner-level guidance across investment strategy, financial structuring, capital raising, and cross-border transactions — tailored to your growth stage, risk profile, and long-term objectives.",
  capabilities: ADVISORY_SERVICES.map((s) => s.title),
};
