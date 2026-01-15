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
- **AI:** Google Generative AI SDK (`@google/genai`) with Gemini 3 Flash Preview

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
- Uses `@google/genai` package with `gemini-3-flash-preview` model
- Each persona has a specific prompt in `personaPrompts` object
- AI returns JSON with `feedback[]`, `coordinates[]`, and `score` (0-100)
- Coordinates use normalized values (0-1): `{x, y, width, height}`
  - `x`: 0 (left edge) to 1 (right edge)
  - `y`: 0 (top edge) to 1 (bottom edge)
  - Feedback and coordinates arrays are 1:1 mapped
- Fallback mock data returned if API fails (see `createFallbackResult`)

### Red Pen Overlay System (`src/pages/Results.tsx`)
- Coordinates rendered as absolute-positioned divs over the image
- Percentage-based positioning: `top: y*100%`, `left: x*100%`, etc.
- Active feedback item highlights corresponding coordinate box
- Navigation between feedback items updates the visible overlay

### Personas
- `grandmother` - 디지털 취약계층 김복심 할머니 (75세): Focus on readability, trust, cognitive load
- `adhd` - 참을성이 부족한 이혁준 대리 (32세): Focus on efficiency, aesthetics, quick scanning
- `one-hand` - 한 손 조작 사용자 김민석 (25세): Focus on thumb reachability, touch targets
- `foreigner` - 미국인 Brian (40세): Focus on localization, translation, global standards

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
