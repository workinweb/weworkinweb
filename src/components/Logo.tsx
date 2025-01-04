export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-2xl font-bold">
        <span className="text-orange-500 dark:text-orange-400">Work</span>
        <span className="text-amber-500 dark:text-amber-400">In</span>
        <span className="text-orange-500 dark:text-orange-400">Web</span>
      </div>
      <div className="hidden sm:block text-sm text-foreground ">
        // We make it work
      </div>
    </div>
  );
}
