export const LERP_FACTOR = 0.08;
export const MOMENTUM_DECAY = 0.92;
export const VELOCITY_THRESHOLD = 0.1;

export function dampen(velocity: number, decay = MOMENTUM_DECAY): number {
  return velocity * decay;
}

export function shouldStop(velocity: number): boolean {
  return Math.abs(velocity) < VELOCITY_THRESHOLD;
}
