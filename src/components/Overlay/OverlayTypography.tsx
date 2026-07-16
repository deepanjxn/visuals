import type { ReactNode } from "react";

interface TypographyProps {
  children: ReactNode;
  className?: string;
}

export function Hint({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-foreground text-base font-normal leading-relaxed tracking-[-0.04em] ${className}`}>
      {children}
    </span>
  );
}

export function Description({ children, className = "" }: TypographyProps) {
  return (
    <p className={`max-w-[420px] text-right text-foreground/50 text-base font-normal leading-relaxed tracking-[-0.04em] ${className}`}>
      {children}
    </p>
  );
}

export function ButtonLabel({ children, className = "" }: TypographyProps) {
  return (
    <span className={`text-base font-medium tracking-[-0.04em] ${className}`}>
      {children}
    </span>
  );
}

interface KeyboardHintProps {
  letter: string;
  before: string;
  after: string;
}

export function KeyboardHint({ letter, before, after }: KeyboardHintProps) {
  return (
    <span className="text-foreground text-base font-normal leading-relaxed tracking-[-0.04em]">
      {before}
      <span className="text-accent transition-overlay hover:opacity-80 cursor-pointer">
        [{letter}]
      </span>
      {after}
    </span>
  );
}
