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
      "Independent advisory on asset allocation, institutional due diligence, and investment strategy — aligned to risk tolerance, liquidity mandates, and long-term capital preservation.",
    icon: LineChart,
  },
  {
    slug: "financial-structuring",
    title: "Financial Structuring",
    summary:
      "Design structured holding companies, SPVs, and investment fund vehicles that optimize tax, governance, and global banking access.",
    icon: Briefcase,
  },
  {
    slug: "capital-raising-support",
    title: "Capital Raising Support",
    summary:
      "End-to-end advisory for corporate debt and equity transactions — from financial modeling and information memorandums to institutional investor matchmaking and transaction close.",
    icon: TrendingUp,
  },
  {
    slug: "cross-border-advisory",
    title: "Cross-Border Advisory",
    summary:
      "Navigate regulatory compliance, cross-border tax treaties, and operational setups for financial firms and businesses expanding across global hubs.",
    icon: Globe2,
  },
  {
    slug: "transaction-support",
    title: "Transaction Support",
    summary:
      "Strategic execution of M&A, asset divestitures, and corporate transactions — coordinating due diligence, documentation, and stakeholder alignment.",
    icon: Handshake,
  },
  {
    slug: "strategic-business-consulting",
    title: "Strategic Business Consulting",
    summary:
      "Board-level counsel on growth strategy, regulatory market entry, joint ventures, and capital priorities for corporations and financial institutions.",
    icon: Lightbulb,
  },
];

/** Contact form & footer labels */
export const ADVISORY_SERVICE_NAMES = ADVISORY_SERVICES.map((s) => s.title);
