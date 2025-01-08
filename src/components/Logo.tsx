export default function Logo({
  withDescription = true,
  textSize = "text-2xl",
}) {
  return (
    <a href="/" className="flex items-center space-x-2">
      <div className={`${textSize} font-bold`}>
        <span className="text-orange-500 dark:text-orange-400">Work</span>
        <span className="text-amber-500 dark:text-amber-400">In</span>
        <span className="text-orange-500 dark:text-orange-400">Web</span>
      </div>

      {withDescription && (
        <div className="hidden sm:block text-sm text-foreground ">
          // We make it work
        </div>
      )}
    </a>
  );
}
