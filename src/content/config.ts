import { defineCollection, z } from "astro:content";

const templatesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    image: z.string(),
    link: z.string().url(),
    code: z.string().url().optional(),
    category: z.enum(["Restaurant", "Product", "Service", "Gallery"]),
  }),
});

export const collections = {
  templates: templatesCollection,
};
