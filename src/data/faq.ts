export const faqIds = [
  "pricing",
  "timeline",
  "ownership",
  "hosting",
  "maintenance",
  "languages",
] as const;

export type FaqId = (typeof faqIds)[number];
