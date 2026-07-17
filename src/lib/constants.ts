export const SITE_NAME = "art.d-s.me";

export const WORLD_SIZE = 12000;
export const WORLD_CENTER = WORLD_SIZE / 2;

export interface BreakpointValues {
  frameSize: number;
  gap: number;
}

export function getBreakpointValues(vw: number): BreakpointValues {
  if (vw >= 2560) return { frameSize: 480, gap: 80 };
  if (vw >= 1920) return { frameSize: 240, gap: 48 };
  if (vw >= 1440) return { frameSize: 338, gap: 48 };
  if (vw >= 768) return { frameSize: 164, gap: 64 };
  return { frameSize: 120, gap: 48 };
}

export function getCameraStart(vw: number): number {
  return (WORLD_SIZE - getBreakpointValues(vw).frameSize) / 2;
}
