export function TypingIndicator() {
  return (
    <div className="flex items-center gap-[5px] py-1 px-0.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-blink"
          style={{
            background: "var(--text-3)",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}
