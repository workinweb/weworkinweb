import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonials";
import { useTranslations } from "../../i18n/translations";

export default function Testimonials({ lang }: { lang: "en" | "es" }) {
  const t = useTranslations(lang);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="py-20 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <h2 id="testimonials-title" className="section-title">
            {t("testimonials.title")}
          </h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            {t("testimonials.subtitle")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.figure
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex h-full flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 p-8 shadow-sm"
            >
              <Quote
                aria-hidden="true"
                className="absolute right-6 top-6 h-8 w-8 text-orange-500/15"
              />
              <div
                className="mb-4 flex gap-1"
                aria-label={`${item.rating} / 5`}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < item.rating
                        ? "fill-orange-400 text-orange-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                ))}
              </div>

              <blockquote className="flex-1 text-foreground leading-relaxed">
                “{t(`testimonials.${item.id}.quote`)}”
              </blockquote>

              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={item.src}
                  alt=""
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="h-12 w-12 rounded-full object-cover bg-white ring-1 ring-slate-200 dark:ring-slate-700"
                />
                <span>
                  <span className="block font-semibold text-foreground">
                    {t(`testimonials.${item.id}.name`)}
                  </span>
                  <span className="block text-sm text-slate-500 dark:text-slate-400">
                    {t(`testimonials.${item.id}.company`)}
                  </span>
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
