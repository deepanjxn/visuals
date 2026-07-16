export interface Artwork {
  id: string;
  title?: string;
  src?: string;
  type?: "image" | "video" | "gif";
  width?: number;
  height?: number;
  metadata?: Record<string, string>;
}

export type ArtworkStatus = "idle" | "loading" | "loaded" | "error";

export interface ArtworkLoadState {
  status: ArtworkStatus;
  progress: number;
}
