import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  Blocks,
  Briefcase,
  ChevronRight,
  DollarSign,
  Handshake,
  Home,
  Mail,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLangFromUrl } from "../i18n/translations";
import { LanguageSelector } from "./LanguageSelector";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

// Update menuItems with dynamic language paths
const getMenuItems = (lang: string) => [
  { name: "Home", icon: Home, href: `/${lang}` },
  {
    name: "Our Work",
    icon: Briefcase,
    href: `/${lang}/showcase`,
    onlyHome: false,
  },
  {
    name: "Features",
    icon: Blocks,
    href: `/${lang}/features`,
    onlyHome: false,
  },
  { name: "Services", icon: Handshake, href: "#services", onlyHome: true },
  { name: "Pricing", icon: DollarSign, href: "#pricing", onlyHome: true },
  { name: "Contact", icon: Mail, href: "#contact", onlyHome: true },
];

const getDesktopMenuItems = (lang: string) => [
  {
    name: "Our Work",
    icon: Briefcase,
    href: `/${lang}/showcase`,
    onlyHome: false,
  },
  {
    name: "Features",
    icon: Blocks,
    href: `/${lang}/features`,
    onlyHome: false,
  },
  { name: "Services", icon: Handshake, href: "#services", onlyHome: true },
  { name: "Pricing", icon: DollarSign, href: "#pricing", onlyHome: true },
  { name: "Contact", icon: Mail, href: "#contact", onlyHome: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [currentLang, setCurrentLang] = useState("");

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.9, 0.8]);

  // Add a ref for the mobile menu button
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Updated smooth scrolling handler for better mobile support
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/") {
      // Reset active section when navigating to home
      setActiveSection("");
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        setIsOpen(false);

        setTimeout(() => {
          const navbarHeight = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            window.pageYOffset + elementPosition - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  };

  // Improved section detection with special handling for last section
  const checkActiveSection = () => {
    // Only check sections if we're on the home page
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sections = ["services", "pricing", "contact"].map((id) =>
      document.getElementById(id)
    );

    const navbarHeight = 80;
    let current = "";
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Check if we're at the bottom of the page and on home page
    const isAtBottom = scrollPosition >= documentHeight - 50; // 50px threshold

    if (isAtBottom && isHome) {
      // If at bottom and on home page, activate the last section
      current = "contact";
    } else {
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop - navbarHeight;
          const sectionHeight = section.clientHeight;

          // Improved section detection logic
          if (
            window.scrollY >= sectionTop - 100 && // Added offset for earlier detection
            window.scrollY < sectionTop + sectionHeight
          ) {
            current = section.getAttribute("id") || "";
          }
        }
      });
    }

    setActiveSection(current);
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const lang = getLangFromUrl(url);
    setCurrentLang(lang);

    const path = window.location.pathname;
    const isHomePath = path === `/${lang}` || path === `/${lang}/`;
    setIsHome(isHomePath);
    setCurrentPath(path);

    // Reset active section when not on home page
    if (!isHomePath) {
      setActiveSection("");
    }

    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShouldShow(false);
        setIsOpen(false);
      } else {
        setShouldShow(true);
      }
      setLastScrollY(window.scrollY);
      checkActiveSection();
    };

    // Initial check for active section
    checkActiveSection();

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, isHome]); // Added isHome to dependencies

  // Add a specific handler for the menu button
  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event from bubbling up
    setIsOpen(!isOpen);
  };

  // Modify the menu item rendering to include active states and smooth scrolling
  const renderMenuItem = (
    item: (typeof getMenuItems extends (lang: string) => infer R
      ? R
      : never)[0],
    isMobile = false
  ) => {
    if (!isHome && item.onlyHome) return null;

    const isActive = item.href.startsWith("/")
      ? currentPath === item.href &&
        (item.href === `/${currentLang}` ? !activeSection : true)
      : item.href.slice(1) === activeSection;

    return (
      <motion.a
        key={item.name}
        href={item.href}
        onClick={(e) => handleClick(e, item.href)}
        whileHover={{ scale: 1.05 }}
        className={`
          ${
            isMobile
              ? "block py-2 px-4 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              : "text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
          }
          ${isActive ? "border-b-2 border-orange-500" : ""}
          ${
            !isMobile && item.href.startsWith("#")
              ? "hover:border-b-2 border-orange-500"
              : ""
          }
        `}
      >
        {isMobile ? (
          <span className="flex items-center">
            <item.icon className="w-5 h-5 mr-2" />
            {item.name}
            <ChevronRight size={16} className="ml-auto" />
          </span>
        ) : (
          item.name
        )}
      </motion.a>
    );
  };

  // Update the return JSX to use the new renderMenuItem function
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

          <div className="hidden md:flex items-center space-x-6">
            {getDesktopMenuItems(currentLang).map((item) =>
              renderMenuItem(item)
            )}

            <div className="flex items-center space-x-4">
              <LanguageSelector
                shouldShow={shouldShow}
                size="desktop"
                currentLang={currentLang}
              />
              <ThemeToggle />
            </div>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <LanguageSelector
                shouldShow={shouldShow}
                size="mobile"
                currentLang={currentLang}
              />
              <ThemeToggle />
            </div>

            <button
              ref={menuButtonRef}
              onClick={handleMenuToggle}
              className="text-slate-700 dark:text-slate-300 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle menu"
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
            className="md:hidden bg-white dark:bg-gray-900 overflow-hidden mobile-menu-container"
          >
            <div className="px-4 py-2 space-y-1">
              {getMenuItems(currentLang).map((item) =>
                renderMenuItem(item, true)
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
