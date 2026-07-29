# Library Docs — Chess Training Dashboard

## React Router v6
- Use `HashRouter` for zero-config static hosting (no server-side routing needed)
- Routes defined in `App.tsx` with `<Routes><Route>` pattern
- Navigation via `<Link to="/path">` or `useNavigate()`
- Full-page views receive params via `useParams()`

## Tailwind CSS v3
- Custom theme values (colors, fonts) extended in `tailwind.config.js`
- No custom CSS files — all styling lives in Tailwind classes
- Dark mode via `class` strategy (manual toggle or system preference)
- Use Tailwind's built-in design tokens (`slate-900`, `amber-500`, etc.)

## shadcn/ui
- Components initialized with `npx shadcn@latest init`
- Use minimal components: Button, Card, Checkbox, Badge, Progress
- Customize via `tailwind.config.js` theme, not component overrides
- Each component sits in `src/components/ui/`

## Google Fonts
- Loaded via `<link>` tags in `index.html`
- Each design uses its own font pairing (loaded conditionally or all at once for compare page)
- Fonts used: Playfair Display, Inter, JetBrains Mono, Space Grotesk, Press Start 2P, Bebas Neue, DM Sans, Noto Serif JP, IBM Plex Mono
