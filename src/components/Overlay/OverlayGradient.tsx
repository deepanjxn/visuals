export function OverlayGradient() {
  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-[180px] pointer-events-none"
        style={{ background: "linear-gradient(to bottom, #191919 0%, transparent 100%)" }}
      />
      <div
        className="fixed bottom-0 left-0 w-full h-[220px] pointer-events-none"
        style={{ background: "linear-gradient(to top, #191919 0%, transparent 100%)" }}
      />
    </>
  );
}
