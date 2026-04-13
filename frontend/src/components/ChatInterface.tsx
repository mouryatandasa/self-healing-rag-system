"use client";

import { useCallback } from "react";
import { useChat } from "@/hooks/useChat";
import { Header } from "./Header";
import { MessageList } from "./MessageList";
import { ChatInput } from "./ChatInput";
import { BackgroundOrbs } from "./BackgroundOrbs";

export function ChatInterface() {
  const { messages, isLoading, sendMessage, clearMessages, stopStreaming } =
    useChat();

  const handleSuggestion = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <BackgroundOrbs />

      <Header
        onNewChat={clearMessages}
        hasMessages={messages.length > 0}
      />

      <main className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <MessageList messages={messages} onSuggestion={handleSuggestion} />
        <ChatInput
          onSend={sendMessage}
          onStop={stopStreaming}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
}
