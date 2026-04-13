"use client";

import { useState, useCallback, useRef } from "react";
import { Message } from "@/lib/types";
import { generateId } from "@/lib/utils";

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0) || isLoading) return;

    setError(null);
    
    // Create UI content showing files if any
    let displayContent = content.trim();
    if (files && files.length > 0) {
      const fileNames = files.map(f => f.name).join(", ");
      displayContent += `\n[Attached: ${fileNames}]`;
    }

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: displayContent,
      timestamp: new Date(),
    };

    const assistantId = generateId();
    const assistantMessage: Message = {
      id: assistantId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setIsLoading(true);

    try {
      abortRef.current = new AbortController();

      const formData = new FormData();
      formData.append("message", content);
      if (files && files.length > 0) {
        files.forEach((file) => {
          formData.append("files", file);
        });
      }
      
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      formData.append("history", JSON.stringify(history));

      const res = await fetch("/api/chat", {
        method: "POST",
        body: formData,
        signal: abortRef.current.signal,
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") break;

          try {
            const parsed = JSON.parse(data);
            if (parsed.text) {
              accumulated += parsed.text;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantId
                    ? { ...m, content: accumulated }
                    : m
                )
              );
            }
          } catch {}
        }
      }

      // Mark streaming complete
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId ? { ...m, isStreaming: false } : m
        )
      );
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      const msg = "Something went wrong. Please try again.";
      setError(msg);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantId
            ? { ...m, content: msg, isStreaming: false }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const clearMessages = useCallback(() => {
    abortRef.current?.abort();
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  const stopStreaming = useCallback(() => {
    abortRef.current?.abort();
    setIsLoading(false);
    setMessages((prev) =>
      prev.map((m) => ({ ...m, isStreaming: false }))
    );
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
    stopStreaming,
  };
}
