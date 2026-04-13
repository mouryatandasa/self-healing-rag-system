# Loopie.ai

A minimal, premium AI chat interface built with Next.js 14, TypeScript, Tailwind CSS, and the Anthropic API.

## Features

- **Real-time streaming** — responses stream token by token via Server-Sent Events
- **Light / Dark / System** theme — persisted to localStorage
- **Glassmorphism design** — soft blur panels, animated background orbs
- **Markdown rendering** — bold, italic, inline code, code blocks, lists
- **Auto-resizing input** — textarea grows up to 4 lines
- **Stop generation** — cancel mid-stream with the stop button
- **Suggestion chips** — quick-start prompts on the empty state
- **Fully responsive** — works on mobile and desktop

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Anthropic SDK](https://github.com/anthropics/anthropic-sdk-python)
- [Lucide React](https://lucide.dev/)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your API key

Copy `.env.local` and add your Anthropic API key:

```bash
cp .env.local .env.local
```

Edit `.env.local`:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts   # Streaming API endpoint
│   ├── globals.css          # Design tokens + global styles
│   ├── layout.tsx           # Root layout with fonts
│   └── page.tsx             # Home page
├── components/
│   ├── BackgroundOrbs.tsx   # Animated gradient orbs
│   ├── ChatInput.tsx        # Auto-resize textarea + send button
│   ├── ChatInterface.tsx    # Main layout orchestrator
│   ├── EmptyState.tsx       # Welcome screen + suggestions
│   ├── Header.tsx           # Logo + theme toggle + new chat
│   ├── MessageBubble.tsx    # Individual message with markdown
│   ├── MessageList.tsx      # Scrollable message feed
│   ├── ThemeProvider.tsx    # Dark/light/system theme context
│   └── TypingIndicator.tsx  # Three-dot bounce animation
├── hooks/
│   └── useChat.ts           # Chat state + streaming logic
└── lib/
    ├── types.ts             # TypeScript interfaces
    └── utils.ts             # cn(), generateId(), parseMarkdown()
```

## Deployment

Deploy to [Vercel](https://vercel.com) in one click:

1. Push to GitHub
2. Import in Vercel
3. Add `ANTHROPIC_API_KEY` environment variable
4. Deploy

## Customization

- **Model** — change `claude-sonnet-4-20250514` in `src/app/api/chat/route.ts`
- **System prompt** — edit the `system` field in the same file
- **Suggestions** — edit the `SUGGESTIONS` array in `src/components/EmptyState.tsx`
- **Colors** — edit CSS variables in `src/app/globals.css`
