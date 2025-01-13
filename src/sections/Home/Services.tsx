import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import GlassCard from "../../components/Cards/GlassCard";
import { getLangFromUrl, useTranslations } from "../../i18n/translations";

const services = [
  {
    key: "websiteDesign",
    lottie:
      "https://lottie.host/76d8b0c4-0cea-4de2-9378-3c98e614bfd2/zUxD0kcfmz.json",
  },
  {
    key: "customDevelopment",
    lottie:
      "https://lottie.host/e6ac17fa-cc82-474d-a204-b55d173dfc02/VAjtbpv3oL.json",
  },
  {
    key: "maintenance",
    lottie:
      "https://lottie.host/2dadc952-965a-4b6b-b625-29f8f6e2cd42/yfy2rEYCwi.json",
    style: {
      height: "150px",
      width: "240px",
      transform: "translateX(-30px)",
    },
  },
  {
    key: "seo",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_3rqwsqnj.json",
  },
  {
    key: "hosting",
    lottie:
      "https://lottie.host/04a8c627-d2ad-4aa3-9251-ae6e37a92dcb/ysSOl69cS5.json",
  },
  {
    key: "responsive",
    lottie:
      "https://lottie.host/2f6ec4d5-53fb-4a24-9259-5993a772fbcf/GY0nNcjMMU.json",
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
              <div className="h-32 mb-8">
                <Player
                  autoplay
                  loop
                  src={service.lottie}
                  style={{ height: "150px", width: "150px", ...service.style }}
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
