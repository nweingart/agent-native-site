import { readdir, readFile, writeFile } from "fs/promises";
import { join, relative } from "path";

const DOCS_DIR = join(process.cwd(), "src/app/docs");
const OUT = join(process.cwd(), "public/search-index.json");

// Section names derived from directory path
const SECTION_MAP = {
  "getting-started": "Getting Started",
  components: "Components",
  hooks: "Hooks",
  types: "Types",
  customization: "Customization",
  changelog: "Resources",
  faq: "Resources",
};

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.name === "page.mdx") {
      files.push(full);
    }
  }
  return files;
}

function extractMeta(content) {
  const lines = content.split("\n");
  let title = "";
  let description = "";
  const headings = [];

  for (const line of lines) {
    const h1 = line.match(/^#\s+(.+)/);
    if (h1 && !title) {
      title = h1[1].trim();
      continue;
    }
    const h2h3 = line.match(/^#{2,3}\s+(.+)/);
    if (h2h3) {
      headings.push(h2h3[1].trim());
      continue;
    }
    // First non-empty, non-import, non-heading, non-JSX line as description
    if (
      !description &&
      title &&
      line.trim() &&
      !line.startsWith("#") &&
      !line.startsWith("import ") &&
      !line.startsWith("<")
    ) {
      description = line.trim().replace(/\*\*/g, "").slice(0, 200);
    }
  }

  return { title, description, headings };
}

function pathToHref(filePath) {
  const rel = relative(DOCS_DIR, filePath);
  // Remove /page.mdx
  const slug = rel.replace(/\/page\.mdx$/, "");
  return `/docs/${slug}`;
}

function pathToSection(filePath) {
  const rel = relative(DOCS_DIR, filePath);
  const topDir = rel.split("/")[0];
  return SECTION_MAP[topDir] || topDir;
}

async function main() {
  const files = await walk(DOCS_DIR);
  const index = [];

  for (const file of files) {
    const content = await readFile(file, "utf-8");
    const { title, description, headings } = extractMeta(content);
    if (!title) continue;
    index.push({
      title,
      description,
      headings,
      href: pathToHref(file),
      section: pathToSection(file),
    });
  }

  // Sort by section then title
  index.sort((a, b) => a.section.localeCompare(b.section) || a.title.localeCompare(b.title));

  await writeFile(OUT, JSON.stringify(index, null, 2));
  console.log(`Search index: ${index.length} pages → ${OUT}`);
}

main().catch((err) => {
  console.error("Failed to build search index:", err);
  process.exit(1);
});
