import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import GlassCard from "../../components/Cards/GlassCard";

const services = [
  {
    title: "Website Design",
    description:
      "Stand out with a beautiful, professional website that captures your brand's unique personality.",
    lottie:
      "https://lottie.host/40178beb-083f-42d6-b777-7cf8324762e1/MALtAb2wnn.json",
  },

  {
    title: "Custom Development",
    description:
      "Tailored solutions and features built specifically for your business needs and goals.",
    lottie: "https://assets7.lottiefiles.com/packages/lf20_q5qvqk8z.json",
  },

  {
    title: "Website Maintenance",
    description:
      "Keep your site running smoothly with regular updates, performance optimization, and technical support.",
    lottie:
      "https://lottie.host/b97724e1-a4fb-4661-8ebd-e515f6029205/aDrUtu5cgZ.json",
    style: {
      height: "100px",
      width: "120",
    },
  },

  {
    title: "SEO & Analytics",
    description:
      "Optimize your website's performance with data-driven SEO strategies and detailed analytics tracking.",
    lottie: "https://assets9.lottiefiles.com/packages/lf20_3rqwsqnj.json",
  },
  {
    title: "Fast & Reliable Hosting",
    description:
      "Your website stays fast and available 24/7 with our premium hosting solutions.",
    lottie:
      "https://lottie.host/3f96e703-1a68-4405-af70-f904f2779736/pGXXDCG49i.json",
  },
  {
    title: "Responsive Design",
    description:
      "Your website will look great on any device, from desktops to mobile phones.",
    lottie:
      "https://lottie.host/3b3f41c5-d174-40e3-835f-95ad8a9b187c/lF9pPQKy9l.json",
  },
];

export default function Services() {
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
          <h2 className="section-title">Expert Web Development Services</h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            From design to deployment, we provide comprehensive web solutions
            that help your business thrive in the digital world.
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
                {service.title}
              </h3>
              <p className="text-foreground">{service.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
