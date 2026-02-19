import { highlight } from "@/lib/highlight";
import { CopyButton } from "@/components/ui/CopyButton";

export async function CodeBlock({
  code,
  lang = "tsx",
  filename,
}: {
  code: string;
  lang?: string;
  filename?: string;
}) {
  const html = await highlight(code.trim(), lang);

  return (
    <div className="group relative rounded-lg border border-border bg-surface overflow-hidden my-4">
      {filename && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-surface-2 text-xs text-muted font-mono">
          {filename}
        </div>
      )}
      <div className="relative">
        <div
          className="overflow-x-auto p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0 [&_code]:!text-sm"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <CopyButton
          text={code.trim()}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </div>
  );
}
