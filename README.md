# OG Image Generator

A service for generating Open Graph images for e-commerce shops with custom branding.

## Features

- Generate OG images with shop branding
- Support for custom styles and logos
- Multiple product image display
- RESTful API with OpenAPI documentation
- Built with TypeScript and Hono framework

## Prerequisites

- Node.js 18.x or higher
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

## API Endpoints

### POST /og/shop

Generate an OG image for a shop based on its current status.

**Strategies:**
- `coming_soon` - Password/coming soon state with "Coming Soon" banner
- `coming_soon_with_date` - Coming soon with launch date display
- `empty_shop` - Live shop with no products (no "Powered by Fourthwall")
- `default` - Live shop with products showing first product image

**Request Body:**
```json
{
  "strategy": "default",
  "shopName": "My Shop",
  "siteUrl": "myshop.com",
  "logoUrl": "https://example.com/logo.png",
  "stylesUrl": "https://example.com/styles.css",
  
  // Required for 'default' strategy
  "offerImagesUrls": ["https://example.com/product.jpg"],
  
  // Required for 'coming_soon_with_date' strategy
  "launchDate": "2024-12-25T00:00:00Z",
  
  // Optional - auto-set based on strategy if not provided
  "poweredBy": true
}
```

**Response:** PNG image

**Strategy-specific requirements:**
- `default`: Requires `offerImagesUrls` array with at least one product image
- `coming_soon_with_date`: Requires `launchDate` in ISO 8601 format
- `empty_shop`: Automatically sets `poweredBy` to false
- All other strategies: Automatically set `poweredBy` to true unless specified

## License

ISC
