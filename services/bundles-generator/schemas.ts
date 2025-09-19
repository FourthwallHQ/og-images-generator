import { z } from '@hono/zod-openapi'

export const BundleImageRequestSchema = z
  .array(z.url())
  .min(1)
  .max(12)
  .openapi({
    example: [
      'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
      'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
      'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
      'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp',
      'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/b9378402-27cf-4b5c-ac1c-bedd0ba43732.webp',
    ],
    description: 'Array of product image URLs (1-12 images)',
  })
  .describe('BundleImageRequest')

export type BundleImageRequest = z.infer<typeof BundleImageRequestSchema>
