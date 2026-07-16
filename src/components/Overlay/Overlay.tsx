"use client";

import { useEffect, useState } from "react";
import { RESUME_URL, CONTACT_URL } from "@/config/links";
import { OverlayGradient } from "./OverlayGradient";
import { TopOverlay } from "./TopOverlay";
import { BottomOverlay } from "./BottomOverlay";
import { TopCompactOverlay } from "./TopCompactOverlay";
import { BottomCompactOverlay } from "./BottomCompactOverlay";

export function Overlay() {
  const [isCompact, setIsCompact] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  useEffect(() => {
    function checkWidth() {
      setIsCompact(window.innerWidth < 1024);
    }
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

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
      <OverlayGradient isInfoOpen={isInfoOpen} />
      {isCompact ? (
        <>
          <TopCompactOverlay isInfoOpen={isInfoOpen} onInfoToggle={() => setIsInfoOpen((p) => !p)} />
          <BottomCompactOverlay />
        </>
      ) : (
        <>
          <TopOverlay />
          <BottomOverlay />
        </>
      )}
    </div>
  );
}
