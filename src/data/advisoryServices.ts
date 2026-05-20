import {
  LineChart,
  Briefcase,
  TrendingUp,
  Globe2,
  Handshake,
  Lightbulb,
  type LucideIcon,
} from "lucide-react";

export type AdvisoryService = {
  slug: string;
  title: string;
  summary: string;
  icon: LucideIcon;
};

export const ADVISORY_SERVICES: AdvisoryService[] = [
  {
    slug: "investment-consulting",
    title: "Investment Consulting",
    summary:
      "Independent guidance on allocation, due diligence, and investment strategy — aligned to your risk tolerance, liquidity needs, and long-term objectives.",
    icon: LineChart,
  },
  {
    slug: "financial-structuring",
    title: "Financial Structuring",
    summary:
      "Design holding companies, SPVs, and capital stacks that optimise tax, governance, and banking access across multiple jurisdictions.",
    icon: Briefcase,
  },
  {
    slug: "capital-raising-support",
    title: "Capital Raising Support",
    summary:
      "End-to-end support for equity and debt raises — from narrative and financial models to investor outreach, term sheets, and close.",
    icon: TrendingUp,
  },
  {
    slug: "cross-border-advisory",
    title: "Cross-Border Advisory",
    summary:
      "Navigate regulatory, tax, and operational complexity when expanding, relocating, or operating across UAE, Europe, Asia, and offshore markets.",
    icon: Globe2,
  },
  {
    slug: "transaction-support",
    title: "Transaction Support",
    summary:
      "Practical support on M&A, divestitures, and strategic deals — coordination, documentation, timelines, and stakeholder alignment through execution.",
    icon: Handshake,
  },
  {
    slug: "strategic-business-consulting",
    title: "Strategic Business Consulting",
    summary:
      "Board-level counsel on growth strategy, market entry, partnerships, and capital priorities — with clear, actionable recommendations.",
    icon: Lightbulb,
  },
];

/** Contact form & footer labels */
export const ADVISORY_SERVICE_NAMES = ADVISORY_SERVICES.map((s) => s.title);
