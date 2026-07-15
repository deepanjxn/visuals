import type { ReactNode } from "react";

interface CardPaddingProps {
  children: ReactNode;
}

export function CardPadding({ children }: CardPaddingProps) {
  return <div className="size-full p-4 sm:p-5 lg:p-6">{children}</div>;
}
