import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Rocket, Zap, Building2 } from "lucide-react";

const journeyStages = [
  {
    id: "seedling",
    name: "Digital Seedling",
    icon: <Rocket className="w-8 h-8" />,
    price: "2,999",
    description: "Plant your digital roots and start growing online",
    features: [
      "Custom designed 5-page website",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Contact form integration",
      "1 month post-launch support",
    ],
    lottie: "https://assets2.lottiefiles.com/packages/lf20_qm8zig3v.json",
  },
  {
    id: "sapling",
    name: "Thriving Sapling",
    icon: <Zap className="w-8 h-8" />,
    price: "5,999",
    description: "Nurture your online presence and branch out",
    features: [
      "Everything in Digital Seedling",
      "Up to 10 pages of dynamic content",
      "Blog or news section",
      "Advanced SEO strategy",
      "Social media integration",
      "Basic e-commerce (up to 20 products)",
      "3 months of growth support",
    ],
    lottie: "https://assets2.lottiefiles.com/packages/lf20_3ntisyac.json",
  },
  {
    id: "forest",
    name: "Digital Ecosystem",
    icon: <Building2 className="w-8 h-8" />,
    price: "Custom",
    description: "Cultivate a thriving digital forest",
    features: [
      "Everything in Thriving Sapling",
      "Unlimited pages and scalable architecture",
      "Full e-commerce suite",
      "Custom web applications",
      "Advanced security measures",
      "Multilingual support",
      "6 months of ecosystem nurturing",
    ],
    lottie: "https://assets7.lottiefiles.com/packages/lf20_yd8fbnml.json",
  },
];

export default function WebDevJourneyPricing() {
  const [selectedStage, setSelectedStage] = useState(journeyStages[0].id);

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-blue-50 dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Grow Your Digital Presence
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-300">
            Choose your web development journey and watch your online business
            flourish
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {journeyStages.map((stage) => (
            <motion.div
              key={stage.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cursor-pointer rounded-lg p-6 ${
                selectedStage === stage.id
                  ? "bg-white dark:bg-slate-700 shadow-lg"
                  : "bg-slate-100 dark:bg-slate-800"
              }`}
              onClick={() => setSelectedStage(stage.id)}
            >
              <div className="flex items-center mb-4">
                <div
                  className={`mr-4 p-2 rounded-full ${
                    selectedStage === stage.id
                      ? "bg-green-500 text-white"
                      : "bg-slate-200 dark:bg-slate-600"
                  }`}
                >
                  {stage.icon}
                </div>
                <h3 className="text-2xl font-semibold text-slate-800 dark:text-white">
                  {stage.name}
                </h3>
              </div>
              <p className="text-slate-600 dark:text-slate-300 mb-2">
                {stage.description}
              </p>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                ${stage.price}
                {stage.id === "forest" && (
                  <span className="text-base ml-1">Starting at</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8"
          >
            {journeyStages.map(
              (stage) =>
                stage.id === selectedStage && (
                  <div key={stage.id} className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">
                        {stage.name} Features
                      </h3>
                      <ul className="space-y-3">
                        {stage.features.map((feature, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center text-slate-700 dark:text-slate-300"
                          >
                            <svg
                              className="w-5 h-5 text-green-500 mr-3"
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
                        ))}
                      </ul>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-8 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-amber-600 transition duration-300 ease-in-out"
                      >
                        {stage.id === "forest"
                          ? "Get Custom Quote"
                          : "Start Your Journey"}
                      </motion.button>
                    </div>
                    <div className="flex items-center justify-center">
                      <Player
                        autoplay
                        loop
                        src={stage.lottie}
                        style={{ height: "300px", width: "300px" }}
                      />
                    </div>
                  </div>
                )
            )}
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
            Not sure which stage is right for your digital growth?
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-lg shadow-md hover:from-orange-600 hover:to-amber-600 transition duration-300 ease-in-out">
            Get a Personalized Growth Plan
          </button>
        </motion.div>
      </div>
    </section>
  );
}
