# Architecture — Chess Training Dashboard

## Stack
- **Framework:** React 18 (via Vite)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v3 + inline styles
- **Routing:** React Router v6 (HashRouter)
- **State:** React Context + useReducer (no external libs)
- **Persistence:** localStorage with JSON export/import
- **Fonts:** Inter Tight (body), Playfair Display (headings)

## Folder Structure
```
chess-training/
├── context/                     # Product planner context files
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Router + TrainingProvider
│   ├── index.css                # Tailwind
│   ├── store/
│   │   └── TrainingContext.tsx   # All state management
│   ├── components/
│   │   └── MiniCalendar.tsx      # 30-day heatmap grid
│   ├── pages/
│   │   ├── Dashboard.tsx         # Main app (sidebar + board + stats)
│   │   ├── Stats.tsx             # Heatmap + data management
│   │   ├── Compare.tsx           # Design gallery
│   │   ├── DesignView.tsx        # Full-page design preview
│   │   └── designs/
│   │       ├── Design3.tsx       # Wabi-Sabi (winning design)
│   │       ├── Design8.tsx       # Slate
│   │       ├── Design9.tsx       # Wabi·Slate
│   │       ├── Design10.tsx      # Habit Crunch
│   │       └── Design11.tsx      # Wabi-Sabi Refined
│   └── vite-env.d.ts
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── components.json
```

## Routes
| Route | Page | Purpose |
|-------|------|---------|
| `/` | Dashboard | Main app with sidebar tabs |
| `/compare` | Compare | Design gallery for reference |
| `/design/:id` | DesignView | Full-page design preview |

## Data Flow
User action → Context dispatch → Reducer updates state → localStorage sync → UI re-renders.

## Key Concepts
- **viewingDay vs todayDay:** User navigates with Prev/Next. todayDay is auto-calculated from startDate. A "Today" button appears when viewing a different day.
- **Streak:** Consecutive completed days including today if completed. Recalculated on every task toggle. Fixed to properly count today.
- **Block Gate:** Each block needs 5 consecutive Stockfish wins to pass. A loss resets. Next block stays locked until gate passes.
- **Expandable tasks:** Click a roman numeral (I–IV) to expand goal/focus details for that task.

## Design Tokens
- Background: #F8F6F3
- Ink: #2D2A24
- Accent: #B8653A (warm terracotta)
- Surface: #F0EDE8
- Borders: #E0DCD4, #D4CEC6
- Muted: #8B8178, #6B6560, #B0A89A
