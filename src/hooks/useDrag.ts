"use client";

import { useEffect, useRef } from "react";

const DRAG_CONFIG = {
  momentumDecay: 0.92,
  velocityThreshold: 0.1,
} as const;

const TARGET_FRAME_MS = 1000 / 60;

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
  const dragStateRef = useRef<DragState>({
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

    const dragState = dragStateRef.current;

    // Continue inertia after pointer release
    function momentumLoop() {
      const vx = dragState.velocityX;
      const vy = dragState.velocityY;

      if (
        Math.abs(vx) < DRAG_CONFIG.velocityThreshold &&
        Math.abs(vy) < DRAG_CONFIG.velocityThreshold
      ) {
        dragState.velocityX = 0;
        dragState.velocityY = 0;
        momentumIdRef.current = null;
        return;
      }

      onMoveRef.current(vx, vy);
      dragState.velocityX *= DRAG_CONFIG.momentumDecay;
      dragState.velocityY *= DRAG_CONFIG.momentumDecay;
      momentumIdRef.current = requestAnimationFrame(momentumLoop);
    }

    function startMomentum() {
      if (momentumIdRef.current !== null) {
        cancelAnimationFrame(momentumIdRef.current);
      }
      if (
        Math.abs(dragState.velocityX) < DRAG_CONFIG.velocityThreshold &&
        Math.abs(dragState.velocityY) < DRAG_CONFIG.velocityThreshold
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

    function getPointerPosition(e: MouseEvent | TouchEvent) {
      if ("touches" in e) {
        return { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
      return { x: e.clientX, y: e.clientY };
    }

    function onPointerDown(e: MouseEvent | TouchEvent) {
      stopMomentum();
      dragState.isDragging = true;
      const pos = getPointerPosition(e);
      dragState.prevX = pos.x;
      dragState.prevY = pos.y;
      dragState.prevTime = performance.now();
      dragState.velocityX = 0;
      dragState.velocityY = 0;
    }

    function onPointerMove(e: MouseEvent | TouchEvent) {
      if (!dragState.isDragging) return;
      const pos = getPointerPosition(e);
      const dx = pos.x - dragState.prevX;
      const dy = pos.y - dragState.prevY;
      const now = performance.now();
      const dt = now - dragState.prevTime;

      if (dt > 0) {
        // Normalize velocity to a 60 FPS timestep
        dragState.velocityX = (dx / dt) * TARGET_FRAME_MS;
        dragState.velocityY = (dy / dt) * TARGET_FRAME_MS;
      }

      dragState.prevX = pos.x;
      dragState.prevY = pos.y;
      dragState.prevTime = now;

      onMoveRef.current(dx, dy);
    }

    function onPointerUp() {
      if (!dragState.isDragging) return;
      dragState.isDragging = false;
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
