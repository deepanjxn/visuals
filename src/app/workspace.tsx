"use client";

import { Canvas } from "@/components/Canvas/Canvas";
import { Viewer } from "@/components/Viewer/Viewer";
import { InteractionProvider } from "@/hooks/useInteraction";

export function Workspace() {
  return (
    <InteractionProvider>
      <Canvas />
      <Viewer />
    </InteractionProvider>
  );
}
