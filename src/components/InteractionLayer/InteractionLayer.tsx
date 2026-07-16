"use client";

import { useEffect, useRef } from "react";

const LERP_FACTOR = 0.2;
const BEND_MIN = 12;
const BEND_MAX = 40;

interface InteractionLayerProps {
  worldRef: React.RefObject<HTMLElement | null>;
}

export function InteractionLayer({ worldRef }: InteractionLayerProps) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const world = worldRef.current;
    if (!world || !svgRef.current) return;
    const svg = svgRef.current;
    const path = svg.querySelector("path")!;
    const gradient = svg.querySelector("linearGradient")!;

    let isDragging = false;
    let rafId: number | null = null;

    let startX = 0;
    let startY = 0;
    let targetEndX = 0;
    let targetEndY = 0;

    let displayEndX = 0;
    let displayEndY = 0;

    function getPos(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function tick() {
      displayEndX += (targetEndX - displayEndX) * LERP_FACTOR;
      displayEndY += (targetEndY - displayEndY) * LERP_FACTOR;

      const dx = displayEndX - startX;
      const dy = displayEndY - startY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 0.5) {
        path.setAttribute("d", "");
        if (isDragging) {
          rafId = requestAnimationFrame(tick);
        }
        return;
      }

      const midX = (startX + displayEndX) / 2;
      const midY = (startY + displayEndY) / 2;
      const nx = -dy / dist;
      const ny = dx / dist;
      const bend = Math.max(BEND_MIN, Math.min(BEND_MAX, dist * 0.12));
      const cpX = midX + nx * bend;
      const cpY = midY + ny * bend;

      path.setAttribute(
        "d",
        `M ${startX} ${startY} Q ${cpX} ${cpY} ${displayEndX} ${displayEndY}`
      );
      gradient.setAttribute("x1", String(startX));
      gradient.setAttribute("y1", String(startY));
      gradient.setAttribute("x2", String(displayEndX));
      gradient.setAttribute("y2", String(displayEndY));

      if (isDragging) {
        rafId = requestAnimationFrame(tick);
      }
    }

    function onPointerDown(e: MouseEvent | TouchEvent) {
      isDragging = true;
      const pos = getPos(e);
      startX = pos.x;
      startY = pos.y;
      targetEndX = pos.x;
      targetEndY = pos.y;
      displayEndX = pos.x;
      displayEndY = pos.y;

      svg.style.transition = "opacity 80ms ease-out";
      svg.style.opacity = "1";

      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(tick);
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!isDragging) return;
      const pos = getPos(e);
      targetEndX = pos.x;
      targetEndY = pos.y;
    }

    function onPointerUp() {
      if (!isDragging) return;
      isDragging = false;

      svg.style.transition = "opacity 120ms ease-out";
      svg.style.opacity = "0";
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
    <svg
      ref={svgRef}
      className="pointer-events-none fixed"
      style={{
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        opacity: 0,
        overflow: "visible",
        zIndex: 9999,
      }}
    >
      <defs>
        <linearGradient
          id="drag-gradient"
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2="0"
        >
          <stop offset="0%" stopColor="#95FF63" stopOpacity="0" />
          <stop offset="100%" stopColor="#95FF63" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        d=""
        fill="none"
        stroke="url(#drag-gradient)"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </svg>
  );
}
