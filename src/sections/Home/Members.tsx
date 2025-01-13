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
  ];

  return (
    <div className="bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <AnimatedTestimonials testimonials={testimonials} />
    </div>
  );
}
