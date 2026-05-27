import { ADVISORY_SERVICES } from "./advisoryServices";

export const CORPORATE_FINANCE_ADVISORY = {
  title: "Corporate Finance & Strategic Advisory",
  shortTitle: "Corporate Finance & Advisory",
  /** Full copy for the services page detail block */
  description:
    "Partner-level advisory for financial institutions, investment funds, family offices, and corporate enterprises making high-stakes capital and structuring decisions. We bring institutional discipline to investment strategy, transaction design, and cross-border execution — ensuring your corporate structures, capital allocations, and expansion plans are compliant and commercially sound.",
  /** Shorter copy for homepage service cards */
  cardSummary:
    "Partner-level advisory across corporate structuring, transaction design, capital allocation, and cross-border setups for financial institutions, investment funds, and enterprises.",
  capabilities: ADVISORY_SERVICES.map((s) => s.title),
};
