import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import GlassCard from "../components/ui/GlassCard";

const services = [
  {
    title: "Custom Website Design",
    description:
      "Stand out with a beautiful, professional website that captures your brand's unique personality.",
    lottie: "https://assets2.lottiefiles.com/packages/lf20_kkflmtur.json",
  },
  {
    title: "Online Stores",
    description:
      "Start selling online with an easy-to-manage store that your customers will love to shop from.",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_3rqwsqnj.json",
  },
  {
    title: "Website Care",
    description:
      "Keep your website running smoothly with regular updates, backups, and security monitoring.",
    lottie: "https://assets7.lottiefiles.com/packages/lf20_q5qvqk8z.json",
  },
  {
    title: "Search Engine Success",
    description:
      "Get found by more customers with websites built to rank well on Google and other search engines.",
    lottie: "https://assets3.lottiefiles.com/private_files/lf30_aqtf3frc.json",
  },
  {
    title: "Fast & Reliable Hosting",
    description:
      "Your website stays fast and available 24/7 with our premium hosting solutions.",
    lottie: "https://assets4.lottiefiles.com/packages/lf20_olomrqvp.json",
  },
  {
    title: "Business Growth Tools",
    description:
      "Grow your business with tools for newsletters, customer feedback, and social media integration.",
    lottie: "https://assets5.lottiefiles.com/packages/lf20_6e0qqtpa.json",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-20 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title">Solutions That Work</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Everything you need to succeed online, without the technical
            headaches.
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
                  style={{ height: "100px", width: "100px" }}
                />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800 dark:text-white">
                {service.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {service.description}
              </p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
