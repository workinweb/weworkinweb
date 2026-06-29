export const testimonials = [
  { id: "evanhomecare", rating: 5, src: "/success-stories/evanhomecare.png" },
  {
    id: "thefloridaclinic",
    rating: 5,
    src: "/success-stories/thefloridaclinic.png",
  },
  {
    id: "kindly-hearts",
    rating: 5,
    src: "/success-stories/kindly-hearts/og-image.png",
  },
] as const;

export type TestimonialId = (typeof testimonials)[number]["id"];
