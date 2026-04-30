export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string; initials: string };
  body: { heading: string; paragraphs: string[] }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "bvi-vs-seychelles-2024",
    title: "BVI vs Seychelles: Navigating the 2024 Regulatory Shift",
    excerpt: "An in-depth comparative analysis of jurisdiction transparency, economic substance requirements, and tax treaty advantages in the current fiscal landscape.",
    category: "OFFSHORE STRATEGY",
    date: "March 18, 2026",
    readTime: "7 min read",
    author: { name: "Julian Vane", role: "CHIEF STRATEGIST", initials: "JV" },
    body: [
      {
        heading: "The 2024 Regulatory Shift",
        paragraphs: [
          "Understanding the differences in economic substance requirements between the BVI and Seychelles is critical for maintaining compliance in 2024.",
        ],
      },
    ],
  },
  {
    slug: "corporate-banking-dubai-guide",
    title: "Opening a Corporate Bank Account in Dubai: A Practical Guide",
    excerpt: "What banks actually look at, common reasons applications get rejected, and how to structure your KYC pack for a smooth approval.",
    category: "Banking",
    date: "March 4, 2026",
    readTime: "9 min read",
    author: { name: "Rachit Yadav", role: "Founder & CEO", initials: "RY" },
    body: [
      { heading: "What banks actually evaluate", paragraphs: ["Banks look beyond your business plan. They evaluate the source of funds, the underlying activity, the residency of UBOs, and the operational substance of the entity."] },
      { heading: "Common rejection reasons", paragraphs: ["Vague business descriptions, missing UBO documentation, unverifiable transaction patterns, and high-risk industries are the most common reasons accounts get declined."] },
    ],
  },
  {
    slug: "debt-raising-for-founders",
    title: "Debt Raising for Founders: When It Beats Equity",
    excerpt: "Equity isn't always the answer. Here's a framework for deciding when raising debt is the more sensible path for your business.",
    category: "Capital",
    date: "February 21, 2026",
    readTime: "6 min read",
    author: { name: "Rachit Yadav", role: "Founder & CEO", initials: "RY" },
    body: [
      { heading: "When to consider debt", paragraphs: ["If your business has predictable cash flows and you want to preserve ownership, debt is almost always the right answer."] },
    ],
  },
  {
    slug: "bvi-vs-cayman-2026",
    title: "BVI vs Cayman: Choosing the Right Holding Jurisdiction",
    excerpt: "Both are credible. The right choice depends on what you're holding, who your investors are, and where you want to bank.",
    category: "Offshore",
    date: "February 7, 2026",
    readTime: "8 min read",
    author: { name: "Rachit Yadav", role: "Founder & CEO", initials: "RY" },
    body: [{ heading: "Quick comparison", paragraphs: ["Cayman tends to win for funds and PE structures; BVI for asset protection and simpler holding structures."] }],
  },
  {
    slug: "family-office-structuring",
    title: "Structuring a Modern Family Office Across Jurisdictions",
    excerpt: "How multi-generational families are using UAE, Singapore, and the Channel Islands to structure for the next 50 years.",
    category: "Family Office",
    date: "January 24, 2026",
    readTime: "11 min read",
    author: { name: "Rachit Yadav", role: "Founder & CEO", initials: "RY" },
    body: [{ heading: "Three pillars", paragraphs: ["Modern family offices balance privacy, succession planning, and operational flexibility — usually across three jurisdictions."] }],
  },
  {
    slug: "compliance-without-pain",
    title: "Compliance Without the Pain: A Founder's Playbook",
    excerpt: "Compliance doesn't have to slow you down. Here's how to build it into your operations from day one.",
    category: "Compliance",
    date: "January 10, 2026",
    readTime: "5 min read",
    author: { name: "Rachit Yadav", role: "Founder & CEO", initials: "RY" },
    body: [{ heading: "Build it in", paragraphs: ["Treat compliance as infrastructure, not an afterthought. The cost is lower and the speed higher."] }],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
