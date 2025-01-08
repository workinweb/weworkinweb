import { defineCollection, z } from "astro:content";

const templatesCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      image: image(),
      link: z.string().url(),
      code: z.string().url().optional(),
      category: z.enum([
        "Blog",
        "Portfolio",
        "Landing",
        "Business",
        "Documentation",
        "Personal",
        "Agency",
        "Restaurant",
        "Education",
        "Other",
      ]),
    }),
});

export const collections = {
  templates: templatesCollection,
};
