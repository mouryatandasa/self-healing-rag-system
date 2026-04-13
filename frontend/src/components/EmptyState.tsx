"use client";

interface EmptyStateProps {
  onSuggestion: (text: string) => void;
}

const SUGGESTIONS = [
  "Explain quantum computing simply",
  "Write a short poem about rain",
  "Help me debug my Python code",
  "What's the best way to learn design?",
  "Summarize the key ideas of stoicism",
  "Give me a productivity system that actually works",
];

export function EmptyState({ onSuggestion }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[55vh] text-center gap-5 px-4 animate-fade-up">
      {/* Icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center"
        style={{
          background: "var(--glass)",
          border: "1px solid var(--glass-border)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "var(--shadow-sm)",
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
          style={{ color: "var(--text-2)" }}
        >
          <path d="M12 3C7.03 3 3 6.582 3 11c0 2.13.9 4.06 2.37 5.5L4 21l5.09-1.97C10.01 19.66 10.99 20 12 20c4.97 0 9-3.582 9-8s-4.03-9-9-9z" />
        </svg>
      </div>

      {/* Heading */}
      <div className="space-y-1.5">
        <h1
          className="text-[30px] leading-tight tracking-tight"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            color: "var(--text-1)",
          }}
        >
          What&apos;s on your mind?
        </h1>
        <p
          className="text-[14px] max-w-xs leading-relaxed"
          style={{ color: "var(--text-3)" }}
        >
          Ask anything — ideas, writing, code, analysis, or just a
          conversation.
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 justify-center max-w-lg mt-1">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            onClick={() => onSuggestion(s)}
            className="px-4 py-2 rounded-full text-[13px] transition-all duration-200 hover:-translate-y-px hover:shadow-sm active:scale-95 whitespace-nowrap"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "var(--text-2)",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
