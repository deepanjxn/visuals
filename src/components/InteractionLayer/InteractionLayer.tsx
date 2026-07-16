"use client";

import { useEffect, useRef } from "react";

const MIN_LENGTH = 2;
const LERP_FACTOR = 0.2;

interface InteractionLayerProps {
  worldRef: React.RefObject<HTMLElement | null>;
}

export function InteractionLayer({ worldRef }: InteractionLayerProps) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const world = worldRef.current;
    if (!world || !elRef.current) return;
    const el: HTMLDivElement = elRef.current;

    let isDragging = false;
    let rafId: number | null = null;

    let startX = 0;
    let startY = 0;
    let targetAngle = 0;
    let targetLength = 0;

    let displayAngle = 0;
    let displayLength = 0;

    function getPos(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function tick() {
      let diff = targetAngle - displayAngle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff));
      displayAngle += diff * LERP_FACTOR;

      displayLength += (targetLength - displayLength) * LERP_FACTOR;

      const angleDeg = displayAngle * (180 / Math.PI);

      el.style.transform = `translate(${startX}px, ${startY - 1}px) rotate(${angleDeg}deg)`;
      el.style.width = `${displayLength}px`;

      if (isDragging) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function onPointerDown(e: MouseEvent | TouchEvent) {
      isDragging = true;
      const pos = getPos(e);
      startX = pos.x;
      startY = pos.y;
      targetAngle = 0;
      displayAngle = 0;
      targetLength = 0;
      displayLength = 0;

      el.style.transition = "opacity 80ms ease-out";
      el.style.opacity = "1";

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!isDragging) return;
      const pos = getPos(e);
      const dx = pos.x - startX;
      const dy = pos.y - startY;

      targetAngle = Math.atan2(dy, dx);
      targetLength = Math.max(MIN_LENGTH, Math.sqrt(dx * dx + dy * dy));
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;

      el.style.transition = "opacity 120ms ease-out";
      el.style.opacity = "0";
    }

    world.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    world.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      world.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      world.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
    };
  }, [worldRef]);

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed"
      style={{
        left: 0,
        top: 0,
        width: `${MIN_LENGTH}px`,
        height: "2px",
        background: "#95FF63",
        opacity: 0,
        borderRadius: "999px",
        boxShadow: "0 0 8px rgba(149,255,99,.35)",
        transformOrigin: "left center",
        transform: "translate(0px, 0px) rotate(0deg)",
        willChange: "transform, width, opacity",
        zIndex: 9999,
      }}
    />
  );
}
