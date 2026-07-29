# UI Rules — Chess Training Dashboard

*Note: These rules will be finalized after the design direction is chosen. For now, these are universal constraints.*

## Universal Rules
- Every interactive element must have a hover state (either color shift, scale, or elevation change)
- Touch targets must be ≥44×44px
- Text contrast ≥4.5:1 for body text
- No emoji as structural icons — use SVG icons

## Layout Rules
- Dashboard is single-column on mobile, wider on desktop
- All sections scroll vertically — no overflow hidden on body
- Content max-width: 720px on desktop, centered

## Card Rules
- Cards are used for daily tasks only
- Each card is independently scrollable within
- Expand/collapse with smooth height transition
- Never nest cards

## Badge Rules
- Overdue tasks get amber badges
- Completed tasks get green checkmark
- Streak uses fire symbol (emoji acceptable for decorative streak)

## Accessibility
- All checkboxes have visible labels
- Focus rings visible on keyboard navigation
- Skip links for keyboard users
