# Memory

Last updated: 2026-07-31

## Session: Vercel deployment, Today tag fixes, PWA auto-update

Last updated: 2026-07-30

### What was built

**Vercel deployment fix:**
- Updated `vercel.json` with `"buildCommand": "node ./node_modules/vite/bin/vite.js build"` to bypass npm's broken `.bin` permissions
- Removed `tsc -b` from build (switched to just `vite build`)
- Removed `vercel-build` script from `package.json`

**Today tag confusion fixes:**
- `src/pages/Dashboard.tsx` — "Today's study" header now dynamic: shows "Today's study" only on the actual current day, otherwise "Day N study"
- `src/pages/Dashboard.tsx` — "Today" button relabeled to "Jump to today" so it's clearly an action, not a label misidentifying the day
- `src/components/MiniCalendar.tsx` — Calendar range fixed to always show at least 30 days (was showing just a few when todayDay was early in the program)

**PWA auto-update:**
- `src/main.tsx` — Added `controllerchange` listener that auto-reloads the page when a new service worker takes over, so the PWA always shows the latest deployed version without manual reinstall

**Memory files created/updated:**
- `vercel-deploy-permission-fix.md` (new) — Documents the node_modules/.bin permission error and fix
- `pwa-auto-update.md` (new) — Documents the PWA auto-reload fix
- `today-logic-fix.md` (updated) — Added Fixes 2-4
- `vercel-deployment.md` (updated) — Linked to permission fix
- `MEMORY.md` (updated) — Added new entries

### Decisions made

- Changed build command from `tsc -b && vite build` to `node ./node_modules/vite/bin/vite.js build` via vercel.json to bypass npm permission issues on Vercel
- "Today" button now says "Jump to today" — always an action label, never a day identifier
- PWA auto-reloads on service worker update — no manual reinstall needed, no update prompt

### Problems solved

1. **Vercel "Permission denied" on `node_modules/.bin/vite`**: The `.bin` symlinks installed by npm on Vercel sometimes lack execute permissions. Running `node ./node_modules/vite/bin/vite.js build` directly bypasses this entirely. The `vercel-build` script in package.json and `npx` approaches both failed — only the vercel.json `buildCommand` pointing directly at the binary works.

2. **"Today" tag appearing on wrong days**: Three issues compounded:
   - "Today's study" header was always static regardless of which day was viewed
   - "Today" button text looked like a label identifying the current day, not a navigation action
   - MiniCalendar only showed days leading up to todayDay, giving a tiny calendar when todayDay was early

3. **PWA not updating after deploy**: The service worker had `autoUpdate` configured (calling `skipWaiting()`), but since the app uses HashRouter with no page navigations, the new SW never activated visually. Adding a `controllerchange` listener that reloads the page fixes this.

### Current state

- Build and deploy pipeline works — Vercel deploys from GitHub, root directory set to `chess-training/`, build command runs directly via node
- "Today" logic is correct — first uncompleted day is today, navigation is independent, labels are contextual
- PWA auto-updates on deploy — no manual steps needed
- All fixes documented in persistent memory files

### Next session starts with

Check that the deployed app at https://chess-training-dashboard.vercel.app is working correctly with all fixes.

### Open questions

- None currently

---

## Session: Master Chess Protocol rewrite + FEN audit

Last updated: 2026-07-31

### What was built

**Master Chess Protocol (60 Days to 1100+ ELO) — full rewrite:**
- `src/store/TrainingContext.tsx` — new data model with two independent tracks: calendar days 1–60 (4 daily tasks) and a sparring-gate track with per-position Stockfish gates. `BLOCK_CONFIG` (exported) holds all 11 position FENs (A/B/C have 3 positions, D has 2). New reducer actions `STOCKFISH_WIN`/`STOCKFISH_LOSS`, `currentGateOf()` for the live gate, localStorage migration that preserves day checks by task type.
- `src/pages/Dashboard.tsx` — sparring row is gate-locked (not clickable), shows live position + streak. New `BlockGate` component: position list, FEN with copy button, 5-box streak tracker, Win/Loss buttons (Survived/Failed for Block D), daily 10-game cap note.
- `src/pages/Stats.tsx` — block gates show per-position progress (`passedCount/totalPositions` + current streak).
- Created auto-memory `master-chess-protocol-plan.md` with the full plan details.

**FEN audit (all 11 positions):**
- Wrote a FEN validator script — all 11 FENs are valid format + legal positions EXCEPT D1 (the `2C5` typo, already corrected to `2P5` in code).
- D1 (`1. c4 e5 2. Nc3 Nf6`) and D2 (`1. e4 d6 2. d4 Nf6 3. Nc3 g6`) match their setup notes exactly.
- B2's FEN rooks are on a1/e1 — matches the plan prose, no discrepancy.

### Decisions made

- **Two-track progression**: calendar days advance freely as tasks are checked; the sparring position stays frozen until 5 consecutive Stockfish wins at max level. A loss/draw/stalemate resets that position's streak to 0. The sparring row can't be toggled by hand.
- **Finish-then-advance days**: a day completes only when all non-sparring tasks are checked; partial checks stay on the same day; a fully-missed day repeats unchanged.
- **Daily cap**: max 10 Stockfish gate games per day, resets on day rollover.

### Problems solved

- Migration bug that would have wiped day completion on reload — fixed by computing `completed` from the mapped (preserved) tasks, not the freshly regenerated ones.
- D1 FEN invalid char `C` → corrected to `2P5` (English Opening).
- Typecheck (`tsc -b`), production build, and dev-server smoke test all pass.

### Current state

- Master Chess Protocol fully implemented and deploy-ready.
- **Critical FEN findings — two Block A gates are unwinnable:**
  - **A2** `4k3/4P3/4K3/8/8/8/8/8 w - - 0 1` is a **dead draw**: the black king sits on e8 (the promotion square), so the e7 pawn can never promote and the white king (e6) can never reach d7/f7 to support it. Stockfish holds the draw forever; the 5-win gate is impossible. Hand-verified winning replacement with the same "opposition" lesson: `4k3/8/4K3/4P3/8/8/8/8 w - - 0 1` (White Ke6, Pe5 vs Black Ke8, WTM — must bring the king first, NOT 1.e6).
  - **A3** `4k3/8/8/p1p1p3/P1P1P3/8/8/4K3 w - - 0 1` is a **fortress draw**: all 6 pawns are locked (zero captures possible), and the black king (e8) reaches any key square before the white king (e1). Likely unwinnable.
- **The user said "nevermind" to the FEN-fix work** — the engine verification was interrupted and NO A2/A3 code changes were made. The plan is in the code as-is.

### Next session starts with

Ask the user whether they want A2/A3 replaced with winnable positions (or adjusted in the plan doc), since as-is both Block A gates are likely impossible to clear against Stockfish. If yes, verify proposed replacements with a Stockfish download or Lichess tablebase before editing `BLOCK_CONFIG` in `TrainingContext.tsx`.

### Open questions

- Replace A2/A3 with winnable positions, or adjust the plan?
- No other open items.
