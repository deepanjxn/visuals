import type { GridCellData } from "@/types";

export function generatePlaceholderCells(count = 60): GridCellData[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `cell-${String(i).padStart(3, "0")}`,
  }));
}
