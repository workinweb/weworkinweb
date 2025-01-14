import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Rocket, Zap, Building2, Clock } from "lucide-react";
import { getLangFromUrl, useTranslations } from "../../i18n/translations";

const journeyStages = [
  {
    id: "basic",
    icon: <Rocket className="w-8 h-8" />,
    price: {
      // withDesign: "1,199",
      // providedDesign: "899",
      withDesign: "x,xxx",
      providedDesign: "x,xxx",
    },
    style: {
      height: "350px",
      width: "350px",
    },
    lottie:
      "https://lottie.host/21b104f4-9720-4630-9653-e551329d0eec/BCO3cj1I1k.json",
  },
  {
    id: "growth",
    icon: <Zap className="w-8 h-8" />,
    price: {
      // providedDesign: "1,399",
      // withDesign: "1,699",
      providedDesign: "x,xxx",
      withDesign: "x,xxx",
    },
    style: {
      height: { md: "400px", default: "450px" },
      width: { md: "400px", default: "450px" },
    },
    lottie:
      "https://lottie.host/e6e61e65-9928-4491-9024-83ea3d8277d3/SBpHNXbJzR.json ",
  },
  {
    id: "custom",
    icon: <Building2 className="w-8 h-8" />,
    price: {
      withDesign: "Custom",
      providedDesign: "Custom",
    },
    lottie:
      "https://lottie.host/49345e90-9a9a-4f64-a793-c92114a6e092/L1FzpS7B7A.json",
    style: {
      height: "350px",
      width: "350px",
    },
  },
];

export default function WebDevJourneyPricing() {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);
  const [selectedStage, setSelectedStage] = useState(journeyStages[0].id);
  const [showWithDesign, setShowWithDesign] = useState(false);

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 id="pricing-title" className="section-title">
            {t("pricing.title")}
          </h2>
          <p className="text-foreground text-xl mb-8">
            {t("pricing.subtitle")}
          </p>

          <div
            role="radiogroup"
            aria-label={t("pricing.designToggle.label")}
            className="inline-flex rounded-xl bg-white dark:bg-slate-800 p-1 shadow-lg"
          >
            <button
              role="radio"
              aria-checked={!showWithDesign}
              onClick={() => setShowWithDesign(false)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  !showWithDesign
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-orange-500"
                }`}
            >
              {t("pricing.designToggle.own")}
            </button>
            <button
              onClick={() => setShowWithDesign(true)}
              className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300
                ${
                  showWithDesign
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md"
                    : "text-slate-600 dark:text-slate-300 hover:text-orange-500"
                }`}
            >
              {t("pricing.designToggle.need")}
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {journeyStages.map((stage) => (
            <motion.button
              key={stage.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-card cursor-pointer p-6 ${
                selectedStage === stage.id
                  ? "border-orange-500/50 dark:border-orange-500/50 text-left"
                  : "text-left"
              }`}
              onClick={() => setSelectedStage(stage.id)}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`mr-4 p-2 rounded-full ${
                    selectedStage === stage.id
                      ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                      : "bg-secondary dark:bg-slate-800 text-foreground dark:text-slate-300"
                  }`}
                >
                  {stage.icon}
                </div>
                <h3 className="text-2xl font-semibold text-foreground dark:text-slate-100">
                  {t(`pricing.${stage.id}.name`)}
                </h3>
              </div>
              <p className="text-foreground dark:text-slate-300 mb-2">
                {t(`pricing.${stage.id}.description`)}
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={showWithDesign ? "withDesign" : "providedDesign"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="text-3xl font-bold text-orange-500 dark:text-orange-400"
                >
                  {stage.price.withDesign === "Custom" ? (
                    t("pricing.custom.notes")[0]
                  ) : (
                    <>
                      {t("pricing.from")}
                      {showWithDesign
                        ? stage.price.withDesign
                        : stage.price.providedDesign}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-6 md:p-8 relative"
          >
            {journeyStages.map(
              (stage) =>
                stage.id === selectedStage && (
                  <div key={stage.id} className="md:grid md:grid-cols-2 gap-8 ">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground dark:text-slate-100 mb-4">
                        {t(`pricing.${stage.id}.name`)}
                      </h3>
                      <ul className="space-y-3">
                        {t(`pricing.${stage.id}.features`).map(
                          (feature: string, index: number) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center text-foreground dark:text-slate-300"
                            >
                              <svg
                                className="w-5 h-5 text-orange-500 dark:text-orange-400 mr-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {feature}
                            </motion.li>
                          )
                        )}
                      </ul>
                      <div className="mt-6 p-4 bg-orange-100 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-400">
                          {t("pricing.notes.title")}
                        </h4>
                        <ul className="space-y-2">
                          {t(`pricing.${stage.id}.notes`).map(
                            (note: string, index: number) => (
                              <li
                                key={index}
                                className="text-sm text-foreground dark:text-orange-200"
                              >
                                • {note}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Player
                        autoplay
                        loop
                        src={stage.lottie}
                        style={{ ...stage.style }}
                      />
                    </div>
                  </div>
                )
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-end mt-4">
          <div className="flex items-center gap-2 text-sm text-orange-600 dark:text-orange-400">
            <Clock className="w-4 h-4" />
            <p>{t("pricing.note")}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
