import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { BundleImageRequestSchema } from './schemas.js'
import { ErrorResponseSchema } from '../og-generator/schemas.js'

function generateBundleExamples() {
  return {
    'Single Product': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
      ],
      summary: '1 product image',
      description: 'Single product centered in the image',
    },
    'Two Products': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
        'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
      ],
      summary: '2 product images',
      description: 'Two products in vertical layout',
    },
    'Three Products': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
        'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
      ],
      summary: '3 product images',
      description: 'Three products in optimized layout',
    },
    'Four Products Grid': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
        'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp',
      ],
      summary: '4 product images',
      description: 'Four products in 2x2 grid',
    },
    'Five Products': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
        'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/b9378402-27cf-4b5c-ac1c-bedd0ba43732.webp',
      ],
      summary: '5 product images',
      description: 'Five products in optimized grid layout',
    },
    'Six Products Grid': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
        'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/b9378402-27cf-4b5c-ac1c-bedd0ba43732.webp',
        'https://cdn.staging.fourthwall.com/offer/sh_a770864c-ac52-45bc-9e66-4314ef3ef294/d7197c52-439b-49b0-849d-be8e8af89bd0.jpeg',
      ],
      summary: '6 product images',
      description: 'Six products in 2x3 grid',
    },
    'Test with Invalid URL': {
      value: [
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
        'https://example.com/non-existent-image-404.png',
        'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
      ],
      summary: 'Mix of valid and invalid URLs',
      description: 'Tests fallback behavior for unavailable images',
    },
  }
}

export const createBundleImageRoute = createRoute({
  method: 'post',
  path: '/bundles/generate',
  tags: ['Bundle Image Generation'],
  summary: 'Generate bundle image from product images',
  description: `Generate a composite bundle image from an array of product image URLs.

The generated image has dimensions of 1536x2048px (3:4 aspect ratio, portrait format).

Layouts are optimized based on the number of products

Maximum of 5 product images are supported.`,
  request: {
    body: {
      content: {
        'application/json': {
          schema: BundleImageRequestSchema,
          examples: generateBundleExamples(),
        },
      },
      description: 'Array of product image URLs (1-12 images)',
      required: true,
    },
  },
  responses: {
    200: {
      description: 'Generated bundle image',
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

export const createBundleImageAsyncRoute = createRoute({
  method: 'post',
  path: '/bundles/generate/async',
  tags: ['Bundle Image Generation'],
  summary: 'Generate bundle image asynchronously',
  description: `Generate a composite bundle image asynchronously. Returns immediately with accepted status while processing in background.

The generated image has dimensions of 1536x2048px (3:4 aspect ratio).`,
  request: {
    body: {
      content: {
        'application/json': {
          schema: BundleImageRequestSchema,
          examples: generateBundleExamples(),
        },
      },
      description: 'Array of product image URLs (1-12 images)',
      required: true,
    },
  },
  responses: {
    202: {
      description: 'Request accepted for processing',
      content: {
        'application/json': {
          schema: z
            .object({
              status: z.string(),
              message: z.string(),
            })
            .openapi({
              example: {
                status: 'accepted',
                message: 'Bundle image generation request received and is being processed',
              },
            }),
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
