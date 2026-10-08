# Repository Guidelines

## Project Structure & Module Organization

Run commands from `my-app/`, the Git repository root. `app/` contains App Router routes (`/`, `/user`, `/role`), the shared `layout.tsx`, and `globals.css`. Keep route-specific table columns in `app/user/columns.tsx`. Shared components live in `components/`; `components/ui/` holds shadcn/Base UI primitives, and `components/types/user.ts` contains user types and mock data. Utilities belong in `lib/`, and static assets in `public/`.

## Build, Test, and Development Commands

Use Bun, as declared in `package.json`, and keep `bun.lock` synchronized with dependency changes.

- `bun install`: install dependencies.
- `bun run dev`: start the local development server at `http://localhost:3000`.
- `bun run build`: create the production build and check compilation.
- `bun run start`: serve the completed production build.
- `bun run lint`: run ESLint with Next.js Core Web Vitals and TypeScript rules.

## Coding Style & Naming Conventions

Use strict TypeScript and `.tsx` for React components. Follow surrounding code; prefer two-space indentation, double quotes, and semicolons. Name shared components in PascalCase (`AppNavbar.tsx`), functions and variables in camelCase, and route directories in lowercase. Preserve Next.js filenames such as `page.tsx` and `layout.tsx`. Prefer `@/` imports for shared modules. Use Tailwind utilities and existing UI primitives. Add `"use client"` when browser APIs or React client hooks require it. No standalone formatter is configured.

## Testing Guidelines

No automated test framework, test script, or coverage threshold is configured. Before submitting, run lint and the production build, then manually check affected routes, navigation, dropdowns, and responsive layouts. Report failures and verification limits. If adding automated tests, document the runner and command and use descriptive `*.test.ts` or `*.test.tsx` filenames.

## Commit & Pull Request Guidelines

History contains only `Initial commit from Create Next App`, so no established commit convention exists. Use concise imperative subjects, such as `Add user table filtering`. Keep commits focused. PRs should explain the change, link relevant issues, list validation results, and include screenshots for visual changes.

## Agent Instructions

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
