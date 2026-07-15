"use client";

import { useEffect, useRef } from "react";

const MOMENTUM_DECAY = 0.92;
const VELOCITY_THRESHOLD = 0.1;

interface DragState {
  isDragging: boolean;
  prevX: number;
  prevY: number;
  prevTime: number;
  velocityX: number;
  velocityY: number;
}

export function useDrag<T extends HTMLElement>(
  elementRef: React.RefObject<T | null>,
  onMove: (dx: number, dy: number) => void
) {
  const dragRef = useRef<DragState>({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    prevTime: 0,
    velocityX: 0,
    velocityY: 0,
  });

  const onMoveRef = useRef(onMove);
  const momentumIdRef = useRef<number | null>(null);

  useEffect(() => {
    onMoveRef.current = onMove;
  }, [onMove]);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    const drag = dragRef.current;

    function momentumLoop() {
      const vx = drag.velocityX;
      const vy = drag.velocityY;

      if (
        Math.abs(vx) < VELOCITY_THRESHOLD &&
        Math.abs(vy) < VELOCITY_THRESHOLD
      ) {
        drag.velocityX = 0;
        drag.velocityY = 0;
        momentumIdRef.current = null;
        return;
      }

      onMoveRef.current(vx, vy);
      drag.velocityX *= MOMENTUM_DECAY;
      drag.velocityY *= MOMENTUM_DECAY;
      momentumIdRef.current = requestAnimationFrame(momentumLoop);
    }

    function startMomentum() {
      if (momentumIdRef.current !== null) {
        cancelAnimationFrame(momentumIdRef.current);
      }
      if (
        Math.abs(drag.velocityX) < VELOCITY_THRESHOLD &&
        Math.abs(drag.velocityY) < VELOCITY_THRESHOLD
      ) {
        momentumIdRef.current = null;
        return;
      }
      momentumIdRef.current = requestAnimationFrame(momentumLoop);
    }

    function stopMomentum() {
      if (momentumIdRef.current !== null) {
        cancelAnimationFrame(momentumIdRef.current);
        momentumIdRef.current = null;
      }
    }

    function getPos(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onPointerDown(e: MouseEvent | TouchEvent) {
      stopMomentum();
      drag.isDragging = true;
      const pos = getPos(e);
      drag.prevX = pos.x;
      drag.prevY = pos.y;
      drag.prevTime = performance.now();
      drag.velocityX = 0;
      drag.velocityY = 0;
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!drag.isDragging) return;
      const pos = getPos(e);
      const dx = pos.x - drag.prevX;
      const dy = pos.y - drag.prevY;
      const now = performance.now();
      const dt = now - drag.prevTime;

      if (dt > 0) {
        drag.velocityX = (dx / dt) * 16.67;
        drag.velocityY = (dy / dt) * 16.67;
      }

      drag.prevX = pos.x;
      drag.prevY = pos.y;
      drag.prevTime = now;

      onMoveRef.current(dx, dy);
    }

    function onPointerUp() {
      if (!drag.isDragging) return;
      drag.isDragging = false;
      startMomentum();
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      onMoveRef.current(-e.deltaX, -e.deltaY);
    }

    el.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);

    el.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      stopMomentum();
      el.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      el.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      el.removeEventListener("wheel", onWheel);
    };
  }, [elementRef]);
}
