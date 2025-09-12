import { createRoute } from '@hono/zod-openapi'
import { OGImageShopRequestSchema, ErrorResponseSchema } from './schemas'

export const createShopOGImageRoute = createRoute({
  method: 'post',
  path: '/og/shop',
  tags: ['OG Image Generation'],
  summary: 'Generate shop OG image',
  description: 'Generate an Open Graph image for a shop with custom branding, products, and styles',
  request: {
    body: {
      content: {
        'application/json': {
          schema: OGImageShopRequestSchema,
        },
      },
      description: 'Shop OG image configuration',
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
