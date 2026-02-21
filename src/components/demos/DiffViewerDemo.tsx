"use client";

import { useState } from "react";
import { DiffViewer } from "agent-native";
import type { DiffFile } from "agent-native";

const sampleFile: DiffFile = {
  oldPath: "src/auth/middleware.ts",
  newPath: "src/auth/middleware.ts",
  status: "modified",
  hunks: [
    {
      header: "@@ -1,8 +1,10 @@",
      oldStart: 1,
      oldCount: 8,
      newStart: 1,
      newCount: 10,
      lines: [
        { type: "context", content: 'import { Request, Response, NextFunction } from "express";', oldLineNumber: 1, newLineNumber: 1 },
        { type: "remove", content: 'import { verifyToken } from "./jwt";', oldLineNumber: 2 },
        { type: "add", content: 'import { verifyToken, refreshToken } from "./jwt";', newLineNumber: 2 },
        { type: "add", content: 'import { RateLimiter } from "./rate-limit";', newLineNumber: 3 },
        { type: "context", content: "", oldLineNumber: 3, newLineNumber: 4 },
        { type: "context", content: "export function authMiddleware(req: Request, res: Response, next: NextFunction) {", oldLineNumber: 4, newLineNumber: 5 },
        { type: "remove", content: '  const token = req.headers.authorization?.split(" ")[1];', oldLineNumber: 5 },
        { type: "add", content: '  const token = req.headers.authorization?.replace("Bearer ", "");', newLineNumber: 6 },
        { type: "context", content: "  if (!token) {", oldLineNumber: 6, newLineNumber: 7 },
        { type: "context", content: '    return res.status(401).json({ error: "Unauthorized" });', oldLineNumber: 7, newLineNumber: 8 },
        { type: "context", content: "  }", oldLineNumber: 8, newLineNumber: 9 },
      ],
    },
    {
      header: "@@ -12,4 +14,8 @@",
      oldStart: 12,
      oldCount: 4,
      newStart: 14,
      newCount: 8,
      lines: [
        { type: "context", content: "  try {", oldLineNumber: 12, newLineNumber: 14 },
        { type: "remove", content: "    const decoded = verifyToken(token);", oldLineNumber: 13 },
        { type: "add", content: "    let decoded = verifyToken(token);", newLineNumber: 15 },
        { type: "add", content: "    if (!decoded) {", newLineNumber: 16 },
        { type: "add", content: "      decoded = refreshToken(token);", newLineNumber: 17 },
        { type: "add", content: "    }", newLineNumber: 18 },
        { type: "context", content: "    req.user = decoded;", oldLineNumber: 14, newLineNumber: 19 },
        { type: "context", content: "    next();", oldLineNumber: 15, newLineNumber: 20 },
      ],
    },
  ],
};

const addedFile: DiffFile = {
  oldPath: "/dev/null",
  newPath: "src/auth/rate-limit.ts",
  status: "added",
  hunks: [
    {
      header: "@@ -0,0 +1,5 @@",
      oldStart: 0,
      oldCount: 0,
      newStart: 1,
      newCount: 5,
      lines: [
        { type: "add", content: "export class RateLimiter {", newLineNumber: 1 },
        { type: "add", content: "  private requests = new Map<string, number>();", newLineNumber: 2 },
        { type: "add", content: "", newLineNumber: 3 },
        { type: "add", content: "  check(ip: string): boolean { return true; }", newLineNumber: 4 },
        { type: "add", content: "}", newLineNumber: 5 },
      ],
    },
  ],
};

export function DiffViewerBasicDemo() {
  const [view, setView] = useState<"unified" | "split">("unified");

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(["unified", "split"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setView(v)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              view === v
                ? "border-foreground bg-foreground/10 text-foreground"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {v}
          </button>
        ))}
      </div>
      <DiffViewer file={sampleFile} view={view} />
    </div>
  );
}

export function DiffViewerAddedFileDemo() {
  return <DiffViewer file={addedFile} />;
}

export function DiffViewerNoHeaderDemo() {
  return <DiffViewer file={sampleFile} showHeader={false} maxHeight={200} />;
}
