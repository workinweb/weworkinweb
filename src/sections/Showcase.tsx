import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  category: string;
  stats: {
    [key: string]: string;
  };
}

const projects = [
  {
    id: "1",
    title: "E-commerce Revolution",
    description: "A cutting-edge online store with AI-powered recommendations",
    image: "/placeholder.svg?height=600&width=800&text=E-commerce",
    link: "https://example-ecommerce.com",
    category: "E-commerce",
    stats: {
      "Conversion Rate": "+25%",
      "User Engagement": "+40%",
    },
  },
  {
    id: "2",
    title: "HealthTech Innovation",
    description:
      "Telemedicine platform connecting patients with specialists worldwide",
    image: "/placeholder.svg?height=600&width=800&text=HealthTech",
    link: "https://example-healthtech.com",
    category: "Healthcare",
    stats: {
      "Patient Satisfaction": "98%",
      "Consultation Time": "-30%",
    },
  },
  {
    id: "3",
    title: "FinTech Dashboard",
    description:
      "Intuitive financial management tool for personal and business use",
    image: "/placeholder.svg?height=600&width=800&text=FinTech",
    link: "https://example-fintech.com",
    category: "Finance",
    stats: {
      "User Acquisition": "+50%",
      "Transaction Volume": "+75%",
    },
  },
  {
    id: "4",
    title: "EduTech Platform",
    description: "Interactive learning experience with personalized curricula",
    image: "/placeholder.svg?height=600&width=800&text=EduTech",
    link: "https://example-edutech.com",
    category: "Education",
    stats: {
      "Student Engagement": "+60%",
      "Course Completion Rate": "+35%",
    },
  },
  {
    id: "5",
    title: "Smart Home Hub",
    description: "Centralized IoT control for modern, connected homes",
    image: "/placeholder.svg?height=600&width=800&text=SmartHome",
    link: "https://example-smarthome.com",
    category: "IoT",
    stats: {
      "Energy Savings": "30%",
      "User Satisfaction": "95%",
    },
  },
];

const MasonryGrid: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-[250px]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden ${
                index % 3 === 0 ? "md:col-span-2 md:row-span-2" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative h-full">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-200 mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-white bg-orange-500 rounded-full mb-2">
                        {project.category}
                      </span>
                      <div className="space-y-1">
                        {Object.entries(project.stats).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-center text-sm text-white"
                          >
                            <span className="font-semibold mr-2">{key}:</span>
                            <span>{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-orange-300 transition-colors"
                      aria-label={`Visit ${project.title} project`}
                    >
                      <ExternalLink className="h-6 w-6" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MasonryGrid;
