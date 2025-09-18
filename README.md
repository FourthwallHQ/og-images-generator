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

## Architecture Notes

- **Component Architecture**: OG image components are shared between the image generation service and Storybook for consistent rendering
- **Image Size**: All OG images are generated at 1200x630px (standard OG image dimensions)
- **Storybook Integration**: Components are wrapped in `OGImageWrapper` to simulate the exact dimensions used in production
- **Strategy Pattern**: Currently supports LOGO_CENTERED strategy with shared UI components in the `shared/` directory
- **GCP Integration**: Mandatory upload to Cloud Storage and Pub/Sub notifications using service account authentication with async processing

## License

ISC
