"use client";

import { Sun, Moon, Monitor, RotateCcw } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "@/lib/utils";

interface HeaderProps {
  onNewChat: () => void;
  hasMessages: boolean;
}

export function Header({ onNewChat, hasMessages }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  const themes = [
    { value: "light" as const, icon: Sun },
    { value: "dark" as const, icon: Moon },
    { value: "system" as const, icon: Monitor },
  ];

  return (
    <header
      className="relative z-20 flex items-center justify-between px-6 py-4 border-b"
      style={{
        background: "var(--glass)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderColor: "var(--glass-border)",
      }}
    >
      {/* Logo */}
      <a
        href="/"
        className="flex items-center gap-2.5 no-underline group"
        onClick={(e) => {
          e.preventDefault();
          if (hasMessages) onNewChat();
        }}
      >
        <div
          className="w-8 h-8 rounded-[10px] flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105 overflow-hidden"
          style={{ background: "transparent" }}
        >
          <img
            src="/logo.png"
            alt="Loopie.ai Logo"
            className="w-full h-full object-contain"
          />
        </div>
        <span
          className="text-[19px] leading-none tracking-tight"
          style={{
            fontFamily: "var(--font-dm-serif), serif",
            color: "var(--text-1)",
          }}
        >
          Loopie.ai
        </span>
      </a>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* Theme switcher */}
        <div
          className="flex items-center rounded-xl p-0.5 gap-0.5"
          style={{
            background: "var(--glass)",
            border: "1px solid var(--glass-border)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          {themes.map(({ value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTheme(value)}
              className={cn(
                "w-7 h-7 rounded-[9px] flex items-center justify-center transition-all duration-200",
                theme === value
                  ? "shadow-sm"
                  : "hover:opacity-70"
              )}
              style={{
                background:
                  theme === value ? "var(--bg-elevated)" : "transparent",
                color: theme === value ? "var(--text-1)" : "var(--text-3)",
              }}
              title={`${value} mode`}
            >
              <Icon size={13} />
            </button>
          ))}
        </div>

        {/* New chat button */}
        {hasMessages && (
          <button
            onClick={onNewChat}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] transition-all duration-200 hover:opacity-80"
            style={{
              background: "var(--glass)",
              border: "1px solid var(--glass-border)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              color: "var(--text-2)",
            }}
          >
            <RotateCcw size={12} />
            New chat
          </button>
        )}
      </div>
    </header>
  );
}
