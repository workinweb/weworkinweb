export default function Logo() {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-2xl font-bold">
        <span className="text-blue-600">Work</span>
        <span className="text-violet-600">In</span>
        <span className="text-blue-600">Web</span>
      </div>
      <div className="hidden sm:block text-sm text-slate-500">// We make it work</div>
    </div>
  );
}