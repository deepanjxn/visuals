export interface CameraState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
}

export function createCamera(x = 0, y = 0): CameraState {
  return { x, y, targetX: x, targetY: y };
}

export function updateCamera(camera: CameraState, lerpFactor: number): boolean {
  const dx = camera.targetX - camera.x;
  const dy = camera.targetY - camera.y;

  if (Math.abs(dx) < 0.01 && Math.abs(dy) < 0.01) {
    camera.x = camera.targetX;
    camera.y = camera.targetY;
    return false;
  }

  camera.x += dx * lerpFactor;
  camera.y += dy * lerpFactor;
  return true;
}

export function cameraTransform(camera: CameraState): string {
  return `translate3d(${camera.x}px, ${camera.y}px, 0)`;
}
