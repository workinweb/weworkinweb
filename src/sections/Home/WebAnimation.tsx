import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";

export default function WebAnimation() {
  return (
    <section className="py-10 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold mb-4 text-foreground">
            Building the Web, One Line at a Time
          </h2>
          <p className="text-foreground text-lg">
            Watch your ideas come to life through code
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Player
            autoplay
            loop
            src="https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json"
            className="w-full"
            style={{ maxWidth: "700px" }}
          />
        </div>
      </div>
    </section>
  );
}
