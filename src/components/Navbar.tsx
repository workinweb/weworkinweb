import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.9, 0.8]);

  useEffect(() => {
    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShouldShow(false);
      } else {
        setShouldShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: shouldShow ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full  backdrop-blur-xl bg-background"
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            {["Services", "Pricing", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                whileHover={{ scale: 1.05 }}
                className="text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 dark:text-slate-300"
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={
          isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }
        }
        className="md:hidden overflow-hidden"
      >
        <div className="m-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-xl">
          {["Services", "Portfolio", "Pricing", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="block py-2 px-4 text-foreground  hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
}
