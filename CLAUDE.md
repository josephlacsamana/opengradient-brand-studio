# OpenGradient Brand Studio

## Project Overview

**OpenGradient Brand Studio** is an internal self-service web tool for the OpenGradient marketing team to generate branded graphics instantly — no designer needed. Users select from pre-built templates, customize text and decorative elements, and export production-ready PNGs at any social media dimension.

**Problem:** The marketing team waits 24-48 hours for simple branded graphics from designers.
**Solution:** A web-based WYSIWYG editor with brand-locked templates, live preview, and one-click PNG export.

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | React 18 + TypeScript | Component-based, strong typing for template system |
| Build | Vite 5 | Fast HMR, minimal config |
| Styling | Tailwind CSS 3 (UI chrome only) | Rapid UI development with brand tokens |
| State | Zustand 5 | Selector-based subscriptions prevent full-tree re-renders on slider changes |
| Export | html-to-image | Client-side PNG generation from DOM nodes |
| Icons | Lucide React | Consistent, lightweight icon set |
| Fonts | Google Fonts (23+ families) | Free, CDN-hosted, wide selection |

**No other dependencies.** No router, no CSS-in-JS, no form library, no animation library.

---

## Brand Kit

### Color Palette (Official Brand Guide)

#### 4 Core Brand Colors
```
#0E4B5B  — Teal Dark Blue (primary dark, headings on light BG)
#24BCE3  — Caribbean Blue (primary accent)
#E9F8FC  — Clear Skies (light background)
#FFFFFF  — White
```

#### Extended Palette (derived, used in gradients/UI)
```
#BDEBF7  — Primary 200
#A7E4F4  — Primary 300
#50C9E9  — Primary 400
#1D96B6  — Primary 600
#167188  — Primary 700
#041317  — Primary 900 (near-black teal)
#40D1DB  — Logo Cyan (SVG logo mark only)
#141E32  — Dark Navy
#0A0F19  — Deepest Dark
```

### Two Visual Palettes

#### 1. Brand Gradient (Primary Brand Identity)
Used for: X banner, profile pic, social announcements, hero graphics
- Background: Smooth gradient from dark teal (#0E4B5B) at top to light cyan (#E9F8FC) or white at bottom
- Text: White on teal portions, dark teal on light portions
- Feel: Clean, airy, premium, approachable

#### 2. Dark Technical (Content/Thread Graphics)
Used for: Twitter/X threads, product features, technical deep-dives
- Background: Near-black (#0A0F19) with subtle teal gradient glow
- Decorative elements: Teal (#40D1DB) particles, cubes, lines, nodes, streaks
- Text: White headlines, light cyan subtitles
- Feel: Technical, dramatic, sophisticated

### Background Gradient Presets

```typescript
// Official Brand Gradients (from brand guide)
'brand-header-gradient':      180deg, #0E4B5B → #24BCE3 → #E9F8FC (dark top to light bottom)
'brand-footer-gradient':      radial from bottom center, #0E4B5B → #24BCE3 → #E9F8FC
'brand-section-gradient':     135deg, #0E4B5B → #24BCE3 → #E9F8FC (diagonal sweep)

// Additional Brand Gradient presets
'brand-gradient-vertical':    180deg, #0E4B5B → #24BCE3 → #E9F8FC
'brand-gradient-diagonal':    135deg, #0E4B5B → #167188 → #A7E4F4 → #E9F8FC
'brand-gradient-center':      radial, #24BCE3 → #0E4B5B → #041317
'brand-gradient-soft':        180deg, #167188 → #50C9E9 → #BDEBF7 → #FFFFFF
'brand-gradient-warm':        160deg, #0E4B5B → #1D96B6 → #50C9E9 → #E9F8FC

// Dark Technical presets
'dark-deepest':               solid #0A0F19
'dark-navy':                  solid #141E32
'dark-teal-glow':             radial from center, #0E4B5B → #0A0F19
'dark-gradient-vertical':     180deg, #141E32 → #0A0F19
'dark-gradient-teal':         180deg, #0E4B5B → #041317
'dark-gradient-bottom-glow':  radial from bottom, #0E4B5B → #0A0F19
```

### Logo Assets

All logos are in `public/logos/` as SVG files:

| File | Variant | Color |
|------|---------|-------|
| `symbol-cyan.svg` | Symbol only | Cyan #40D1DB |
| `symbol-white.svg` | Symbol only | White |
| `symbol-black.svg` | Symbol only | Black |
| `lockup-horizontal-cyan.svg` | Symbol + wordmark | Cyan |
| `lockup-horizontal-white.svg` | Symbol + wordmark | White |
| `lockup-horizontal-black.svg` | Symbol + wordmark | Black |
| `logotype-cyan.svg` | Wordmark only | Cyan |
| `logotype-white.svg` | Wordmark only | White |
| `logotype-black.svg` | Wordmark only | Black |
| `logotype-stacked-cyan.svg` | Stacked wordmark | Cyan |
| `logotype-stacked-white.svg` | Stacked wordmark | White |
| `logotype-stacked-black.svg` | Stacked wordmark | Black |

### Font Registry

#### Brand Fonts (from official brand guide)
- **Primary:** Geist (sans-serif) — all headlines and body text
- **Secondary:** Geist Mono (monospace) — technical/code contexts

All templates default to Geist/Geist Mono. Users can still switch to any font in the selector.

#### Additional Fonts Available (25 total via Google Fonts)

**Sans-Serif:** Geist, Inter, Roboto, Open Sans, Poppins, Montserrat, Lato, Manrope, Space Grotesk, DM Sans, Plus Jakarta Sans

**Serif:** Playfair Display, Merriweather, Lora, Cormorant Garamond

**Display:** Sora, Outfit, Orbitron, Bebas Neue, Oswald, Raleway

**Monospace:** Geist Mono, JetBrains Mono, Fira Code, Space Mono

---

## Architecture

### Critical Convention: Canvas Inline Styles

**All components inside `CanvasRenderer` MUST use inline React `style` props — NEVER Tailwind classes.**

Reason: `html-to-image` serializes the DOM to SVG foreignObject. Tailwind classes reference external stylesheets that may not be captured. Inline styles are self-contained and guarantee pixel-perfect export fidelity.

- `CanvasRenderer` and all its children → **inline styles only**
- All UI chrome (sidebar, properties panel, header) → **Tailwind classes**

### Canvas Layer Stack

The canvas is composed of five absolutely-positioned layers inside `CanvasRenderer`:

```
z-index: 1   BackgroundLayer       — gradient or solid dark background
z-index: 2   DecorativeLayer       — particles, cubes, lines, nodes, streaks, glow
z-index: 3   TextLayer             — headline + subtitle, positioned per alignment
z-index: 3   CommunityGridLayer    — PFP grid with sections (when communityEnabled)
z-index: 4   LogoLayer             — logo SVG in chosen corner with padding
```

Each layer: `position: absolute; inset: 0;` within the container.

### No HTML5 Canvas for Decorations

All decorative elements MUST be rendered as SVG or CSS — never HTML5 `<canvas>`. The `html-to-image` library cannot capture `<canvas>` elements (they render as blank rectangles in exports).

### Templates Are Data, Not Components

Templates are pure TypeScript objects conforming to `TemplateDefinition`. They define default values for every editor state field. Adding a new template requires only creating a data object and registering it — zero React code needed.

### Zustand Selector Rules

**CRITICAL:** Never use object-returning selectors with Zustand v5. They cause infinite re-renders because `Object.is({}, {})` is always `false` with `useSyncExternalStore`.

```typescript
// BAD — infinite re-render loop
const { a, b } = useEditorStore(s => ({ a: s.a, b: s.b }))

// GOOD — stable primitive references
const a = useEditorStore(s => s.a)
const b = useEditorStore(s => s.b)
```

### State Management

Four Zustand stores:
- `editorStore` — All visual state (text, background, decorations, logo, community grid, active template). Acts as the "active working copy" for the currently selected design.
- `designCollectionStore` — Multi-design collection. Manages an array of `Design` objects (each containing a complete `EditorState` snapshot). Supports duplicate, switch, delete, rename, reorder. On design switch, saves current editorStore → collection, loads target → editorStore.
- `exportStore` — Export dimensions, size preset selection, exporting flag
- `historyStore` — Undo/redo stack with debounced snapshots

### Design Collection Architecture

```
designCollectionStore                editorStore (active design)
┌─────────────────────┐              ┌──────────────────────┐
│ designs: [          │    load →    │  headline: "..."     │
│   { id, name, state }│  ← save    │  subtitle: "..."     │
│   { id, name, state }│             │  ... 46 fields       │
│ ]                   │              └──────────────────────┘
│ activeDesignId      │                      ↓
└─────────────────────┘              Canvas reads from here
```

Key files:
- `src/store/designCollectionStore.ts` — Collection store with all actions
- `src/lib/editorStateUtils.ts` — `extractEditorState()` and `loadEditorState()` helpers
- `src/types/editor.ts` — `Design`, `DesignCollectionState`, `DesignCollectionActions` types

### Export Pipeline

1. Wait for `document.fonts.ready`
2. Clone `CanvasRenderer` DOM node to offscreen hidden div
3. Inject `@font-face` CSS directly into clone (fixes html-to-image font embedding bug)
4. Call `toPng()` with exact target dimensions + `pixelRatio: 2`
5. Trigger download
6. Cleanup offscreen clone

### Canvas Scaling

`CanvasRenderer` always renders at exact target pixel dimensions (e.g., 1200x675). `CanvasWrapper` applies CSS `transform: scale(factor)` to fit the available viewport. True WYSIWYG — what you see is exactly what gets exported.

---

## File Structure

```
opengradient-brand-studio/
├── CLAUDE.md
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── logos/
│       ├── symbol-cyan.svg
│       ├── symbol-white.svg
│       ├── symbol-black.svg
│       ├── lockup-horizontal-cyan.svg
│       ├── lockup-horizontal-white.svg
│       ├── lockup-horizontal-black.svg
│       ├── logotype-cyan.svg
│       ├── logotype-white.svg
│       ├── logotype-black.svg
│       ├── logotype-stacked-cyan.svg
│       ├── logotype-stacked-white.svg
│       └── logotype-stacked-black.svg
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── index.css
│   ├── types/
│   │   ├── template.ts
│   │   ├── editor.ts
│   │   └── export.ts
│   ├── constants/
│   │   ├── brand.ts
│   │   ├── fonts.ts
│   │   ├── exportSizes.ts
│   │   └── logos.ts
│   ├── templates/
│   │   ├── index.ts
│   │   ├── brand-gradient-hero.ts
│   │   ├── brand-gradient-split.ts
│   │   ├── dark-tech-announcement.ts
│   │   ├── dark-tech-feature.ts
│   │   ├── dark-tech-statement.ts
│   │   ├── social-quote.ts
│   │   ├── thread-closer.ts
│   │   ├── blog-cover.ts
│   │   ├── minimal-clean.ts
│   │   ├── editorial-statement.ts
│   │   ├── team-spotlight.ts
│   │   ├── hiring-post.ts
│   │   ├── community-spotlight.ts
│   │   ├── community-top-contributor.ts
│   │   └── community-award.ts
│   ├── store/
│   │   ├── editorStore.ts
│   │   ├── designCollectionStore.ts
│   │   ├── exportStore.ts
│   │   └── historyStore.ts
│   ├── hooks/
│   │   ├── useExport.ts
│   │   ├── useFontLoader.ts
│   │   ├── useCanvasScale.ts
│   │   └── useKeyboardShortcuts.ts
│   ├── lib/
│   │   ├── exportPipeline.ts
│   │   ├── fontLoader.ts
│   │   ├── colorUtils.ts
│   │   ├── templateUtils.ts
│   │   └── editorStateUtils.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── AppShell.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   ├── CanvasArea.tsx
│   │   │   ├── DesignTabs.tsx
│   │   │   └── PropertiesPanel.tsx
│   │   ├── canvas/
│   │   │   ├── CanvasRenderer.tsx
│   │   │   ├── CanvasWrapper.tsx
│   │   │   ├── BackgroundLayer.tsx
│   │   │   ├── TextLayer.tsx
│   │   │   ├── LogoLayer.tsx
│   │   │   ├── DecorativeLayer.tsx
│   │   │   └── CommunityGridLayer.tsx
│   │   ├── decorations/
│   │   │   ├── ParticleField.tsx
│   │   │   ├── GeometricCubes.tsx
│   │   │   ├── RadialLines.tsx
│   │   │   ├── HorizontalStreaks.tsx
│   │   │   ├── ConnectedNodes.tsx
│   │   │   └── GlowOrb.tsx
│   │   ├── controls/
│   │   │   ├── TemplateGrid.tsx
│   │   │   ├── TextControls.tsx
│   │   │   ├── FontSelector.tsx
│   │   │   ├── BackgroundControls.tsx
│   │   │   ├── DecorationControls.tsx
│   │   │   ├── LogoControls.tsx
│   │   │   ├── CommunityControls.tsx
│   │   │   └── ExportControls.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Select.tsx
│   │       ├── Slider.tsx
│   │       ├── Toggle.tsx
│   │       ├── Input.tsx
│   │       ├── Tabs.tsx
│   │       └── ColorSwatches.tsx
│   └── assets/
│       └── decorations/
```

---

## Templates

### Core Templates
- [x] **Brand Gradient Hero** — Large centered headline on brand teal gradient. Use: announcements, social headers.
- [x] **Brand Gradient Split** — Left-aligned text on diagonal gradient. Use: banners, LinkedIn posts.
- [x] **Dark Tech Announcement** — Centered text on dark BG with particles + glow. Use: product launches.
- [x] **Dark Tech Feature** — Center headline on radial teal glow with cubes. Use: feature highlights.
- [x] **Dark Tech Statement** — Bold two-line statement on dark teal gradient. Use: taglines.
- [x] **Social Quote** — Quote card on dark navy with subtle streaks. Use: testimonials.
- [x] **Thread Closer** — "End of thread." slide with watermark logo. Use: thread endings.
- [x] **Blog Cover** — Headline on soft brand gradient with connected nodes. Use: article covers.

### Minimal / Editorial Templates
- [x] **Minimal Clean** — Ultra-clean typography, soft gradient, DM Sans, generous whitespace.
- [x] **Editorial Statement** — Magazine-style left-aligned Playfair Display on dark background.

### Team / People Templates
- [x] **Team Spotlight** — Team member name + role/bio on teal glow, Sora font.
- [x] **Hiring Post** — "We're Hiring!" on brand diagonal gradient with connected nodes.

### Community Templates (with PFP Grid)
- [x] **Weekly Yappers** — Multi-section grid (Top Yappers, Best Art, Top Educator) with 14 avatar slots.
- [x] **Top 6 Members** — Single section, 3-column grid, brand gradient, 6 large avatar slots.
- [x] **Top 4 Members** — Single section, 4-column grid, dark BG with particles, 4 large avatar slots.

### Community Grid System

Community templates use `communityEnabled: true` and render a `CommunityGridLayer` with:
- **Sections** — Each section has a title and array of member slots
- **Member slots** — Circular PFP frame + username label
- **Image upload** — Users click to upload profile pictures (stored as data URLs for export)
- **Configurable** — Avatar size, border color/width, columns per row, title/username colors & sizes
- **Dynamic** — Add/remove members and sections via the properties panel

---

## Export Size Presets

| ID | Label | Width | Height |
|----|-------|-------|--------|
| `twitter-post` | Twitter / X Post | 1200 | 675 |
| `twitter-header` | Twitter / X Header | 1500 | 500 |
| `profile-pic` | Profile Picture | 400 | 400 |
| `linkedin-post` | LinkedIn Post | 1200 | 627 |
| `instagram-square` | Instagram Square | 1080 | 1080 |
| `blog-cover` | Blog Cover | 1600 | 900 |
| `custom` | Custom Size | (user defined) | (user defined) |

All exports are at `pixelRatio: 2` for retina quality.

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+E` | Export current size |
| `Ctrl+D` | Duplicate current design |

---

## Development

```bash
npm install
npm run dev      # Start dev server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview production build
```

---

## Conventions

- **TypeScript strict mode** enabled
- **No `any` types** — use proper interfaces from `src/types/`
- **Canvas components** use inline `style` props — never Tailwind
- **UI components** use Tailwind utility classes — never inline styles
- **Templates** are pure data objects — never React components
- **SVG/CSS only** for decorative elements — never HTML5 Canvas
- **Zustand selectors** for store access — never subscribe to entire store
- **Google Fonts** via single batched URL — not individual font requests
- **Export always at `pixelRatio: 2`** for retina output

---

## Deployment

### GitHub Repo
- **URL:** https://github.com/josephlacsamana/opengradient-brand-studio
- **Branch:** `main`
- **Git repo is inside the project folder** (`opengradient-brand-studio/.git`)

### Vercel
- **Live URL:** opengradient-brand-studio-git-main-josephlacsamanas-projects.vercel.app
- **Framework Preset:** Vite
- **Root Directory:** (blank/empty) — files are at repo root
- **Build Command:** `npm run build` (uses `vite build`, NOT `tsc -b && vite build` — 373 TS errors exist)
- **Install Command:** `npm install`
- **Output Directory:** `dist`
- Auto-deploys on push to `main`

### Git Workflow (from VS Code terminal)
```bash
git add -A
git commit -m "your message here"
git push origin main
```
Vercel will auto-deploy after push. Check deployment status at vercel.com dashboard.

---

## Known Issues & Fixes Log

- [x] **Zustand v5 infinite re-render** — Object-returning selectors cause React error #185. Fixed by using individual selectors.
- [x] **Vercel 404 on deploy** — Multiple rounds: added vercel.json, fixed build command, set root directory.
- [x] **Git repo in wrong directory** — Was in `C:\Users\Joseph\`, moved `.git` into project folder.
- [ ] **Vercel Root Directory needs clearing** — After moving .git, the Root Directory setting must be set to blank (was `opengradient-brand-studio`). Do this in Vercel Settings > General.
- [ ] **373 TypeScript errors** — `tsc -b` fails. Build uses `vite build` directly to skip type checking. Should fix TS errors eventually.

---

## UI Enhancements Log

- [x] **Brand color swatches for all color pickers** — All color pickers (Headline, Subtitle, Border, Title, Username) have 8 clickable brand palette presets via shared `ColorSwatches` component in `src/components/ui/ColorSwatches.tsx`.
- [x] **Design collection (multi-page)** — Users can duplicate, delete, rename, and switch between multiple independent designs. Each design has its own complete state snapshot. Export downloads all designs. `Ctrl+D` to duplicate. Tab bar above canvas + floating Duplicate button on canvas.

---

## Planned Features

### Feature: Canva-Style Vertical Page Layout
**Status:** Approved, not yet implemented

Replace the current tab-based design navigation with a Canva-style vertical scrollable page list:
- **Vertical page list** — All designs stacked vertically in the canvas area, scrollable
- **Thumbnail previews** — Inactive pages show captured screenshot thumbnails (not live-rendered)
- **Active page** — Only the selected page renders the live editable canvas
- **Per-page toolbar** — Above each page, with:
  - Page label ("Page 1", "Page 2", etc.)
  - Duplicate button
  - Delete button
  - Reorder up/down arrows
- **Click to select** — Click any page to make it the active/editable one
- **Export** — Downloads all pages as separate PNGs

### Feature: Click-to-Select Canvas Sections
**Status:** Approved, not yet implemented

Click any layer/section on the canvas to automatically open its matching settings section in the properties panel:
- Click **headline/subtitle text** → opens "Text" section
- Click **logo** → opens "Logo" section
- Click **community grid area** → opens "Community Grid" section
- Click **decorative elements** (particles, cubes, etc.) → opens "Decorations" section
- Click **background** → opens "Background" section

Implementation approach:
- Add click handlers to each canvas layer (currently all have `pointerEvents: 'none'`)
- Create a mapping between canvas layers and properties panel accordion section IDs
- Programmatically expand the matching accordion section on click
- Section-level granularity only (not per-element)
