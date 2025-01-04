import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] dark:bg-[url('/patterns/lightgrid.svg')] opacity-20 dark:opacity-[0.15]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl text-foreground font-bold mb-6 leading-tight">
              We Make Your <br />
              <span className="gradient-text">Web Ideas Work</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8">
              From concept to reality, we craft beautiful websites that engage
              your audience and grow your business.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#contact"
                className="button-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Your Project
              </motion.a>
              <motion.a
                href="#portfolio"
                className="px-8 py-4 rounded-full border-2 border-slate-200 dark:border-slate-700 text-foreground hover:border-orange-500 dark:hover:border-orange-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
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
            className="relative"
          >
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_iorpbol0.json"
              className="w-full max-w-lg mx-auto"
              style={{ height: "400px" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
