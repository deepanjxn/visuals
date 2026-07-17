"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { PORTFOLIO_URL, RESUME_URL, CONTACT_URL } from "@/config/links";
import { KeyboardHint, ButtonLabel } from "./OverlayTypography";

interface BottomOverlayProps {
  hidden?: boolean;
}

export function BottomOverlay({ hidden = false }: BottomOverlayProps) {
  return (
    <motion.div
      className="fixed bottom-[32px] left-[48px] right-[48px] flex justify-between items-center pointer-events-none"
      animate={hidden ? { y: 200, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <KeyboardHint letter="R" before="Press " after=" View Resume" href={RESUME_URL} />
      <a
        href={PORTFOLIO_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open Portfolio"
        className="h-14 pl-7 pr-[22px] bg-foreground text-background rounded-full inline-flex items-center gap-2 pointer-events-auto transition-overlay hover:bg-white hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
      >
        <ButtonLabel>VIEW PORTFOLIO</ButtonLabel>
        <ArrowUpRight size={16} />
      </a>
      <KeyboardHint letter="C" before="Press " after=" To Contact" href={CONTACT_URL} />
    </motion.div>
  );
}
