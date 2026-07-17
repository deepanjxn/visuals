"use client";

import { motion } from "framer-motion";

interface OverlayGradientProps {
  isInfoOpen?: boolean;
  hidden?: boolean;
}

export function OverlayGradient({ isInfoOpen = false, hidden = false }: OverlayGradientProps) {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full pointer-events-none"
        animate={{
          height: isInfoOpen ? 240 : 180,
          opacity: hidden ? 0 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ background: "linear-gradient(to bottom, #191919 0%, transparent 100%)" }}
      />
      <motion.div
        className="fixed bottom-0 left-0 w-full h-[220px] pointer-events-none"
        animate={{ opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ background: "linear-gradient(to top, #191919 0%, transparent 100%)" }}
      />
    </>
  );
}
