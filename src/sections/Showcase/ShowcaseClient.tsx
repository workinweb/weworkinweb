import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "../../i18n/translations";

interface Template {
  slug: string;
  title: string;
  description: string;
  image: string;
  link: string;
  code: string;
  category: string;
}

interface ShowcaseClientProps {
  templates: any[];
  lang: "en" | "es";
}

export default function ShowcaseClient({
  templates,
  lang,
}: ShowcaseClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const itemsPerPage = 9;
  const t = useTranslations(lang);

  const categories = ["all", ...new Set(templates.map((t) => t.category))];

  const filteredTemplates = templates.filter((template) => {
    const matchesCategory =
      activeCategory === "all" || template.category === activeCategory;
    const matchesSearch = template.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredTemplates.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const currentTemplates = filteredTemplates.slice(start, end);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchTerm]);

  return (
    <div>
      <div className="flex flex-col gap-6 mb-4">
        <div className="relative mx-auto w-full max-w-2xl mb-4 sm:mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("showcase.search.placeholder")}
            className="w-full pl-12 text-foreground pr-4 py-3 rounded-xl bg-white dark:bg-slate-800 shadow-lg focus:ring-2 focus:ring-orange-500 outline-none"
          />
        </div>

        <div className="overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent">
          <div className="flex gap-4 min-w-max px-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 
                  hover:scale-105 hover:shadow-lg
                  ${
                    category === activeCategory
                      ? "bg-gradient-to-r from-orange-500 to-amber-500"
                      : "bg-white dark:bg-slate-800 text-foreground"
                  }`}
              >
                <span
                  className={`${
                    category === activeCategory
                      ? "text-white transition-colors duration-300 "
                      : "text-current transition-none "
                  }`}
                >
                  {category === "all"
                    ? t("showcase.category.all")
                    : category.charAt(0).toUpperCase() + category.slice(1)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeCategory}-${searchTerm}-${currentPage}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentTemplates.map((template, index) => (
            <motion.div
              key={template.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <a
                href={template.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={template.image.src}
                    alt={template.title}
                    width={800}
                    height={template.image.height}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 will-change-transform"
                    style={{
                      imageRendering: "high-quality",
                      backfaceVisibility: "hidden",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2 text-foreground group-hover:text-orange-500 transition-colors duration-300">
                    {template.title}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
                    {template.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-full">
                      {template.category}
                    </span>
                    <ExternalLink className="h-5 w-5 text-slate-400 group-hover:text-orange-500 transition-colors duration-300" />
                  </div>
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center items-center mt-12 gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          aria-label={t("showcase.pagination.prev")}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-full text-sm font-medium transition-colors duration-300
                ${
                  page === currentPage
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500"
                }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="p-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
          aria-label={t("showcase.pagination.next")}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 6px;
        }

        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }

        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: var(--color-orange-500);
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
}
