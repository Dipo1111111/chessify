# Code Standards — Chess Training Dashboard

## TypeScript
- Strict mode enabled
- Prefer interfaces over types for object shapes
- Use `type` for unions, intersections, and utility types
- No `any` — use `unknown` if type is truly uncertain
- Use `const` assertions for literal types

## Naming
- **Components:** PascalCase (`PuzzleCard`, `TaskList`)
- **Files:** PascalCase for components (`PuzzleCard.tsx`), camelCase for utilities (`useLocalStorage.ts`)
- **Functions:** camelCase (`handleCheckbox`, `toggleComplete`)
- **Types/Interfaces:** PascalCase with descriptive names (`TrainingDay`, `BlockProgress`)
- **CSS classes:** Tailwind utility classes only — no custom CSS unless absolutely necessary

## Component Conventions
- One component per file
- Props interface defined in the same file, exported
- Use `const ComponentName: React.FC<Props>` pattern
- Destructure props at the top of the component

## Imports Order
1. React / framework imports
2. Third-party libraries (react-router, etc.)
3. Local components (`../../components/...`)
4. Local utilities (`../../lib/...`)
5. Types (`../../types`)
6. CSS imports (only at entry point)

## State Management
- Use React Context + useReducer for global state
- Use useState for local component state
- No external state management libraries

## Styling
- Tailwind utility classes only
- shadcn components for base UI primitives
- No inline styles
- Design tokens in tailwind.config.js theme extension
