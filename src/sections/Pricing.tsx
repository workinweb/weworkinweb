import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Rocket, Zap, Building2 } from "lucide-react";

const journeyStages = [
  {
    id: "seedling",
    name: "Basic Landing",
    icon: <Rocket className="w-8 h-8" />,
    price: {
      withDesign: "1,199",
      providedDesign: "899",
    },
    description:
      "Perfect for getting started with a professional online presence",
    features: [
      "Single page website with essential sections",
      "Basic contact form integration or other basic feature",
      "Mobile-responsive layout",
      "Basic SEO setup",
      "Hosting available ($20/monthly)",
      "Post-deployment changes: has a quote",
    ],
    notes: [
      "Design provided by client: $899",
      "Design created by us: $1,199",
      "You own the code",
    ],
    lottie: "https://assets2.lottiefiles.com/packages/lf20_qm8zig3v.json",
  },
  {
    id: "sapling",
    name: "Growth Package",
    icon: <Zap className="w-8 h-8" />,
    price: {
      withDesign: "1,699",
      providedDesign: "1,999",
    },
    description: "Expand your digital presence with more features and support",
    features: [
      "Up to 6 pages of dynamic content",
      "Advanced contact forms and basic features",
      "Advanced SEO strategy",
      "Hosting available ($15 / monthly)",
      "Basic Analytics data",
      "Basic Post-deployment changes: free",
      "Major Post-deployment changes: has a quote",
    ],
    notes: [
      "Design provided by client: $1,699",
      "Design created by us: $1,999",
      "Includes monthly content updates",
    ],
    lottie: "https://assets2.lottiefiles.com/packages/lf20_3ntisyac.json",
  },
  {
    id: "forest",
    name: "Custom Solution",
    icon: <Building2 className="w-8 h-8" />,
    price: {
      withDesign: "Custom",
      providedDesign: "Custom",
    },
    description: "Full-scale web solutions for established businesses",
    features: [
      "Web Application Front-end development",
      "Custom number of pages & features",
      "Multilingual support if needed",
      "Priority maintenance & support",
      "Basic AI powered features",
    ],
    notes: [
      "Custom quote based on requirements",
      "Flexible maintenance plans available",
    ],
    lottie: "https://assets7.lottiefiles.com/packages/lf20_yd8fbnml.json",
  },
];

export default function WebDevJourneyPricing() {
  const [selectedStage, setSelectedStage] = useState(journeyStages[0].id);

  return (
    <section
      id="pricing"
      className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Transparent Pricing</h2>
          <p className="text-foreground text-xl">
            Clear pricing structure with no hidden costs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {journeyStages.map((stage) => (
            <motion.div
              key={stage.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`glass-card cursor-pointer p-6 ${
                selectedStage === stage.id
                  ? "border-orange-500/50 dark:border-orange-500/50"
                  : ""
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
                  {stage.name}
                </h3>
              </div>
              <p className="text-foreground dark:text-slate-300 mb-2">
                {stage.description}
              </p>
              <div className="text-3xl font-bold text-orange-500 dark:text-orange-400">
                {stage.price.withDesign === "Custom" ? (
                  "Custom Quote"
                ) : (
                  <>From ${stage.price.providedDesign}</>
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
            className="glass-card p-8"
          >
            {journeyStages.map(
              (stage) =>
                stage.id === selectedStage && (
                  <div key={stage.id} className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-3xl font-bold text-foreground dark:text-slate-100 mb-4">
                        {stage.name} Features
                      </h3>
                      <ul className="space-y-3">
                        {stage.features.map((feature, index) => (
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
                        ))}
                      </ul>
                      <div className="mt-6 p-4 bg-orange-100 dark:bg-slate-800 rounded-lg">
                        <h4 className="font-semibold mb-2 text-orange-700 dark:text-orange-400">
                          Important Notes
                        </h4>
                        <ul className="space-y-2">
                          {stage.notes.map((note, index) => (
                            <li
                              key={index}
                              className="text-sm text-orange-600 dark:text-orange-300"
                            >
                              • {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="button-primary mt-8"
                      >
                        Get Started
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
      </div>
    </section>
  );
}
