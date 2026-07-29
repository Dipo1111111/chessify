# Project Overview — Chess Training Dashboard

## What
A personal, single-page dashboard that replaces a text-based 60-day chess training protocol with an interactive, visual daily workout system. Built with Wabi-Sabi design aesthetic — warm terracotta accent, Playfair Display + Inter Tight fonts, clean asymmetric layout.

## Why
The existing plan is a plain text file — no visual hierarchy, no progress tracking, no daily checklists. This app eliminates all friction: open the dashboard, see exactly what today's session is, check off completed work, and watch progress accumulate.

## Who
One user — a chess enthusiast following a structured 60-day protocol to reach 1100+ Elo.

## The Core Problem
"I have a text file with my entire training plan. Every day I scroll through it trying to figure out what I need to do. It's not visual, not engaging, and I lose track of what I've done."

## The Solution
A beautiful, instantly-readable dashboard that:
- Shows today's exact tasks based on day-of-week + day counter
- Click tasks to mark complete (streak updates automatically)
- Click roman numerals for expanded task details (goal + focus)
- Block gate: consecutively beat Stockfish 5 times to advance blocks
- 30-day heatmap visualizes completion history
- Export/import data as JSON
- Left sidebar navigation between The Board and Stats
- Everything persists in localStorage

## Design
- **Accent color:** #B8653A (warm terracotta)
- **Body font:** Inter Tight
- **Heading font:** Playfair Display
- **Background:** #F8F6F3 (warm off-white)
- **Text:** #2D2A24 (warm charcoal)
