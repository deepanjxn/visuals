import { Briefcase, Phone, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_URL, RESUME_URL, CONTACT_URL } from "@/config/links";

export function BottomCompactOverlay() {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 px-[20px] pointer-events-none"
      style={{ paddingBottom: "calc(32px + env(safe-area-inset-bottom, 0px))" }}
    >
      <div className="flex items-center justify-between pointer-events-auto">
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View Resume"
          className="w-12 h-12 bg-surface rounded-full flex items-center justify-center transition-overlay hover:opacity-[0.92] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
        >
          <Briefcase size={20} className="text-foreground" />
        </a>
        <a
          href={PORTFOLIO_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open Portfolio"
          className="h-12 px-6 bg-foreground text-background rounded-full inline-flex items-center gap-2 transition-overlay hover:bg-white hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
        >
          <span className="text-xs font-medium tracking-[-0.04em]">VIEW PORTFOLIO</span>
          <ArrowUpRight size={16} />
        </a>
        <a
          href={CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact"
          className="w-12 h-12 bg-surface rounded-full flex items-center justify-center transition-overlay hover:opacity-[0.92] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer"
        >
          <Phone size={20} className="text-foreground" />
        </a>
      </div>
    </div>
  );
}
