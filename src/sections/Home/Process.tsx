import { useTranslations } from "../../i18n/translations";

const steps = ["call", "design", "build", "ship"] as const;

export default function Process({ lang }: { lang: "en" | "es" }) {
  const t = useTranslations(lang);

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className="py-20 bg-white dark:bg-slate-950"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 items-start">
          <div>
            <h2 id="process-title" className="section-title text-left mb-4">
              {t("process.title")}
            </h2>
            <p className="text-foreground text-lg">{t("process.subtitle")}</p>
          </div>

          <ol className="divide-y divide-slate-200 dark:divide-slate-800">
            {steps.map((step) => (
              <li key={step} className="py-7 first:pt-0 last:pb-0">
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {t(`process.${step}.title`)}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {t(`process.${step}.description`)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
