"use client";

import { useEffect } from "react";
import { RESUME_URL, CONTACT_URL } from "@/config/links";
import { OverlayGradient } from "./OverlayGradient";
import { TopOverlay } from "./TopOverlay";
import { BottomOverlay } from "./BottomOverlay";

export function Overlay() {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.tagName === "SELECT" ||
        target.isContentEditable
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "r":
          window.open(RESUME_URL, "_blank", "noopener,noreferrer");
          break;
        case "c":
          window.open(CONTACT_URL, "_blank", "noopener,noreferrer");
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <OverlayGradient />
      <TopOverlay />
      <BottomOverlay />
    </div>
  );
}
