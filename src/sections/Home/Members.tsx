import { AnimatedTestimonials } from "../../components/ui/animated-testimonials";
import { getLangFromUrl, useTranslations } from "../../i18n/translations";

export default function Members() {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  const testimonials = [
    {
      quote: t("members.kevin.quote"),
      name: t("members.kevin.name"),
      designation: t("members.kevin.designation"),
      src: "/members/kevin.JPEG",
    },
    {
      quote: t("members.caluff.quote"),
      name: t("members.caluff.name"),
      designation: t("members.caluff.designation"),
      src: "/members/caluff.jpeg",
    },
    {
      quote: t("members.daniel.quote"),
      name: t("members.daniel.name"),
      designation: t("members.daniel.designation"),
      src: "https://placehold.co/48",
    },
    {
      quote: t("members.james.quote"),
      name: t("members.james.name"),
      designation: t("members.james.designation"),
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote: t("members.lisa.quote"),
      name: t("members.lisa.name"),
      designation: t("members.lisa.designation"),
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
