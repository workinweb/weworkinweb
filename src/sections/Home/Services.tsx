import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import GlassCard from "../../components/Cards/GlassCard";
import { getLangFromUrl, useTranslations } from "../../i18n/translations";

const services = [
  {
    key: "websiteDesign",
    lottie:
      "https://lottie.host/40178beb-083f-42d6-b777-7cf8324762e1/MALtAb2wnn.json",
  },
  {
    key: "customDevelopment",
    lottie:
      "https://lottie.host/40178beb-083f-42d6-b777-7cf8324762e1/MALtAb2wnn.json",
  },
  {
    key: "maintenance",
    lottie:
      "https://lottie.host/b97724e1-a4fb-4661-8ebd-e515f6029205/aDrUtu5cgZ.json",
    style: {
      height: "100px",
      width: "120",
    },
  },
  {
    key: "seo",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_3rqwsqnj.json",
  },
  {
    key: "hosting",
    lottie:
      "https://lottie.host/3f96e703-1a68-4405-af70-f904f2779736/pGXXDCG49i.json",
  },
  {
    key: "responsive",
    lottie:
      "https://lottie.host/3b3f41c5-d174-40e3-835f-95ad8a9b187c/lF9pPQKy9l.json",
  },
];

export default function Services() {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t("services.title")}</h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            {t("services.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <GlassCard key={index} className="p-6">
              <div className="h-24 mb-4">
                <Player
                  autoplay
                  loop
                  src={service.lottie}
                  style={{ height: "100px", width: "100px", ...service.style }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {t(`services.${service.key}.title`)}
              </h3>
              <p className="text-foreground">
                {t(`services.${service.key}.description`)}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
