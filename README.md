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

Generate an OG image for a shop.

**Request Body:**
```json
{
  "shopName": "My Shop",
  "offerImagesUrls": ["https://example.com/product.jpg"],
  "logoUrl": "https://example.com/logo.png",
  "stylesUrl": "https://example.com/styles.css",
  "poweredBy": true
}
```

**Response:** PNG image

## License

ISC
