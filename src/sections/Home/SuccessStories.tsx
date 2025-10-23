import { getLangFromUrl, useTranslations } from "../../i18n/translations";

export default function SuccessStories() {
  const url = new URL(window.location.href);
  const lang = getLangFromUrl(url);
  const t = useTranslations(lang);

  type StoryCard = {
    description: string;
    name: string;
    designation: string;
    src: string;
    href: string;
  };

  const stories: StoryCard[] = [
    {
      description: t("success.galloexpress.description") as string,
      name: t("success.galloexpress.name") as string,
      designation: t("success.galloexpress.designation") as string,
      src: "/success-stories/galloexpress.png",
      href: "https://www.galloexpress.com/",
    },
    {
      description: t("success.evanhomecare.description") as string,
      name: t("success.evanhomecare.name") as string,
      designation: t("success.evanhomecare.designation") as string,
      src: "/success-stories/evanhomecare.png",
      href: "https://www.evanhomecare.com/",
    },
    {
      description: t("success.thefloridaclinic.description") as string,
      name: t("success.thefloridaclinic.name") as string,
      designation: t("success.thefloridaclinic.designation") as string,
      src: "/success-stories/thefloridaclinic.png",
      href: "https://thefloridaclinicsaesthetics.com/",
    },
  ];

  return (
    <section
      id="success-stories"
      className="py-20 bg-gradient-to-br from-slate-50 to-orange-50 dark:from-slate-900 dark:to-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="section-title">{t("success.title")}</h2>
          <p className="text-foreground text-lg max-w-2xl mx-auto">
            {t("success.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.name} - ${item.designation}`}
                className="block h-full"
              >
                <div className="relative  overflow-hidden bg-white dark:bg-slate-900 flex items-center justify-center">
                  <img
                    src={item.src}
                    alt={item.name}
                    width={600}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-1 text-foreground group-hover:text-orange-500 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {item.designation}
                  </p>
                  <p className="text-foreground line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
