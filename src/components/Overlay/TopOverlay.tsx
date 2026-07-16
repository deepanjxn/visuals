import Image from "next/image";
import { Description } from "./OverlayTypography";

export function TopOverlay() {
  return (
    <div className="fixed top-[40px] left-[48px] right-[48px] flex justify-between items-start pointer-events-none">
      <Image
        src="/images/portrait.webp"
        alt="Portrait"
        width={40}
        height={40}
        className="rounded-full object-cover select-none pointer-events-auto transition-overlay hover:opacity-[0.92] cursor-pointer"
        priority
        draggable={false}
        style={{ userSelect: "none" }}
      />
      <Description>
        A visual playground exploring the intersection of generative art, design and interactive experience.
      </Description>
    </div>
  );
}
