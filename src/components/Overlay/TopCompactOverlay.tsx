"use client";

import Image from "next/image";
import { Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TopCompactOverlayProps {
  isInfoOpen: boolean;
  onInfoToggle: () => void;
}

const descriptionVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 8 },
};

export function TopCompactOverlay({ isInfoOpen, onInfoToggle }: TopCompactOverlayProps) {
  return (
    <div className="fixed top-[40px] left-[20px] right-[20px] pointer-events-none">
      <motion.div
        animate={{ height: isInfoOpen ? "auto" : 48 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ overflow: "hidden" }}
      >
        <div className="flex justify-between items-start">
          <div className="flex items-center h-12 pointer-events-auto">
            <Image
              src="/images/portrait.webp"
              alt="Portrait"
              width={40}
              height={40}
              className="rounded-full object-cover select-none transition-overlay hover:opacity-[0.92] cursor-pointer"
              priority
              draggable={false}
              style={{ userSelect: "none" }}
            />
          </div>
          <button
            type="button"
            aria-label={isInfoOpen ? "Close" : "Info"}
            onClick={onInfoToggle}
            className="w-12 h-12 bg-surface rounded-full flex items-center justify-center pointer-events-auto transition-overlay hover:opacity-[0.92] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer shrink-0"
          >
            <div className="relative w-5 h-5">
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: isInfoOpen ? 0 : 1, rotate: isInfoOpen ? 90 : 0 }}
                transition={{ duration: 0.17, ease: "easeOut" }}
              >
                <Info size={20} className="text-foreground" />
              </motion.div>
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{ opacity: isInfoOpen ? 1 : 0, rotate: isInfoOpen ? 0 : -90 }}
                transition={{ duration: 0.17, ease: "easeOut" }}
              >
                <X size={20} className="text-foreground" />
              </motion.div>
            </div>
          </button>
        </div>
        <AnimatePresence>
          {isInfoOpen && (
            <motion.p
              key="description"
              variants={descriptionVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="text-foreground/50 text-base font-normal leading-relaxed tracking-[-0.04em] max-w-[420px] text-center mx-auto pointer-events-auto mt-6"
            >
              A visual playground exploring the intersection of generative art, design and interactive experience.
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
