"use client";

import { useState } from "react";
import { useCamera } from "@/hooks/useCamera";
import { useDrag } from "@/hooks/useDrag";
import { useParallax } from "@/hooks/useParallax";
import { Grid } from "@/components/Grid/Grid";
import { Overlay } from "@/components/Overlay/Overlay";
import { WORLD_SIZE, WORLD_CENTER, getCameraStart } from "@/lib/constants";

export function Canvas() {
  const [initialPos] = useState(() => {
    if (typeof window !== "undefined") {
      return getCameraStart(window.innerWidth);
    }
    return WORLD_CENTER;
  });

  const { worldRef, moveBy } = useCamera(initialPos, initialPos);
  const parallaxRef = useParallax();

  useDrag(worldRef, moveBy);

  return (
    <main className="relative h-dvh w-dvw overflow-hidden bg-background cursor-grab active:cursor-grabbing select-none">
      <div
        ref={parallaxRef}
        className="absolute inset-0"
        style={{ willChange: "transform" }}
      >
        <div
          ref={worldRef}
          className="absolute bg-dot-grid"
          onMouseDown={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          style={{
            width: WORLD_SIZE,
            height: WORLD_SIZE,
            left: `calc(50vw - ${WORLD_SIZE}px)`,
            top: `calc(50vh - ${WORLD_SIZE}px)`,
          }}
        >
          <Grid worldRef={worldRef} />
        </div>
      </div>
      <Overlay />
    </main>
  );
}
