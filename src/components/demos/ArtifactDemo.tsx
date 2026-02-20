"use client";

import { TimelineArtifact } from "agent-native";
import { artifactExamples } from "./demo-data";

export function StandaloneArtifactDemo() {
  return (
    <div className="space-y-2">
      {artifactExamples.map((artifact) => (
        <TimelineArtifact key={artifact.id} artifact={artifact} />
      ))}
    </div>
  );
}
