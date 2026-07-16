export type ViewerState = "closed" | "opening" | "open" | "closing";

export interface ViewerConfig {
  transitionDuration: number;
  overlayColor: string;
}

export interface ViewerContextValue {
  state: ViewerState;
  activeArtworkId: string | null;
  open: (artworkId: string) => void;
  close: () => void;
}
