export const successStories = [
  {
    slug: "galloexpress",
    src: "/success-stories/galloexpress.png",
    href: "https://www.galloexpress.com/",
  },
  {
    slug: "evanhomecare",
    src: "/success-stories/evanhomecare.png",
    href: "https://www.evanhomecare.com/",
  },
  {
    slug: "thefloridaclinic",
    src: "/success-stories/thefloridaclinic.png",
    href: "https://thefloridaclinicsaesthetics.com/",
  },
  {
    slug: "ez2chart",
    src: "/success-stories/ez2chart/logo.png",
    href: "https://www.ez2chart.com/",
  },
  {
    slug: "kindly-hearts",
    src: "/success-stories/kindly-hearts/og-image.png",
    href: "https://www.kindlyheartshomecare.com/",
  },
  {
    slug: "snappy-kit",
    src: "/success-stories/snappy-kit.png",
    href: "https://snappy-kit.com/",
  },
] as const;

export type SuccessStorySlug = (typeof successStories)[number]["slug"];

export function getSuccessStory(slug: string) {
  return successStories.find((s) => s.slug === slug);
}
