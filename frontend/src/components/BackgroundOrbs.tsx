export function BackgroundOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      {/* Orb 1 - Blue/cool top-left */}
      <div
        className="absolute rounded-full animate-drift1"
        style={{
          width: 560,
          height: 560,
          top: -180,
          left: -120,
          background:
            "radial-gradient(circle at center, #bad4ff 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.28,
        }}
      />
      {/* Orb 2 - Lavender bottom-right */}
      <div
        className="absolute rounded-full animate-drift2"
        style={{
          width: 420,
          height: 420,
          bottom: -100,
          right: -80,
          background:
            "radial-gradient(circle at center, #e4dcff 0%, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.24,
        }}
      />
      {/* Orb 3 - Warm peach mid */}
      <div
        className="absolute rounded-full animate-drift3"
        style={{
          width: 280,
          height: 280,
          top: "38%",
          right: "22%",
          background:
            "radial-gradient(circle at center, #ffd6b3 0%, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.20,
        }}
      />

      {/* Dark mode overrides via CSS class swap */}
      <style dangerouslySetInnerHTML={{ __html: `
        .dark div[style*="bad4ff"] { opacity: 0.10 !important; background: radial-gradient(circle at center, #1a44bb 0%, transparent 70%) !important; }
        .dark div[style*="e4dcff"] { opacity: 0.09 !important; background: radial-gradient(circle at center, #3d2299 0%, transparent 70%) !important; }
        .dark div[style*="ffd6b3"] { opacity: 0.08 !important; background: radial-gradient(circle at center, #994400 0%, transparent 70%) !important; }
      ` }} />
    </div>
  );
}
