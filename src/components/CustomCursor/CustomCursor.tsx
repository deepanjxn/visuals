"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const isHoveringRef = useRef(false);
  const isPointerDownRef = useRef(false);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    const styleEl = document.createElement("style");
    styleEl.id = "custom-cursor-style";
    styleEl.textContent =
      "main:not(:active) [data-col]:hover { cursor: none !important; }";
    document.head.appendChild(styleEl);

    const outer = outerRef.current!;
    const circle = circleRef.current!;
    let rafId: number;

    function tick() {
      const c = currentRef.current;
      const t = targetRef.current;
      c.x += (t.x - c.x) * 0.2;
      c.y += (t.y - c.y) * 0.2;
      outer.style.transform = `translate3d(${c.x - 13}px, ${c.y - 13}px, 0)`;
      rafId = requestAnimationFrame(tick);
    }
    rafId = requestAnimationFrame(tick);

    function onPointerDown() {
      isPointerDownRef.current = true;
      if (isHoveringRef.current) {
        isHoveringRef.current = false;
        circle.style.transform = "scale(0)";
        circle.style.opacity = "0";
      }
    }

    function onPointerUp(e: PointerEvent) {
      isPointerDownRef.current = false;
      const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-col]");
      if (cell) {
        isHoveringRef.current = true;
        circle.style.transform = "scale(1)";
        circle.style.opacity = "1";
        targetRef.current.x = e.clientX;
        targetRef.current.y = e.clientY;
      }
    }

    function onPointerMove(e: PointerEvent) {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    }

    function onPointerOver(e: PointerEvent) {
      if (isPointerDownRef.current) return;
      if ((e.target as HTMLElement).closest("[data-col]")) {
        if (!isHoveringRef.current) {
          isHoveringRef.current = true;
          circle.style.transform = "scale(1)";
          circle.style.opacity = "1";
        }
      }
    }

    function onPointerOut(e: PointerEvent) {
      const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-col]");
      if (!cell) return;
      const related = e.relatedTarget as HTMLElement | null;
      if (!cell.contains(related)) {
        isHoveringRef.current = false;
        circle.style.transform = "scale(0)";
        circle.style.opacity = "0";
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      styleEl.remove();
    };
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 10000,
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    >
      <div
        ref={circleRef}
        style={{
          width: "26px",
          height: "26px",
          borderRadius: "50%",
          backgroundColor: "#fff",
          transform: "scale(0)",
          opacity: 0,
          transition: "transform 200ms ease-out, opacity 200ms ease-out",
        }}
      />
    </div>
  );
}
