"use client";

import { useState, useEffect, useCallback } from "react";
import { StreamingText } from "agent-native";

const sampleText =
  "The quick brown fox jumps over the lazy dog. This is a demonstration of token-by-token streaming text output, similar to what you see in LLM chat interfaces. Each character appears as if it were being generated in real time by an AI model.";

export function StreamingTextBasicDemo() {
  const [content, setContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const startStream = useCallback(() => {
    setContent("");
    setCharIndex(0);
    setIsStreaming(true);
  }, []);

  useEffect(() => {
    if (!isStreaming) return;

    if (charIndex >= sampleText.length) {
      setIsStreaming(false);
      return;
    }

    const timer = setTimeout(() => {
      const charsToAdd = Math.floor(Math.random() * 3) + 1;
      const nextIndex = Math.min(charIndex + charsToAdd, sampleText.length);
      setContent(sampleText.slice(0, nextIndex));
      setCharIndex(nextIndex);
    }, 30 + Math.random() * 50);

    return () => clearTimeout(timer);
  }, [isStreaming, charIndex]);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-surface-2 min-h-[80px]">
        <StreamingText content={content} isStreaming={isStreaming} />
      </div>
      <button
        onClick={startStream}
        disabled={isStreaming}
        className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-colors disabled:opacity-50"
      >
        {isStreaming ? "Streaming..." : content ? "Restart" : "Start streaming"}
      </button>
    </div>
  );
}

export function StreamingTextCursorDemo() {
  return (
    <div className="space-y-4">
      {(["line", "block", "underscore"] as const).map((style) => (
        <div key={style} className="flex items-center gap-4">
          <span className="text-xs font-mono text-muted-foreground w-24">{style}</span>
          <div className="p-3 rounded-lg bg-surface-2 flex-1">
            <StreamingText
              content="Hello, world"
              isStreaming={true}
              cursorStyle={style}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StreamingTextTypingSpeedDemo() {
  const [content, setContent] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const startStream = useCallback(() => {
    setContent("");
    setIsStreaming(true);
    // Simulate instant dump then stop
    setTimeout(() => {
      setContent(sampleText);
      setIsStreaming(false);
    }, 100);
  }, []);

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-surface-2 min-h-[80px]">
        <StreamingText
          content={content}
          isStreaming={isStreaming}
          typingSpeed={60}
          onStreamEnd={() => console.log("Stream complete")}
        />
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={startStream}
          className="text-sm px-4 py-2 rounded-md bg-foreground text-background hover:bg-foreground/80 transition-colors"
        >
          Start (60 chars/sec)
        </button>
        <span className="text-xs text-muted-foreground">
          Content is set instantly, but typing animation plays at 60 chars/sec
        </span>
      </div>
    </div>
  );
}
