# Chess Training Dashboard — Project Rules

## Hard Constraints (Do Not Violate)

- **No inline CSS.** Zero `style={{...}}` props. All styling uses Tailwind utility classes or custom CSS classes defined in `src/index.css`. Tailwind arbitrary value syntax (`text-[10px]`, `w-[300px]`) is allowed in `className` — this is not inline CSS.
- **Brand tokens only.** Use the custom colors defined in `tailwind.config.js` (`paper`, `surface`, `ink`, `brand`, etc.). Never use raw hex values in className arbitrary values — use the named token instead.
- **No new inconsistencies.** Page headings at the same level must use the same text size. The same container role (page content, sidebar, card) must use the same padding and max-width across all tabs.

## Design System

### Colors (defined in tailwind.config.js)

| Token | Hex | Usage |
|-------|-----|-------|
| `paper` | `#F8F6F3` | Page background |
| `surface` | `#F0EDE8` | Sidebar, card backgrounds |
| `ink` | `#2D2A24` | Primary text (headings, body) |
| `ink-soft` | `#6B6560` | Secondary text |
| `ink-muted` | `#8B8178` | Muted labels |
| `brand` | `#B8653A` | Accent (terracotta) |
| `brand-light` | `#F5EDE8` | Light brand bg (active/gate-passed) |
| `brand-pale` | `#E8D5CC` | Partial completion |
| `taupe` | `#B0A89A` | Faded/disabled text |
| `today-bg` | `#E8E4DE` | Today's calendar cell |
| `tab-active` | `#E6E0D8` | Active sidebar tab bg |
| `border-light` | `#E0DCD4` | Subtle borders |
| `border-lighter` | `#D4CEC6` | Lighter borders |
| `border-faint` | `#E8E4DE` | Faintest borders |

### Typography

- **Body font:** Inter Tight (`font-sans`) — defined in `tailwind.config.js` as `sans: ["Inter Tight", "sans-serif"]`
- **Heading font:** Playfair Display (`font-display`) — defined in `tailwind.config.js` as `display: ["Playfair Display", "serif"]`
- **Page heading:** `text-2xl font-semibold font-display text-ink` — for page titles (The Board, Progress)
- **Page subtitle:** `text-sm text-ink-soft` — for info lines below headings
- **Section label:** `text-xs uppercase tracking-[0.15em] text-ink-muted` — for section headers
- **Task title:** `text-lg` — for task row content
- **Roman numeral (right side):** `text-xl font-light font-display text-brand`
- **Roman numeral (task numbers):** `text-lg font-light font-display`
- **Body detail:** `text-sm` — for expanded task content, card details
- **Smallest:** `text-[10px]` — for sidebar Day label, footer

### Layout

- **Page container:** `page-container` class (`max-w-4xl mx-auto px-10 py-12`)
- **Sidebar:** `w-56` fixed width, `bg-surface`, `border-r border-border-light`
- **Page shell:** `min-h-screen flex bg-paper` (outer), flex-1 min-w-0 (content)
- **Active sidebar tab:** `bg-tab-active text-ink border-l-2 border-brand font-medium`
- **Inactive sidebar tab:** `bg-transparent text-ink-muted border-l-2 border-transparent font-normal`
- **Safe area classes** (for mobile/PWA notch support):
  - `safe-top` — `padding-top: env(safe-area-inset-top)`
  - `safe-bottom` — `padding-bottom: env(safe-area-inset-bottom)`
  - `safe-left` / `safe-right` — side safe areas

### Component Patterns

- **Check circle:** `w-6 h-6 rounded-full border-2` — `border-brand bg-brand` when done, `border-border-lighter bg-transparent` when not
- **Terracotta accent line:** `w-12 h-0.5 bg-brand` — used above page headings
- **Today button:** `text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded text-paper bg-brand`
- **Primary button:** `text-xs uppercase tracking-[0.1em] px-4 py-2 text-paper bg-brand`
- **Secondary button:** `text-xs uppercase tracking-[0.1em] px-4 py-2 text-brand border border-brand`
- **Hover underline on tasks:** CSS `group-hover:w-full` on the underline div, `group` on the parent row
- **Prev/Next nav:** `text-xs tracking-wider uppercase text-brand` with `disabled:opacity-20`

### Spacing

- **Section gap:** `mb-14` (3.5rem) between major sections
- **Inside cards:** `p-5` or `p-6` for content padding
- **Task row:** `py-4` vertical, `gap-6` between elements
- **Sidebar brand area:** `px-6 pt-10 pb-8`
- **Sidebar nav:** `px-4 space-y-1`

### Mobile / Responsive

- Page container narrows padding on mobile: `px-5` at ≤768px, `px-4` at ≤640px (defined in `index.css`)
- Safe area CSS env variables for notched phones
- Full PWA support (see Architecture below)

## Architecture

- **Stack:** React 18 + Vite 5 + TypeScript strict + Tailwind CSS 3
- **PWA:** `vite-plugin-pwa` with auto-updating service worker, Workbox precaching, offline Google Fonts caching
- **PWA Icons:** Generated from `public/pwa-icon.svg` using sharp into `pwa-192x192.png`, `pwa-512x512.png`, `apple-touch-icon.png` (180×180)
- **PWA Config:** `vite.config.ts` with VitePWA plugin — manifest, workbox, runtime caching for fonts
- **State:** React Context + useReducer + localStorage
- **Routing:** React Router v6 (HashRouter) — `/` Dashboard, `/compare` gallery, `/design/:id` preview
- **Data:** `TrainingContext` with reducer actions: TOGGLE_TASK, STOCKFISH_WIN, STOCKFISH_LOSS, SET_VIEWING_DAY, GO_TODAY, IMPORT_STATE
- **Streak logic:** Consecutive completed days including today if completed. Recalculated on every toggle.
- **Block gate:** 5 consecutive Stockfish wins needed to advance. A loss resets to 0.

## Do Not

- Do not add shadcn UI components unless explicitly requested
- Do not add external state management libraries (no Redux, MobX, etc.)
- Do not change the color palette — brand, ink, surface, paper, taupe are fixed
- Do not add new font families
- Do not add gradient text, glassmorphism, numbered section markers, or card grids with icons+text (AI slop patterns)
- Do not use `@media` queries directly — Tailwind's responsive utilities are the standard
