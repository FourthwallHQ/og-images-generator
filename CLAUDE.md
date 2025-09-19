# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

- `npm run dev` - Start development server with hot reload on port 3000
- `npm run build` - Compile TypeScript to JavaScript in dist/
- `npm start` - Run production server (requires npm run build first)
- `npm run storybook` - Start Storybook for component development on port 6006
- `npm run build-storybook` - Build static Storybook site

### Testing

- `npm test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once (used in CI)
- `npm run test:ui` - Run tests with Vitest UI

### Code Quality

- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting (used in CI)

### API Documentation

- Swagger UI available at: http://localhost:3000/ui
- OpenAPI spec at: http://localhost:3000/doc

## Architecture

This is an OG (Open Graph) image generation service built with:

- **Hono** web framework with OpenAPIHono for automatic documentation
- **@vercel/og** for image generation (requires React for JSX components)
- **Zod** for request validation integrated with OpenAPI schemas

### Key Components

**app.ts** - Application factory that configures routes and OpenAPI documentation. Exports both `createApp()` function and `app` singleton to enable testing without server startup.

**services/og-generator/** - Core image generation service:

- `OGImageService.tsx` - Main service that generates PNG buffers using strategy components
- `components/` - Strategy-specific components for different shop states:
  - `ComingSoonComponent.tsx` - Coming soon state component
  - `ComingSoonWithDateComponent.tsx` - Coming soon with launch date
  - `EmptyShopComponent.tsx` - Empty shop state
  - `LiveWithProductsComponent.tsx` - Shop with products
  - `OGImageStories.stories.tsx` - Storybook stories for all strategies
  - `shared/` - Reusable UI components used across strategies
- `schemas.ts` - Zod schemas with OpenAPI metadata and example data
- `styles-parser.ts` - CSS variable parser for external stylesheets
- `routes.ts` - OpenAPI route definitions

### Important Technical Details

1. **React is required** - @vercel/og uses React JSX for image components. Don't remove React dependency.

2. **Testing approach** - Tests import from `app.ts` (not `index.ts`) to avoid server startup during testing. Integration tests mock the OGImageService to avoid actual image generation.

3. **JSX Configuration** - Both TypeScript and Vitest are configured for React JSX:
   - tsconfig.json: `"jsx": "react"`
   - vitest.config.ts: Uses esbuild with React.createElement

4. **GitHub Actions** - Two workflows run on pushes/PRs to main:
   - `test.yml` - Runs tests on Node.js 18.x and 20.x
   - `build.yml` - Verifies TypeScript compilation

5. **Code Formatting** - Prettier is configured for consistent code style:
   - Configuration in `.prettierrc`
   - Ignored paths in `.prettierignore`
   - Format check runs in GitHub Actions CI

6. **Storybook** - Visual development environment for OG image components:
   - Configuration in `.storybook/`
   - Components wrapped in `OGImageWrapper` to simulate 1200x630px dimensions
   - Stories use same components as production image generation
   - Requires Node.js 20.19.0+ for compatibility

## Common Tasks

### Adding a new OG image strategy

1. Create new schema in `services/og-generator/schemas.ts`
2. Create route definition in `services/og-generator/routes.ts` (if new endpoint)
3. Add handler in `app.ts` using `app.openapi()` (if new endpoint)
4. Create strategy component in `services/og-generator/components/`
5. Add shared UI components in `services/og-generator/components/shared/` if needed
6. Update `OGImageService.tsx` with new strategy case
7. Add Storybook story in `OGImageStories.stories.tsx`
8. Add tests in `tests/integration/api.test.ts`

### Modifying image generation

- Image components use React JSX with inline styles
- Strategy components are in `services/og-generator/components/`
- Shared UI components are in `services/og-generator/components/shared/`
- Use absolute positioning and flexbox for layouts
- Images are 1200x630px (standard OG image size)
- Test visual changes in Storybook before deploying

### Running single test

```bash
npx vitest run path/to/test.ts
```

### Component Architecture

The project uses a shared component architecture:

1. **Strategy Components** (`components/*.tsx`) - High-level components for each shop state
2. **Shared Components** (`components/shared/*.tsx`) - Reusable UI elements
3. **Same components used in both**:
   - `OGImageService` for production image generation
   - Storybook for visual development and debugging

This ensures consistency between development preview and production output.

### Node.js Version Management

Project requires Node.js 20.19.0+ for Storybook compatibility. If using version managers:

- **fnm**: `fnm use 20` or `fnm install 20 && fnm use 20`
- **nvm**: `nvm use 20` or `nvm install 20 && nvm use 20`
## Critical @vercel/og Limitations - MUST READ

### ⚠️ Common Errors and How to Fix Them

#### Error: "Expected style zIndex to be unitless"
**Cause:** Using `zIndex: 1px` or any unit with zIndex
**Solution:**
```jsx
// ❌ WRONG
style={{ zIndex: '1px' }} // or zIndex: 1px

// ✅ CORRECT
style={{ zIndex: 1 }} // or just omit zIndex entirely
```

#### Error: "Expected <div> to have explicit display: flex, display: contents, or display: none"
**Cause:** Container with multiple children lacks display property
**Solution:**
```jsx
// ❌ WRONG
<div>
  <Child1 />
  <Child2 />
</div>

// ✅ CORRECT
<div style={{ display: 'flex' }}>
  <Child1 />
  <Child2 />
</div>
```

### Bundle Images Specific Rules

For overlapping images with absolute positioning:
```jsx
// ✅ CORRECT PATTERN
<div style={{ display: 'flex', flexDirection: 'column' }}>
  <div style={{ position: 'relative', display: 'flex', width: '100%', height: '100%' }}>
    <img style={{
      position: 'absolute',
      top: 100,    // Numeric, not '100px'
      left: 100,   // Numeric, not '100px'
      width: 820,  // Numeric, not '820px'
      height: 1093 // Numeric, not '1093px'
    }} />
  </div>
</div>
```

**Key Rules:**
1. Use numeric values without 'px' for styles (top, left, width, height)
2. Use native `<img>` tags, not custom components
3. Always add `display: 'flex'` to containers with multiple children
4. Avoid zIndex or use it without units

# Notatki dotyczące OG Image Generator - Claude

## Problem z logo w @vercel/og (październik 2024)

### Problem
- Logo nie wyświetlało się w wygenerowanych obrazach z @vercel/og
- W Storybook logo działało poprawnie
- Problem dotyczył tylko nowego komponentu `LogoCenteredComponent`

### Przyczyna
@vercel/og ma ograniczoną kompatybilność z CSS i nie obsługuje wszystkich właściwości flexbox tak samo jak zwykły HTML/CSS.

**Problematyczny kod:**
```tsx
// NIE DZIAŁA w @vercel/og
<div style={{ display: 'flex', alignItems: 'center', width: 720, height: 315 }}>
  <img src={logoUrl} style={{ maxWidth: 720, maxHeight: 315 }} />
</div>
```

**Działający kod (jak w ShopLogo):**
```tsx
// DZIAŁA w @vercel/og
<img
  src={logoUrl}
  style={{
    maxWidth: '60%',
    maxHeight: '50%',
    objectFit: 'contain'
  }}
/>
```

### Rozwiązanie
1. **Uprościć strukturę logo** - usunąć niepotrzebne wrapper div-y wokół `<img>`
2. **Używać prostych stylów** - `maxWidth`, `maxHeight`, `objectFit: 'contain'`
3. **Unikać skomplikowanych flexbox-ów** wokół obrazów
4. **Używać procentów zamiast pikseli** dla obrazów (gdy to możliwe)

### Inne problemy napotkane
- **Przekierowania (302)**: `@vercel/og` nie śledzi przekierowań automatycznie
  - Rozwiązanie: dodano `resolveRedirectedUrl()` funkcję

### Zasady na przyszłość

#### Do robienia:
- ✅ Używaj prostej struktury `<img>` jak w `ShopLogo`
- ✅ Testuj komponenty w rzeczywistym środowisku @vercel/og, nie tylko w Storybook
- ✅ Sprawdzaj istniejące działające komponenty przed tworzeniem nowych
- ✅ Używaj `objectFit: 'contain'` dla obrazów
- ✅ Rozwiązuj przekierowania URL przed przekazaniem do @vercel/og

#### Nie robić:
- ❌ Nie dodawaj niepotrzebnych wrapper div-ów wokół `<img>`
- ❌ Nie używaj skomplikowanych flexbox-ów dla prostych obrazów
- ❌ Nie zakładaj, że CSS działa tak samo w @vercel/og jak w przeglądarce
- ❌ Nie testuj tylko w Storybook - zawsze testuj rzeczywiste generowanie obrazów

#### Debugowanie @vercel/og
1. Porównaj z działającymi komponentami (np. `ShopLogo`)
2. Uprość CSS do minimum
3. Usuń wrapper div-y po kolei
4. Testuj rzeczywiste generowanie, nie tylko Storybook

#### Szablony CSS dla @vercel/og

**Logo/obrazy:**
```tsx
<img
  src={url}
  style={{
    maxWidth: '60%',
    maxHeight: '50%',
    objectFit: 'contain'
  }}
/>
```

**Layout kontenerów:**
```tsx
<div style={{
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center'
}}>
```

