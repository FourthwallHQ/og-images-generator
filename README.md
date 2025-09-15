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

## Installation

```bash
npm install
```

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

- `COMING_SOON` - Password/coming soon state with "Coming Soon" banner
- `COMING_SOON_WITH_DATE` - Coming soon with launch date display
- `EMPTY_SHOP` - Live shop with no products (no "Powered by Fourthwall")
- `LIVE_WITH_PRODUCTS` - Live shop with products showing first product image

**Request Body:**

```json
{
  "strategy": "LIVE_WITH_PRODUCTS",
  "shopName": "My Shop",
  "siteUrl": "myshop.com",
  "logoUrl": "https://example.com/logo.png",
  "stylesUrl": "https://example.com/styles.css",

  // Required for 'LIVE_WITH_PRODUCTS' strategy
  "offerImagesUrls": ["https://example.com/product.jpg"],

  // Required for 'COMING_SOON_WITH_DATE' strategy
  "launchDate": "2024-12-25T00:00:00Z",

  // Optional - auto-set based on strategy if not provided
  "poweredBy": true
}
```

**Response:** PNG image

**Strategy-specific requirements:**

- `LIVE_WITH_PRODUCTS`: Requires `offerImagesUrls` array with at least one product image
- `COMING_SOON_WITH_DATE`: Requires `launchDate` in ISO 8601 format
- `EMPTY_SHOP`: Automatically sets `poweredBy` to false
- All other strategies: Automatically set `poweredBy` to true unless specified

## Project Structure

```
services/og-generator/
├── OGImageService.tsx          # Main service for image generation
├── components/                 # Strategy-specific components
│   ├── ComingSoonComponent.tsx
│   ├── ComingSoonWithDateComponent.tsx
│   ├── EmptyShopComponent.tsx
│   ├── LiveWithProductsComponent.tsx
│   ├── OGImageStories.stories.tsx
│   └── shared/                # Reusable UI components
│       ├── ShopLogo.tsx
│       ├── ShopInfo.tsx
│       ├── PoweredBySection.tsx
│       ├── LeftColumn.tsx
│       ├── RightColumn.tsx
│       ├── ComingSoonBanner.tsx
│       ├── LaunchDateBanner.tsx
│       └── OGImageWrapper.tsx
├── schemas.ts                  # Zod validation schemas
├── styles-parser.ts           # CSS variable parser
└── routes.ts                  # API route definitions
```

## Architecture Notes

- **Component Architecture**: OG image components are shared between the image generation service and Storybook for consistent rendering
- **Image Size**: All OG images are generated at 1200x630px (standard OG image dimensions)
- **Storybook Integration**: Components are wrapped in `OGImageWrapper` to simulate the exact dimensions used in production
- **Strategy Pattern**: Different shop states use dedicated components while sharing common UI elements from the `shared/` directory

## License

ISC
