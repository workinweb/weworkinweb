import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export default function GlassCard({
  children,
  className = "",
}: GlassCardProps) {
  return (
    <motion.div
      className={`bg-white/90 dark:bg-slate-800/90 border border-slate-200/50 dark:border-slate-700/50 rounded-xl shadow-xl ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {children}
    </motion.div>
  );
}
