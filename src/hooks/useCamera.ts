"use client";

import { useRef, useEffect, useCallback } from "react";
import { createCamera, updateCamera, cameraTransform } from "@/lib/camera";
import { LERP_FACTOR } from "@/lib/physics";
import type { CameraState } from "@/lib/camera";

export function useCamera(
  initialX = 0,
  initialY = 0
) {
  const worldRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<CameraState>(createCamera(initialX, initialY));

  useEffect(() => {
    const camera = cameraRef.current;
    const world = worldRef.current;
    if (!world) return;

    let animationId: number;

    function tick() {
      updateCamera(camera, LERP_FACTOR);
      const el = worldRef.current;
      if (el) {
        el.style.transform = cameraTransform(camera);
      }
      animationId = requestAnimationFrame(tick);
    }

    animationId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animationId);
  }, []);

  const moveBy = useCallback((dx: number, dy: number) => {
    cameraRef.current.targetX += dx;
    cameraRef.current.targetY += dy;
  }, []);

  return { worldRef, moveBy };
}
