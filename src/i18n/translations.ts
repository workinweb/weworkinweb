export const languages = {
  en: "English",
  es: "Español",
};

export const defaultLang = "en";

export const translations = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.contact": "Contact",
    "home.title": "Welcome to our site",
    "home.description": "This is a multilingual website built with Astro",

    "footer.copyright": "Copyright © 2025 WorkInWeb. All rights reserved.",
    "footer.legal.title": "Legal",
    "footer.legal.terms": "Terms & Conditions",
    "footer.legal.license": "License Agreement",
    "footer.legal.privacy": "Privacy Policy",
    "footer.follow.title": "Follow Us",
    "footer.contact.title": "Contact Us",

    "footer.paragraph":
      "Transforming ideas into exceptional web experiences. We don't just build websites; we craft digital solutions that work for your business.",
  },

  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre Nosotros",
    "nav.contact": "Contacto",
    "home.title": "Bienvenido a nuestro sitio",
    "home.description": "Este es un sitio web multilingüe construido con Astro",
    "footer.copyright":
      "Copyright © 2025 WorkInWeb. Todos los derechos reservados.",
    "footer.legal.title": "Legal",
    "footer.legal.terms": "Términos y Condiciones",
    "footer.legal.license": "Acuerdo de Licencia",
    "footer.legal.privacy": "Política de Privacidad",
    "footer.follow.title": "Síguenos",
    "footer.contact.title": "Contáctenos",
    "footer.paragraph":
      "Transformando ideas en experiencias web excepcionales. No solo construimos sitios web; creamos soluciones digitales que funcionan para tu negocio.",
  },
};

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof languages) {
  return function t(key: keyof (typeof translations)[typeof defaultLang]) {
    return translations[lang][key] || translations[defaultLang][key];
  };
}
