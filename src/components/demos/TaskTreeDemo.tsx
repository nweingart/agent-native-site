"use client";

import { useState, useEffect } from "react";
import { TaskTree } from "agent-native";
import type { TaskNode } from "agent-native";

const staticTasks: TaskNode[] = [
  {
    id: "1",
    label: "Refactor auth module",
    status: "running",
    description: "Decompose the monolithic auth into smaller services",
    children: [
      {
        id: "1-1",
        label: "Extract token service",
        status: "complete",
        startedAt: Date.now() - 45000,
        completedAt: Date.now() - 30000,
      },
      {
        id: "1-2",
        label: "Update middleware",
        status: "running",
        startedAt: Date.now() - 30000,
        children: [
          { id: "1-2-1", label: "Parse JWT claims", status: "complete", startedAt: Date.now() - 25000, completedAt: Date.now() - 15000 },
          { id: "1-2-2", label: "Add rate limiting", status: "running", startedAt: Date.now() - 10000 },
          { id: "1-2-3", label: "Handle token refresh", status: "pending" },
        ],
      },
      {
        id: "1-3",
        label: "Write integration tests",
        status: "pending",
      },
    ],
  },
  {
    id: "2",
    label: "Update API docs",
    status: "pending",
    description: "Regenerate OpenAPI spec from new auth endpoints",
  },
];

export function TaskTreeBasicDemo() {
  return <TaskTree tasks={staticTasks} showElapsedTime defaultExpandAll />;
}

export function TaskTreeAnimatedDemo() {
  const [tasks, setTasks] = useState<TaskNode[]>([
    { id: "1", label: "Plan implementation", status: "complete" },
    { id: "2", label: "Write code", status: "running", children: [
      { id: "2-1", label: "Create component", status: "complete" },
      { id: "2-2", label: "Add styles", status: "running" },
      { id: "2-3", label: "Write tests", status: "pending" },
    ]},
    { id: "3", label: "Review & merge", status: "pending" },
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTasks((prev) => prev.map((task) => {
        if (task.id === "2" && task.children) {
          return {
            ...task,
            children: task.children.map((child) =>
              child.id === "2-2" ? { ...child, status: "complete" as const } :
              child.id === "2-3" ? { ...child, status: "running" as const } :
              child
            ),
          };
        }
        return task;
      }));
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return <TaskTree tasks={tasks} defaultExpandAll />;
}

export function TaskTreeCollapsedDemo() {
  return <TaskTree tasks={staticTasks} />;
}
