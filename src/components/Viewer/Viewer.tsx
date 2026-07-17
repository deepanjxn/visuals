"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useInteraction } from "@/hooks/useInteraction";

export function Viewer() {
  const { state, selectedArtwork, close } = useInteraction();
  const isOpen = state === "focused";

  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close]);

  function onBackdropClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) close();
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="viewer-backdrop"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundColor: "#000000" }}
          onClick={onBackdropClick}
        >
          <motion.div
            key="viewer-stage"
            className="flex items-center justify-center"
            style={{ width: "70vw", height: "75vh" }}
            initial={{ scale: 0.3 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.3 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {selectedArtwork?.src ? (
              <img
                src={selectedArtwork.src}
                alt={selectedArtwork.title ?? ""}
                draggable={false}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  display: "block",
                  borderRadius: "8px",
                }}
              />
            ) : (
              <div className="w-full h-full bg-surface rounded-lg flex items-center justify-center">
                <span className="text-foreground/20 text-sm font-medium tracking-[-0.04em]">
                  {selectedArtwork?.title ?? "Artwork"}
                </span>
              </div>
            )}
          </motion.div>

          <motion.button
            key="viewer-close"
            className="fixed top-10 right-12 max-sm:top-4 max-sm:right-5 w-12 h-12 bg-surface rounded-full flex items-center justify-center cursor-pointer z-10 transition-overlay hover:opacity-[0.92] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            onClick={close}
            aria-label="Close viewer"
          >
            <X size={20} className="text-foreground" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
