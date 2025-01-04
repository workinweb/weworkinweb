import { motion } from "framer-motion";
import GlassCard from "../components/ui/GlassCard";

const projects = [
  {
    title: "E-commerce Platform",
    description: "Modern online store with seamless checkout experience",
    image: "/showcase/ecommerce.jpg",
    tags: ["Next.js", "Stripe", "Tailwind"],
    link: "#",
  },
  {
    title: "Business Analytics Dashboard",
    description: "Real-time data visualization and reporting platform",
    image: "/showcase/dashboard.jpg",
    tags: ["React", "D3.js", "Firebase"],
    link: "#",
  },
  // Add more projects as needed
];

export default function ShowcaseGrid() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">Our Work</h1>
          <p className="text-foreground text-xl">
            Explore our portfolio of successful web projects
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-sm bg-orange-100 dark:bg-slate-800 text-orange-600 dark:text-orange-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
