"use client";

import { motion } from "framer-motion";

export function OverlayGradient({ isInfoOpen = false }: { isInfoOpen?: boolean }) {
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-full pointer-events-none"
        animate={{ height: isInfoOpen ? 240 : 180 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{ background: "linear-gradient(to bottom, #191919 0%, transparent 100%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-full h-[220px] pointer-events-none"
        style={{ background: "linear-gradient(to top, #191919 0%, transparent 100%)" }}
      />
    </>
  );
}
