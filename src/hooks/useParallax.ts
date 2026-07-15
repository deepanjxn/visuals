"use client";

import { useRef, useEffect } from "react";

const LERP = 0.08;
const DESKTOP_MAX = 20;
const TABLET_MAX = 14;

export function useParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const vw = window.innerWidth;

    if (isReduced || isTouch || vw < 768) return;

    const maxShift = vw >= 1440 ? DESKTOP_MAX : TABLET_MAX;

    function onMouseMove(e: MouseEvent) {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      state.current.tx = ((e.clientX - halfW) / halfW) * maxShift;
      state.current.ty = ((e.clientY - halfH) / halfH) * maxShift;
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    let rafId: number;

    function tick() {
      const s = state.current;
      s.x += (s.tx - s.x) * LERP;
      s.y += (s.ty - s.y) * LERP;

      const el = ref.current;
      if (el) {
        el.style.transform = `translate3d(${s.x}px, ${s.y}px, 0)`;
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return ref;
}
