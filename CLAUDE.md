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
