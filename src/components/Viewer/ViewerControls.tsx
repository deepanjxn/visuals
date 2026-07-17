"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";

interface ViewerControlsProps {
  onClose: () => void;
}

export function ViewerControls({ onClose }: ViewerControlsProps) {
  return (
    <motion.button
      className="fixed top-10 right-12 max-sm:top-4 max-sm:right-5 w-12 h-12 bg-surface rounded-full flex items-center justify-center cursor-pointer z-10 transition-overlay hover:opacity-[0.92] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.17, ease: "easeOut", delay: 0.1 }}
      onClick={onClose}
      aria-label="Close viewer"
    >
      <X size={20} className="text-foreground" />
    </motion.button>
  );
}
