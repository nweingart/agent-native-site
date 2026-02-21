import { createHighlighter, type Highlighter } from "shiki";

let highlighter: Highlighter | null = null;

export async function getHighlighter(): Promise<Highlighter> {
  if (!highlighter) {
    highlighter = await createHighlighter({
      themes: ["github-dark-dimmed", "github-light"],
      langs: ["tsx", "typescript", "bash", "css", "json", "html"],
    });
  }
  return highlighter;
}

export async function highlight(
  code: string,
  lang: string = "tsx"
): Promise<string> {
  const h = await getHighlighter();
  return h.codeToHtml(code, {
    lang,
    themes: {
      light: "github-light",
      dark: "github-dark-dimmed",
    },
    defaultColor: false,
  });
}
