import { createRoute } from '@hono/zod-openapi'
import { OGImageShopRequestSchema, ErrorResponseSchema } from './schemas'

export const createShopOGImageRoute = createRoute({
  method: 'post',
  path: '/og/shop',
  tags: ['OG Image Generation'],
  summary: 'Generate shop OG image',
  description: `Generate an Open Graph image for a shop based on its current status.
  
Strategies:
- **coming_soon**: Password/coming soon state with "Coming Soon" banner
- **coming_soon_with_date**: Coming soon with launch date display
- **empty_shop**: Live shop with no products (no "Powered by Fourthwall")
- **default**: Live shop with products showing first product image`,
  request: {
    body: {
      content: {
        'application/json': {
          schema: OGImageShopRequestSchema,
        },
      },
      description: 'Shop OG image configuration with strategy selection',
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Generated OG image',
      content: {
        'image/png': {
          schema: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
    400: {
      description: 'Bad request - validation error or invalid JSON',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
    500: {
      description: 'Internal server error',
      content: {
        'application/json': {
          schema: ErrorResponseSchema,
        },
      },
    },
  },
})
