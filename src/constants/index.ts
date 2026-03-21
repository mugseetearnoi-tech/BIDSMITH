import { Bid, PricingTier, Invoice } from "@/types";

export * from "./liveTracking";
export * from "./qualityMetrics";
export * from "./competitors";
export * from "./team";

export const MOCK_BIDS: Bid[] = [];

export const PRICING_TIERS: PricingTier[] = [
  {
    id: "standard",
    name: "Standard Bidder",
    description: "Essential tools for emerging bid teams",
    monthlyPrice: 499,
    annualPrice: 4990,
    features: [
      "Up to 15 active bids",
      "Doccute PDF processing",
      "Basic compliance scoring",
      "Email support",
      "Standard templates",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise OS",
    description: "Complete intelligence platform for serious bidders",
    monthlyPrice: 1299,
    annualPrice: 12990,
    recommended: true,
    features: [
      "Unlimited active bids",
      "Advanced AI predictive scoring",
      "Full PPN 06/20 compliance engine",
      "Zero-hallucination vector search",
      "Priority support (24/7)",
      "Custom integrations",
      "Team collaboration tools",
      "Advanced analytics dashboard",
    ],
  },
  {
    id: "custom",
    name: "Custom Enterprise",
    description: "Tailored solutions for large organisations",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Everything in Enterprise OS",
      "Dedicated account manager",
      "Custom AI model training",
      "White-label options",
      "On-premise deployment available",
      "Custom SLA agreements",
      "Bespoke feature development",
    ],
  },
];

export const MOCK_INVOICES: Invoice[] = [];

export const FEATURE_HIGHLIGHTS = [
  {
    title: "Predictive Scoring",
    description: "AI-powered win probability analysis trained on 10,000+ UK public sector contracts",
    icon: "brain",
  },
  {
    title: "Doccute PDF Pipeline",
    description: "Intelligent document chunking and extraction with zero hallucination guarantees",
    icon: "file-check",
  },
  {
    title: "PPN 06/20 Compliance",
    description: "Automated compliance verification against UK procurement policy notes",
    icon: "shield-check",
  },
];
