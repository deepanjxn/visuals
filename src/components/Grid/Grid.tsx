"use client";

import { useRef, useEffect } from "react";
import { WORLD_CENTER, getBreakpointValues } from "@/lib/constants";

const BUFFER = 4;
const POOL_SIZE = 800;

export function Grid({
  worldRef,
}: {
  worldRef: React.RefObject<HTMLDivElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const IMAGES = [
      "/images/visuals/background.webp",
      "/images/visuals/portrait.webp",
      "/images/visuals/test.webp",
    ];

    const pool: HTMLDivElement[] = [];

    for (let i = 0; i < POOL_SIZE; i++) {
      const cell = document.createElement("div");
      cell.style.position = "absolute";
      cell.style.boxSizing = "border-box";

      const wrapper = document.createElement("div");
      wrapper.style.width = "100%";
      wrapper.style.height = "100%";
      wrapper.style.display = "flex";
      wrapper.style.alignItems = "center";
      wrapper.style.justifyContent = "center";

      const img = document.createElement("img");
      img.style.maxWidth = "100%";
      img.style.maxHeight = "100%";
      img.style.width = "auto";
      img.style.height = "auto";
      img.style.objectFit = "contain";
      img.style.display = "block";
      img.style.borderRadius = "8px";
      img.draggable = false;

      wrapper.appendChild(img);
      cell.appendChild(wrapper);
      container.appendChild(cell);
      pool.push(cell);
    }

    let rafId: number;

    function tick() {
      const world = worldRef.current;
      if (world) {
        const transform = world.style.transform;
        let cx = 0;
        let cy = 0;
        if (transform) {
          const match = transform.match(
            /translate3d\(([-\d.]+)px,\s*([-\d.]+)px/
          );
          if (match) {
            cx = parseFloat(match[1]);
            cy = parseFloat(match[2]);
          }
        }

        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const bp = getBreakpointValues(vw);
        const step = bp.frameSize;
        const pad = bp.frameSize * 0.15;

        const centerX = vw / 2;
        const centerY = vh / 2;

        const colStart =
          Math.ceil((-centerX - cx + WORLD_CENTER) / step) - BUFFER;
        const colEnd =
          Math.floor((vw - centerX - cx + WORLD_CENTER) / step) + BUFFER;
        const rowStart =
          Math.ceil((-centerY - cy + WORLD_CENTER) / step) - BUFFER;
        const rowEnd =
          Math.floor((vh - centerY - cy + WORLD_CENTER) / step) + BUFFER;

        let idx = 0;
        for (let col = colStart; col <= colEnd; col++) {
          for (let row = rowStart; row <= rowEnd; row++) {
            if (idx >= pool.length) break;
            const el = pool[idx];
            el.style.width = `${bp.frameSize}px`;
            el.style.height = `${bp.frameSize}px`;
            el.style.padding = `${pad}px`;
            el.style.transform = `translate3d(${col * step}px, ${row * step}px, 0)`;
            el.dataset.col = String(col);
            el.dataset.row = String(row);
            el.style.display = "";
            const imageIndex = Math.abs(col * 31 + row * 17) % IMAGES.length;
            (el.firstChild?.firstChild as HTMLImageElement | null)!.src = IMAGES[imageIndex];
            idx++;
          }
        }

        for (let i = idx; i < pool.length; i++) {
          pool[i].style.display = "none";
          delete pool[i].dataset.col;
          delete pool[i].dataset.row;
        }
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      for (const el of pool) {
        el.remove();
      }
    };
  }, [worldRef]);

  return (
    <div
      ref={containerRef}
      className="absolute"
      style={{
        left: `${WORLD_CENTER}px`,
        top: `${WORLD_CENTER}px`,
      }}
    />
  );
}
