# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with hot reload on port 3000
- `npm run build` - Compile TypeScript to JavaScript in dist/
- `npm start` - Run production server (requires npm run build first)

### Testing
- `npm test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once (used in CI)
- `npm run test:ui` - Run tests with Vitest UI

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
- `OGImageService.tsx` - Main service that generates PNG buffers
- `components.tsx` - React JSX components for image layouts
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

5. **No linting/formatting** - Project doesn't have ESLint or Prettier configured yet. Consider adding if needed.

## Common Tasks

### Adding a new OG image endpoint
1. Create new schema in `services/og-generator/schemas.ts`
2. Create route definition in `services/og-generator/routes.ts`
3. Add handler in `app.ts` using `app.openapi()`
4. Add JSX component in `services/og-generator/components.tsx`
5. Update OGImageService with new generation method
6. Add tests in `tests/integration/api.test.ts`

### Modifying image generation
- Image components use React JSX with inline styles
- Components are in `services/og-generator/components.tsx`
- Use absolute positioning and flexbox for layouts
- Images are 1200x630px (standard OG image size)

### Running single test
```bash
npx vitest run path/to/test.ts
```