"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  createElement,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { Artwork } from "@/types/artwork";

// --- Types ---

export type InteractionState = "idle" | "focused";

interface InteractionContextValue {
  state: InteractionState;
  selectedArtwork: Artwork | null;
  open: (artwork: Artwork) => void;
  close: () => void;
}

// --- Artwork Registry ---

const ARTWORK_COUNT = 100;

function generateArtworks(): Artwork[] {
  return Array.from({ length: ARTWORK_COUNT }, (_, i) => ({
    id: `artwork-${String(i).padStart(3, "0")}`,
    title: `Artwork ${i + 1}`,
    type: "image" as const,
    src: "",
  }));
}

class ArtworkRegistry {
  private artworks: Artwork[];

  constructor() {
    this.artworks = generateArtworks();
  }

  resolve(col: number, row: number): Artwork {
    const index = Math.abs((col * 31 + row * 17)) % ARTWORK_COUNT;
    return this.artworks[index];
  }
}

// --- Context ---

const InteractionContext = createContext<InteractionContextValue | null>(null);

export function InteractionProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InteractionState>("idle");
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const registryRef = useRef(new ArtworkRegistry());

  const open = useCallback((artwork: Artwork) => {
    setSelectedArtwork(artwork);
    setState("focused");
  }, []);

  const close = useCallback(() => {
    setState("idle");
  }, []);

  useEffect(() => {
    const registry = registryRef.current;
    let startX = 0;
    let startY = 0;
    let isDrag = false;

    function onPointerDown(e: PointerEvent) {
      startX = e.clientX;
      startY = e.clientY;
      isDrag = false;
    }

    function onPointerMove(e: PointerEvent) {
      if (!isDrag) {
        const dx = Math.abs(e.clientX - startX);
        const dy = Math.abs(e.clientY - startY);
        if (dx > 5 || dy > 5) isDrag = true;
      }
    }

    function onClick(e: MouseEvent) {
      if (isDrag) return;
      const cell = (e.target as HTMLElement).closest<HTMLElement>("[data-col]");
      if (!cell) return;
      const col = parseInt(cell.dataset.col ?? "", 10);
      const row = parseInt(cell.dataset.row ?? "", 10);
      if (isNaN(col) || isNaN(row)) return;
      const artwork = registry.resolve(col, row);
      open(artwork);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  return createElement(
    InteractionContext.Provider,
    { value: { state, selectedArtwork, open, close } },
    children,
  );
}

export function useInteraction(): InteractionContextValue {
  const ctx = useContext(InteractionContext);
  if (!ctx) throw new Error("useInteraction must be used within InteractionProvider");
  return ctx;
}
