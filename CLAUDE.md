# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Status

This is a freshly scaffolded Vite + React + TypeScript project (`quirumedicasas`). `src/App.tsx` is still the default starter scaffold (logos + counter); there is no application-specific architecture, routing, or state management in place yet. Treat new feature work as greenfield.

## Commands

- `npm run dev` — start the Vite dev server with HMR
- `npm run build` — type-check the project references (`tsc -b`) then produce a production build with `vite build`. The build fails on any type error.
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the built `dist/` locally

There is no test runner configured.

## Architecture notes

- **React Compiler is enabled.** `vite.config.ts` wires the React Compiler in via `@rolldown/plugin-babel` + `reactCompilerPreset()`. Components are auto-memoized at build time, so avoid adding manual `useMemo`/`useCallback`/`React.memo` unless profiling shows a real need. Note this slows dev and build (per the README).
- **TypeScript uses project references.** Root `tsconfig.json` references `tsconfig.app.json` (app code under `src/`, browser libs) and `tsconfig.node.json` (Vite config tooling). `tsc -b` builds both. App config runs in bundler mode (`noEmit`, `allowImportingTsExtensions`, `verbatimModuleSyntax`) with strict unused-symbol checks (`noUnusedLocals`, `noUnusedParameters`).
- **ESLint is flat-config** (`eslint.config.js`) with `typescript-eslint` (non-type-checked recommended), `react-hooks`, and `react-refresh`. The README documents how to upgrade to type-aware lint rules if needed.
- Static assets in `public/` (e.g. `icons.svg`) are referenced by absolute path (`/icons.svg#...`); assets imported in `src/assets/` are bundled.

## Stack versions

React 19, Vite 8, TypeScript ~6.0, ESLint 10 — all recent majors, so verify API/config shapes against installed versions rather than older docs.
