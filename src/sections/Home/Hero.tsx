import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { getLangFromUrl } from "../../i18n/translations";

export default function Hero() {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);

  return (
    <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] dark:bg-[url('/patterns/lightgrid.svg')] opacity-20 dark:opacity-[0.15]" />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 xl:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 max-w-2xl lg:max-w-none"
          >
            <h1 className="text-5xl md:text-6xl xl:text-7xl text-foreground font-bold mb-6 leading-tight">
              We Make Your <br />
              <span className="gradient-text">Web Ideas Work</span>
            </h1>
            <p className="text-lg md:text-xl xl:text-2xl text-foreground mb-8 max-w-xl">
              From concept to reality, we craft beautiful websites that engage
              your audience and grow your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto sm:justify-center lg:justify-start">
              <motion.a
                href="#contact"
                className="button-primary text-center w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.a>
              <motion.a
                href={`/${lang}/showcase`}
                className="px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 text-foreground hover:border-orange-500 dark:hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-center w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Our Work
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full max-w-2xl mx-auto lg:max-w-none"
          >
            <div className="aspect-square w-full max-w-xl mx-auto">
              <Player
                autoplay
                loop
                src="https://assets3.lottiefiles.com/packages/lf20_iorpbol0.json"
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
