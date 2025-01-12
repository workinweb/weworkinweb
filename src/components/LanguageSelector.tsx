import React, { useEffect, useRef, useState } from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { languages } from "../i18n/translations";

// Define flag emoji codes for each language
const languageFlags = {
  en: "🇺🇸",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  it: "🇮🇹",
  pt: "🇵🇹",
  ja: "🇯🇵",
  ko: "🇰🇷",
  zh: "🇨🇳",
};

interface LanguageSelectorProps {
  size: "mobile" | "desktop";
  shouldShow: boolean;
  currentLang: string;
}

export const LanguageSelector = ({
  size,
  shouldShow,
  currentLang,
}: LanguageSelectorProps) => {
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const handleLanguageChange = (lang: string) => {
    const currentPathWithoutLang = window.location.pathname
      .split("/")
      .slice(2)
      .join("/");
    window.location.href = `/${lang}/${currentPathWithoutLang}`;
  };

  useEffect(() => {
    if (!shouldShow) {
      setIsLangMenuOpen(false);
    }
  }, [shouldShow]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node)
      ) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={langMenuRef}>
      <button
        onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
        aria-label={
          currentLang === "es" ? "Seleccionar idioma" : "Select language"
        }
        className={`flex items-center space-x-2 ${
          size === "mobile" ? "p-2" : "px-3 py-2"
        } rounded-full bg-slate-200 dark:bg-slate-700 text-gray-700 dark:text-gray-200 hover:hover:text-orange-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:text-primary`}
      >
        <Globe size={18} />
        {size === "desktop" && (
          <span className="text-sm font-medium">{languages[currentLang]}</span>
        )}
      </button>

      {isLangMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 transform opacity-100 scale-100 transition-all duration-200">
          <div className="p-2 space-y-1">
            {Object.entries(languages).map(([code, name]) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`
                  flex items-center justify-between w-full px-3 py-2 text-sm
                  rounded-md text-left
                  ${
                    code === currentLang
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }
                  transition-colors duration-150
                `}
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg">{languageFlags[code]}</span>
                  {name}
                </span>
                {code === currentLang && (
                  <Check size={16} className="text-orange-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
