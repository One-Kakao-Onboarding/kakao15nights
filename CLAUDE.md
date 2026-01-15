# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

UX-Ray is an AI-powered UX diagnosis solution that uses 4 AI personas to analyze UI screenshots and provide accessibility feedback. Users upload UI images, select personas, and receive visual feedback with "Red Pen" overlays marking problem areas.

## Development Commands

```bash
pnpm dev      # Start development server (port 5173)
pnpm build    # Build for production
pnpm lint     # Run ESLint
pnpm preview  # Preview production build
```

## Tech Stack

- **Framework:** React 18 with Vite
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 with Vite plugin
- **UI Components:** shadcn/ui (new-york style)
- **Routing:** React Router DOM v7
- **State:** Zustand
- **AI:** Google Generative AI SDK (`@google/genai`) with Gemini 2.0 Flash

## Architecture

### Directory Structure
```
src/
├── components/ui/   # shadcn/ui components
├── lib/
│   ├── utils.ts     # cn() utility
│   └── gemini.ts    # Gemini API integration
├── pages/           # Route components
│   ├── Home.tsx
│   ├── Analyze.tsx
│   ├── Loading.tsx
│   └── Results.tsx
├── store/
│   └── analysis.ts  # Zustand store
├── App.tsx          # Routes definition
├── main.tsx         # Entry point
└── index.css        # Global styles
```

### Route Structure
- `/` - Landing page with personas introduction
- `/analyze` - Image upload + device type + persona selection
- `/analyze/loading` - Loading state with Gemini API call
- `/analyze/results` - Visual Red Pen results display

### Data Flow
1. User uploads image and selects personas on `/analyze`
2. State stored in Zustand store (`useAnalysisStore`)
3. `/analyze/loading` calls Gemini API directly from client
4. Results stored in Zustand, navigate to `/analyze/results`
5. Results page renders feedback with coordinate-based overlays

### AI Integration (`src/lib/gemini.ts`)
- Uses `@google/genai` package with `gemini-2.0-flash` model
- Each persona has a specific prompt in `personaPrompts` object
- AI returns JSON with `feedback`, `coordinates` (for Red Pen), and `score`
- Coordinates format: `[ymin, xmin, ymax, xmax]` for bounding boxes
- Fallback mock data provided if API fails

### Personas
- `grandmother` - 김복심 (75세): Focus on readability, trust, cognitive load
- `adhd` - 이혁준 (32세): Focus on efficiency, aesthetics, quick scanning
- `one-hand` - 김민석 (25세): Focus on thumb reachability, touch targets
- `foreigner` - Brian (40세): Focus on localization, translation, global standards

## Environment Variables

```bash
VITE_GOOGLE_API_KEY=  # Required for Gemini API
```

## Path Aliases

```typescript
@/* -> ./src/*  // Source-relative imports
```

## Key Files

- `prompt.md` - Full persona prompt definitions
- `type.md` - Detailed persona profiles and UX checklist items
- `plan.md` - Project requirements and feature specifications
- `src/components/ui/` - shadcn/ui components
- `src/lib/utils.ts` - `cn()` utility for className merging
- `src/store/analysis.ts` - Zustand store for analysis state
