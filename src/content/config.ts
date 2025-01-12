import { defineCollection, z } from "astro:content";

const templatesCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      "en-description": z.string(),
      "es-description": z.string(),
      description: z.string(),
      image: image(),
      link: z.string().url(),
      code: z.string().url().optional(),
      "en-category": z.enum([
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
      "es-category": z.enum([
        "Blog",
        "Portafolio",
        "Landing",
        "Negocios",
        "Documentación",
        "Personal",
        "Agencia",
        "Restaurante",
        "Educación",
        "Otro",
      ]),
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
