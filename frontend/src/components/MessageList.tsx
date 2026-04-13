"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/lib/types";
import { MessageBubble } from "./MessageBubble";
import { EmptyState } from "./EmptyState";

interface MessageListProps {
  messages: Message[];
  onSuggestion: (text: string) => void;
}

export function MessageList({ messages, onSuggestion }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new content arrives
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
    if (isNearBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto"
      style={{ paddingBottom: "16px" }}
    >
      <div
        className="max-w-[700px] mx-auto px-4 pt-8 flex flex-col gap-1.5"
        style={{ minHeight: "100%" }}
      >
        {messages.length === 0 ? (
          <EmptyState onSuggestion={onSuggestion} />
        ) : (
          <>
            {messages.map((message, index) => {
              const prevMessage = messages[index - 1];
              const showDivider =
                index > 0 &&
                prevMessage &&
                new Date(message.timestamp).toDateString() !==
                  new Date(prevMessage.timestamp).toDateString();

              return (
                <div key={message.id}>
                  {showDivider && (
                    <div
                      className="flex items-center gap-3 my-4 text-xs"
                      style={{ color: "var(--text-3)" }}
                    >
                      <div
                        className="flex-1 h-px"
                        style={{ background: "var(--glass-border)" }}
                      />
                      {new Date(message.timestamp).toLocaleDateString([], {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                      <div
                        className="flex-1 h-px"
                        style={{ background: "var(--glass-border)" }}
                      />
                    </div>
                  )}
                  <MessageBubble message={message} />
                </div>
              );
            })}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
}
