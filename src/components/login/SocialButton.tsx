"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export default function SocialButton({ children, onClick, className }: Props) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full flex items-center justify-center gap-3 rounded-xl px-4 py-2 bg-black/6 dark:bg-white/6 border border-black/20 dark:border-white/6 text-sm text-black dark:text-white ${className ?? ''}`}
    >
      {children}
    </motion.button>
  );
}
