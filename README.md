# agent-native-site

Documentation site for [agent-native](https://github.com/nedweingart/agent-native) — a headless React component library for AI agent interfaces.

## Stack

- **Next.js 16** (App Router)
- **Tailwind CSS 4**
- **MDX** for documentation pages
- **Shiki** for syntax highlighting
- **Fuse.js** for client-side search

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

The build script generates the search index before running the Next.js build.

## Project Structure

```
src/
├── app/
│   ├── docs/                 # Documentation pages (MDX)
│   │   ├── getting-started/  # Installation, Quick Start, Theming, Tailwind
│   │   ├── components/       # 19 component doc pages
│   │   ├── hooks/            # 7 hook doc pages
│   │   ├── types/            # Type reference
│   │   ├── customization/    # CSS Variables, classNames, Render Slots, Data Attributes
│   │   ├── changelog/        # Version history
│   │   └── faq/              # FAQ & Troubleshooting
│   ├── globals.css           # Theme variables & prose styles
│   ├── layout.tsx            # Root layout with theme support
│   └── page.tsx              # Landing page
├── components/
│   ├── demos/                # Interactive demo components
│   ├── docs/                 # Sidebar navigation
│   ├── landing/              # Hero, Footer, etc.
│   ├── mdx/                  # CodeBlock, PropsTable, LiveDemo, etc.
│   └── ui/                   # Badge, CopyButton, Tabs
├── lib/
│   ├── docs-nav.ts           # Navigation structure
│   ├── highlight.ts          # Shiki syntax highlighting
│   └── version.ts            # Library version constant
└── mdx-components.tsx        # MDX component overrides
```

## Adding a Doc Page

1. Create a directory under `src/app/docs/<section>/<slug>/`
2. Add a `page.mdx` file with your content
3. Import MDX components (`CodeBlock`, `PropsTable`, `LiveDemo`, etc.) at the top
4. Add the page to `src/lib/docs-nav.ts` in the appropriate section
5. Run `npm run build` to regenerate the search index
