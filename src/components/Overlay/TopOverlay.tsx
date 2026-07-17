"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { LINKEDIN_URL } from "@/config/links";
import { Description } from "./OverlayTypography";

interface TopOverlayProps {
  hidden?: boolean;
}

export function TopOverlay({ hidden = false }: TopOverlayProps) {
  return (
    <motion.div
      className="fixed top-[40px] left-[48px] right-[48px] flex justify-between items-start pointer-events-none"
      animate={hidden ? { y: -200, opacity: 0 } : { y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <a
        href={LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Open LinkedIn profile"
        className="pointer-events-auto"
      >
        <Image
          src="/images/portrait.webp"
          alt="Portrait"
          width={40}
          height={40}
          className="rounded-full object-cover select-none transition-overlay hover:opacity-[0.92] cursor-pointer"
          priority
          draggable={false}
          style={{ userSelect: "none" }}
        />
      </a>
      <Description>
        A visual playground exploring the intersection of generative art, design and interactive experience.
      </Description>
    </motion.div>
  );
}
