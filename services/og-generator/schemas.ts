import { z } from '@hono/zod-openapi'

export const ErrorResponseSchema = z
  .object({
    error: z.string(),
    issues: z
      .array(
        z.object({
          path: z.string(),
          message: z.string(),
        }),
      )
      .optional(),
  })
  .openapi('ErrorResponse')

export const StrategyEnum = z.enum(['LOGO_CENTERED']).openapi({
  description: 'OG image generation strategy',
  example: 'LOGO_CENTERED',
})

export const OGImageShopRequestSchema = z
  .object({
    strategy: StrategyEnum,
    shopId: z.string().openapi({
      example: 'sh_3ba9ad10-1056-4fe6-bdd4-0b49a2a7f7a4',
      description: 'Unique identifier for the shop',
    }),
    shopName: z.string().min(1).openapi({
      example: 'sandbox-shop.fourthwall.com',
      description: 'Name of the shop',
    }),
    stylesUrl: z
      .union([z.url(), z.literal('')])
      .optional()
      .default('')
      .openapi({
        example: 'https://sandbox-shop.fourthwall.com/platform/style.css',
        description: 'URL to CSS file with shop styles',
      }),
    logoUrl: z
      .union([z.url(), z.literal('')])
      .optional()
      .default('')
      .openapi({
        example: 'https://sandbox-shop.fourthwall.com/platform/logo',
        description: 'URL to shop logo image',
      }),
    poweredBy: z.boolean().optional().openapi({
      example: true,
      description: 'Show "Powered by Fourthwall" section (defaults to true)',
    }),
  })
  .openapi('OGImageShopRequest')

export type OGImageShopRequest = z.infer<typeof OGImageShopRequestSchema>
