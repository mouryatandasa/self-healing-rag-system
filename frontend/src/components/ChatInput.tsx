"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowUp, Square, Paperclip, X } from "lucide-react";

interface ChatInputProps {
  onSend: (text: string, files?: File[]) => void;
  onStop: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function ChatInput({ onSend, onStop, isLoading, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = Math.min(el.scrollHeight, 140) + "px";
  }, []);

  useEffect(() => {
    resize();
  }, [value, resize]);

  const handleSend = useCallback(() => {
    if (!value.trim() && attachments.length === 0 || isLoading) return;
    
    onSend(value, attachments);
    setValue("");
    setAttachments([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }, [value, attachments, isLoading, onSend]);

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const canSend = (value.trim().length > 0 || attachments.length > 0) && !isLoading;

  return (
    <div
      className="relative z-20 px-4 pb-5 pt-3"
      style={{
        background: "linear-gradient(to top, var(--bg-primary) 65%, transparent)",
      }}
    >
      <div className="max-w-[700px] mx-auto">
        {/* Input container */}
        <div
          className="flex flex-col gap-2 px-4 py-2.5 rounded-[26px] transition-all duration-200"
          style={{
            background: "var(--input-bg)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            boxShadow: "var(--shadow-lg)",
          }}
          onFocus={() => {}}
        >
          {/* Attachments UI */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1 pb-2">
              {attachments.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] animate-fade-in"
                  style={{
                    background: "var(--glass)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-2)",
                  }}
                >
                  <Paperclip size={12} />
                  <span className="max-w-[120px] truncate">{file.name}</span>
                  <button
                    onClick={() => removeAttachment(i)}
                    className="p-0.5 hover:opacity-70 transition-opacity"
                    title="Remove file"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              multiple
              className="hidden"
              accept=".pdf,.doc,.docx,.txt,.csv"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-opacity hover:opacity-70 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                color: "var(--text-3)",
                marginBottom: "1px",
              }}
              title="Attach documents"
              disabled={disabled}
            >
              <Paperclip size={18} strokeWidth={2} />
            </button>

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Message Loopie…"
              rows={1}
              disabled={disabled}
              className="flex-1 bg-transparent border-none outline-none resize-none text-[14.5px] leading-[1.55] py-1 min-h-[32px]"
              style={{
                color: "var(--text-1)",
                caretColor: "var(--accent)",
                maxHeight: 140,
                overflowY: "auto",
              }}
            />

            {/* Send / Stop button */}
            <button
              onClick={isLoading ? onStop : handleSend}
              disabled={!isLoading && !canSend}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{
                background: isLoading
                  ? "var(--accent-soft)"
                  : canSend
                  ? "var(--text-1)"
                  : "var(--text-1)",
                color: isLoading ? "var(--accent)" : "var(--bg-primary)",
                marginBottom: "1px",
              }}
              onMouseEnter={(e) => {
                if (!isLoading && canSend) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    "var(--accent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  (e.currentTarget as HTMLButtonElement).style.background =
                    canSend ? "var(--text-1)" : "var(--text-1)";
                }
              }}
            >
              {isLoading ? <Square size={14} /> : <ArrowUp size={16} strokeWidth={2.5} />}
            </button>
          </div>
        </div>

        {/* Hint */}
        <p
          className="text-center text-[11.5px] mt-2.5 tracking-wide"
          style={{ color: "var(--text-3)" }}
        >
          Loopie can make mistakes — verify important info.
        </p>
      </div>
    </div>
  );
}
