export const SITE_NAME = "art.d-s.me";

export const WORLD_SIZE = 12000;
export const WORLD_CENTER = WORLD_SIZE / 2;

export interface BreakpointValues {
  frameSize: number;
  padding: number;
}

export function getBreakpointValues(vw: number): BreakpointValues {
  if (vw >= 2560) return { frameSize: 560, padding: 40 };
  if (vw >= 1920) return { frameSize: 288, padding: 24 };
  if (vw >= 1440) return { frameSize: 386, padding: 24 };
  if (vw >= 768) return { frameSize: 228, padding: 32 };
  return { frameSize: 168, padding: 24 };
}

export function getCameraStart(vw: number): number {
  return (WORLD_SIZE - getBreakpointValues(vw).frameSize) / 2;
}
