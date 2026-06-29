import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqIds } from "../../data/faq";
import { useTranslations } from "../../i18n/translations";

export default function Faq({ lang }: { lang: "en" | "es" }) {
  const t = useTranslations(lang);
  const [open, setOpen] = useState<string | null>(faqIds[0]);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 id="faq-title" className="section-title">
            {t("faq.title")}
          </h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            {t("faq.subtitle")}
          </p>
        </div>

        <div className="space-y-4">
          {faqIds.map((id) => {
            const isOpen = open === id;
            return (
              <div
                key={id}
                className="rounded-xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm overflow-hidden"
              >
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${id}`}
                    id={`faq-trigger-${id}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold text-foreground">
                      {t(`faq.${id}.question`)}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-orange-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-panel-${id}`}
                      role="region"
                      aria-labelledby={`faq-trigger-${id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-slate-600 dark:text-slate-300">
                        {t(`faq.${id}.answer`)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
