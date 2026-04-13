"use client";

import { Message } from "@/lib/types";
import { formatTime, parseMarkdown } from "@/lib/utils";
import { TypingIndicator } from "./TypingIndicator";

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isEmpty = !message.content && message.isStreaming;

  return (
    <div
      className={`flex items-end gap-2.5 animate-fade-up ${
        isUser ? "flex-row-reverse" : "flex-row"
      }`}
    >
      {/* Avatar */}
      <div
        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-[11px] font-medium"
        style={
          isUser
            ? {
                background: "var(--accent-soft)",
                color: "var(--accent)",
              }
            : {
                background: "var(--text-1)",
                color: "var(--bg-primary)",
              }
        }
      >
        {isUser ? "You" : "L"}
      </div>

      {/* Bubble */}
      <div
        className="max-w-[82%] px-4 py-3 text-[14.5px] leading-relaxed"
        style={
          isUser
            ? {
                background: "var(--user-bg)",
                color: "var(--user-text)",
                borderRadius: "22px 22px 6px 22px",
                boxShadow: "var(--shadow-sm)",
              }
            : {
                background: "var(--ai-bg)",
                color: "var(--text-1)",
                border: "1px solid var(--glass-border)",
                borderRadius: "22px 22px 22px 6px",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "var(--shadow-sm)",
              }
        }
      >
        {isEmpty ? (
          <TypingIndicator />
        ) : (
          <div className="relative">
            {isUser ? (
              <span style={{ whiteSpace: "pre-wrap" }}>{message.content}</span>
            ) : (
              <span
                className="prose-message"
                dangerouslySetInnerHTML={{
                  __html: parseMarkdown(message.content),
                }}
              />
            )}
            {/* Streaming cursor */}
            {message.isStreaming && !isEmpty && (
              <span className="cursor-blink" />
            )}
          </div>
        )}
      </div>

      {/* Timestamp */}
      {!message.isStreaming && (
        <span
          className="text-[11px] pb-0.5 whitespace-nowrap"
          style={{ color: "var(--text-3)" }}
        >
          {formatTime(message.timestamp)}
        </span>
      )}
    </div>
  );
}
