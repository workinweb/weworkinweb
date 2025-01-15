export default function Logo({
  withDescription = true,
  textSize = "text-2xl",
  lang = "en",
}) {
  const description = {
    en: "// We make it work",
    es: "// Lo hacemos funcionar",
  };

  return (
    <a
      href={`/${lang}`}
      className="flex items-center space-x-2"
      aria-label="WorkInWeb Logo"
    >
      <div className="md:hidden">
        <img
          src="/logo/logo_notext.svg"
          alt="WorkInWeb Logo"
          className="h-8 w-auto"
        />
      </div>

      <div className={`hidden md:block ${textSize} font-bold`}>
        <span className="text-orange-500 dark:text-orange-400">Work</span>
        <span className="text-amber-500 dark:text-amber-400">In</span>
        <span className="text-orange-500 dark:text-orange-400">Web</span>
      </div>

      {withDescription && (
        <div className="hidden sm:block text-sm text-foreground">
          {description[lang as keyof typeof description]}
        </div>
      )}
    </a>
  );
}
