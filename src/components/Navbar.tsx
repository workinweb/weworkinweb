import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";
import {
  Blocks,
  Briefcase,
  ChevronRight,
  DollarSign,
  Handshake,
  Home,
  Mail,
} from "lucide-react";

const menuItems = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Our Work", icon: Briefcase, href: "/showcase", onlyHome: false },
  { name: "Features", icon: Blocks, href: "/features", onlyHome: false },
  { name: "Services", icon: Handshake, href: "#services", onlyHome: true },
  { name: "Pricing", icon: DollarSign, href: "#pricing", onlyHome: true },
  { name: "Contact", icon: Mail, href: "#contact", onlyHome: true },
];

const desktopMenuItems = [
  { name: "Our Work", icon: Briefcase, href: "/showcase", onlyHome: false },
  { name: "Features", icon: Blocks, href: "/features", onlyHome: false },
  { name: "Services", icon: Handshake, href: "#services", onlyHome: true },
  { name: "Pricing", icon: DollarSign, href: "#pricing", onlyHome: true },
  { name: "Contact", icon: Mail, href: "#contact", onlyHome: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  const [isHome, setIsHome] = useState(false);

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.9, 0.8]);

  useEffect(() => {
    setIsHome(window.location.pathname === "/");

    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setIsOpen(false);
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
      className="fixed w-full backdrop-blur-xl shadow-sm dark:shadow-md"
      style={{ zIndex: 1000 }}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            {desktopMenuItems.map((item) => {
              if (!isHome && item.onlyHome) return null;

              return (
                <motion.a
                  key={item.name}
                  href={`${item.href}`}
                  whileHover={{ scale: 1.05 }}
                  className="text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
                >
                  {item.name}
                </motion.a>
              );
            })}
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden"
          >
            <div className="px-4 py-2 space-y-1">
              {menuItems.map((item, index) => {
                if (!isHome && item.onlyHome) return null;

                return (
                  <motion.a
                    key={item.name}
                    href={`${item.href}`}
                    className="block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <span className="flex items-center">
                      <item.icon className="w-5 h-5 mr-2" />
                      {item.name}
                      <ChevronRight size={16} className="ml-auto" />
                    </span>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
