import { motion } from "framer-motion";

const projects = [
  {
    title: "E-commerce Platform",
    description: "Modern shopping experience with React and Next.js",
    image: "/portfolio/ecommerce.jpg",
    tags: ["React", "Next.js", "Tailwind"],
  },
  {
    title: "SaaS Dashboard",
    description: "Intuitive analytics dashboard for business metrics",
    image: "/portfolio/dashboard.jpg",
    tags: ["Vue", "TypeScript", "D3.js"],
  },
  {
    title: "Health & Wellness App",
    description: "Mobile-first web application for fitness tracking",
    image: "/portfolio/health.jpg",
    tags: ["React Native", "GraphQL"],
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-20 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Our Work</h2>
          <p className="text-slate-600 text-lg">
            Proud projects that make us smile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative overflow-hidden rounded-xl bg-slate-50"
            >
              <div className="aspect-video bg-slate-200 relative">
                {/* Replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-slate-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-sm px-3 py-1 bg-slate-200 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
