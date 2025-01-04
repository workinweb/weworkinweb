export default function Logo({ withDescriptio = true }) {
  return (
    <a href="/" className="flex items-center space-x-2">
      <div className="text-2xl font-bold">
        <span className="text-orange-500 dark:text-orange-400">Work</span>
        <span className="text-amber-500 dark:text-amber-400">In</span>
        <span className="text-orange-500 dark:text-orange-400">Web</span>
      </div>
      {withDescriptio && (
        <div className="hidden sm:block text-sm text-foreground ">
          // We make it work
        </div>
      )}
    </a>
  );
}
