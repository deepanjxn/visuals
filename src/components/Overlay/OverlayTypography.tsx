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
  href?: string;
}

export function KeyboardHint({ letter, before, after, href }: KeyboardHintProps) {
  const content = (
    <>
      {before}
      <span className="text-accent transition-overlay hover:opacity-80">
        [{letter}]
      </span>
      {after}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-foreground text-base font-normal leading-relaxed tracking-[-0.04em] pointer-events-auto no-underline transition-overlay hover:opacity-[0.92] cursor-pointer"
      >
        {content}
      </a>
    );
  }

  return (
    <span className="text-foreground text-base font-normal leading-relaxed tracking-[-0.04em]">
      {content}
    </span>
  );
}
