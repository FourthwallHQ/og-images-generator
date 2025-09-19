# OG Image Generator

A service for generating Open Graph images for e-commerce shops with custom branding.

## Features

- Generate OG images with shop branding
- Support for custom styles and logos
- Multiple product image display
- RESTful API with OpenAPI documentation
- Built with TypeScript and Hono framework

## Prerequisites

- Node.js 20.19.0 or higher (required for Storybook compatibility)
- npm
- Google Cloud SDK (for GCP integration)

## Installation

```bash
npm install
```

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

Required GCP environment variables:
- `GCP_STORAGE_BUCKET` - GCS bucket for storing generated images
- `GCP_PUBSUB_TOPIC` - Pub/Sub topic for publishing image generation events

## Development

Run the development server with hot reload:

```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Storybook

For visual development and debugging of OG image components:

```bash
npm run storybook
```

Storybook will start at `http://localhost:6006`

Build static Storybook:

```bash
npm run build-storybook
```

## Production

Build and run the production server:

```bash
npm run build
npm start
```

## API Documentation

- Swagger UI: `http://localhost:3000/ui`
- OpenAPI Spec: `http://localhost:3000/doc`

## Testing

Run tests:

```bash
npm test
```

Run tests with UI:

```bash
npm run test:ui
```

Run tests once (CI mode):

```bash
npm run test:run
```

## Code Quality

Format code with Prettier:

```bash
npm run format
```

Check formatting:

```bash
npm run format:check
```

## API Endpoints

### POST /og/shop

Generate an OG image for a shop based on its current status.

**Strategies:**

- `LOGO_CENTERED` - Displays the shop logo centered with optional "Powered by Fourthwall" footer

**Request Body:**

```json
{
  "strategy": "LOGO_CENTERED",
  "shopName": "My Shop",
  "logoUrl": "https://example.com/logo.png",
  "stylesUrl": "https://example.com/styles.css",
  "poweredBy": true
}
```

**Response:** PNG image

**GCP Integration (if configured):**
- Uploads image to GCS bucket: `gs://{bucket}/og-images/{shop-name}/{strategy}_{timestamp}.png`
- Publishes event to Pub/Sub with image URL and metadata

**Strategy-specific requirements:**

- `strategy` (required): Must be "LOGO_CENTERED"
- `shopName` (required): Name of the shop
- `logoUrl` (optional): URL to shop logo image
- `stylesUrl` (optional): URL to CSS file with shop styles
- `poweredBy` (optional): Show "Powered by Fourthwall" section (defaults to true)

## Project Structure

```
services/og-generator/
├── OGImageService.tsx          # Main service for image generation
├── components/                 # Strategy-specific components
│   ├── LogoCenteredComponent.tsx
│   ├── OGImageStories.stories.tsx
│   └── shared/                # Reusable UI components
│       ├── PoweredBySection.tsx
│       └── OGImageWrapper.tsx
├── schemas.ts                  # Zod validation schemas
├── styles-parser.ts           # CSS variable parser
├── font-loader.ts             # Font loading utilities
└── routes.ts                  # API route definitions
```

## Bundle Images

```
1536x2048 - Image Output Size (3:4)

request body: [
'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp',
'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/b9378402-27cf-4b5c-ac1c-bedd0ba43732.webp'

]

```

## MCP (Model Context Protocol) Support

This project includes MCP configuration for enhanced AI-assisted development:

### Context7 MCP
Provides up-to-date documentation for libraries used in the project. To use:
- In your AI code editor (Cursor, Claude Code, etc.), add `use context7` to your prompts
- Example: "How do I create custom styles with @vercel/og? use context7"

### Figma Dev Mode MCP
Synchronizes Figma designs directly with code generation:

**Setup Requirements:**
1. Figma desktop app (required - doesn't work in browser)
2. Dev or Full seat on Professional, Organization, or Enterprise plan
3. Enable Dev Mode in Figma (Shift + D)
4. Local server runs at `http://127.0.0.1:3845/mcp`

**How to Use:**
1. Open your design in Figma desktop app
2. Switch to Dev Mode (Shift + D)
3. Select the frame/component you want to implement
4. In your AI editor, reference the selected Figma context
5. The MCP will provide component properties, styles, variables, and layout data

**Design Components in Figma:**
- **OG Images**: 1200x630px templates for shop pages
- **Bundle Images**: 1536x2048px (3:4) product grid layouts
- **Shared Components**: PoweredBySection, logos, typography system
- **Design Tokens**: Colors, spacing, Suisse Int'l & PPTelegraf fonts

### Supported Libraries (Context7)
- @vercel/og - Image generation
- Hono & @hono/zod-openapi - Web framework and API documentation
- Zod - Schema validation
- React - Component development
- Storybook - Component documentation
- Vitest - Testing

## Architecture Notes

- **Component Architecture**: OG image components are shared between the image generation service and Storybook for consistent rendering
- **Image Size**: All OG images are generated at 1200x630px (standard OG image dimensions)
- **Bundle Images**: Support for 1-5 product images in 1536x2048px format (3:4 aspect ratio)
- **Storybook Integration**: Components are wrapped in `OGImageWrapper` to simulate the exact dimensions used in production
- **Strategy Pattern**: Currently supports LOGO_CENTERED strategy with shared UI components in the `shared/` directory
- **GCP Integration**: Optional upload to Cloud Storage and Pub/Sub notifications using service account authentication with async processing

## License

ISC
