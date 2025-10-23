import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  Blocks,
  Briefcase,
  ChevronDown,
  ChevronRight,
  DollarSign,
  Handshake,
  Home,
  Mail,
  Check,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getLangFromUrl, useTranslations } from "../i18n/translations";
import { LanguageSelector } from "./LanguageSelector";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

// Update menuItems with translations
const getMenuItems = (lang: string, t: (key: string) => string) => [
  { name: t("nav.home"), icon: Home, href: `/${lang}` },
  {
    name: t("nav.work"),
    icon: Briefcase,
    href: `/${lang}/showcase`,
    onlyHome: false,
  },
  {
    name: t("nav.features"),
    icon: Blocks,
    href: `/${lang}/features`,
    onlyHome: false,
  },
  {
    name: t("nav.services"),
    icon: Handshake,
    href: "#services",
    onlyHome: true,
  },
  {
    name: t("nav.pricing"),
    icon: DollarSign,
    href: "#pricing",
    onlyHome: true,
  },
  { name: t("nav.contact"), icon: Mail, href: "#contact", onlyHome: true },
];

const getDesktopMenuItems = (lang: string, t: (key: string) => string) => [
  {
    name: t("nav.work"),
    icon: Briefcase,
    href: `/${lang}/showcase`,
    onlyHome: false,
  },
  {
    name: t("nav.features"),
    icon: Blocks,
    href: `/${lang}/features`,
    onlyHome: false,
  },
];

const getDesktopDropdownItems = (t: (key: string) => string) => [
  {
    name: t("nav.services"),
    icon: Handshake,
    href: "#services",
    onlyHome: true,
  },
  {
    name: t("nav.successStories"),
    icon: Briefcase,
    href: "#success-stories",
    onlyHome: true,
  },
  {
    name: t("nav.pricing"),
    icon: DollarSign,
    href: "#pricing",
    onlyHome: true,
  },
  { name: t("nav.contact"), icon: Mail, href: "#contact", onlyHome: true },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shouldShow, setShouldShow] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const [currentLang, setCurrentLang] = useState("");

  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 100], [0.9, 0.8]);

  // Add refs for menus
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  // Updated smooth scrolling handler for better mobile support
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    if (href === "/") {
      setActiveSection("");
    } else if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        setIsOpen(false);
        setIsDropdownOpen(false);

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

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Improved section detection with special handling for last section
  const checkActiveSection = () => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const sections = ["services", "success-stories", "pricing", "contact"].map(
      (id) => document.getElementById(id)
    );

    const navbarHeight = 80;
    let current = "";
    const scrollPosition = window.scrollY + window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    const isAtBottom = scrollPosition >= documentHeight - 50;

    if (isAtBottom && isHome) {
      current = "contact";
    } else {
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop - navbarHeight;
          const sectionHeight = section.clientHeight;

          if (
            window.scrollY >= sectionTop - 100 &&
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

    if (!isHomePath) {
      setActiveSection("");
    }

    const controlNavbar = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setShouldShow(false);
        setIsOpen(false);
        setIsDropdownOpen(false);
      } else {
        setShouldShow(true);
      }
      setLastScrollY(window.scrollY);
      checkActiveSection();
    };

    checkActiveSection();

    window.addEventListener("scroll", controlNavbar, { passive: true });
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY, isHome]);

  const handleMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const renderMenuItem = (
    item: (typeof getMenuItems extends (
      lang: string,
      t: (key: string) => string
    ) => infer R
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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: shouldShow ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed w-full backdrop-blur-xl shadow-sm dark:shadow-md"
      style={{ zIndex: 1000 }}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Logo lang={lang} />

          <div className="hidden md:flex items-center space-x-6">
            {getDesktopMenuItems(currentLang, t).map((item) =>
              renderMenuItem(item)
            )}

            {isHome && (
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label={
                    currentLang === "es"
                      ? "Menú de exploración"
                      : "Explore menu"
                  }
                  whileHover={{ scale: 1.05 }}
                  aria-expanded={isDropdownOpen}
                  className={`flex gap-2 items-center text-slate-700 dark:text-slate-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors ${
                    activeSection &&
                    [
                      "services",
                      "success-stories",
                      "pricing",
                      "contact",
                    ].includes(activeSection)
                      ? "text-orange-500 dark:text-orange-400"
                      : ""
                  }`}
                >
                  <span>{currentLang === "es" ? "Explorar" : "Explore"}</span>
                  <ChevronDown
                    size={16}
                    className={`transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200">
                    <div className="p-2 space-y-1">
                      {getDesktopDropdownItems(t).map((item) => (
                        <motion.a
                          key={item.name}
                          href={item.href}
                          onClick={(e) => handleClick(e, item.href)}
                          className={`
                            flex items-center justify-between w-full px-3 py-2 text-sm
                            rounded-md text-left
                            ${
                              item.href.slice(1) === activeSection
                                ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                                : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }
                            transition-colors duration-150
                          `}
                          whileHover={{ x: 5 }}
                        >
                          <span className="flex items-center gap-2">
                            <item.icon className="w-4 h-4" />
                            {item.name}
                          </span>
                          {item.href.slice(1) === activeSection && (
                            <Check size={16} className="text-orange-400" />
                          )}
                        </motion.a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
              aria-label={t("nav.menu")}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{t("nav.menu")}</span>
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
              {getMenuItems(currentLang, t).map((item) =>
                renderMenuItem(item, true)
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
