export interface CanvasState {
  isReady: boolean;
  isInteracting: boolean;
}

export interface CanvasContextValue {
  state: CanvasState;
  worldRef: React.RefObject<HTMLDivElement | null>;
}
