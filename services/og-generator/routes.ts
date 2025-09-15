import { createRoute } from '@hono/zod-openapi'
import { OGImageShopRequestSchema, ErrorResponseSchema } from './schemas'

export const createShopOGImageRoute = createRoute({
  method: 'post',
  path: '/og/shop',
  tags: ['OG Image Generation'],
  summary: 'Generate shop OG image',
  description: `Generate an Open Graph image for a shop based on its current status.
  
Strategies:
- **COMING_SOON**: Password/coming soon state with "Coming Soon" banner
- **COMING_SOON_WITH_DATE**: Coming soon with launch date display
- **EMPTY_SHOP**: Live shop with no products (no "Powered by Fourthwall")
- **LIVE_WITH_PRODUCTS**: Live shop with products showing first product image`,
  request: {
    body: {
      content: {
        'application/json': {
          schema: OGImageShopRequestSchema,
          examples: {
            'Coming Soon': {
              value: {
                strategy: 'COMING_SOON',
                shopName: 'Awesome Merch Store',
                siteUrl: 'awesome-merch.fourthwall.com',
                logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
                stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
                poweredBy: true,
              },
              summary: 'Coming Soon state',
              description: 'Shop in password/coming soon state with "Coming Soon" banner',
            },
            'Coming Soon with Date': {
              value: {
                strategy: 'COMING_SOON_WITH_DATE',
                shopName: 'Epic Creators Shop',
                siteUrl: 'epic-creators.fourthwall.com',
                launchDate: '2024-12-25T00:00:00Z',
                logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
                stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
                poweredBy: true,
              },
              summary: 'Coming Soon with launch date',
              description: 'Shop with countdown timer showing launch date',
            },
            'Empty Shop': {
              value: {
                strategy: 'EMPTY_SHOP',
                shopName: 'New Creator Store',
                siteUrl: 'new-creator.fourthwall.com',
                logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
                stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
              },
              summary: 'Live shop without products',
              description: 'Live shop with no products (no "Powered by Fourthwall")',
            },
            'Live with Products': {
              value: {
                strategy: 'LIVE_WITH_PRODUCTS',
                shopName: 'Premium Merch Hub',
                siteUrl: 'premium-merch.fourthwall.com',
                offerImagesUrls: [
                  'https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k',
                  'https://imgproxy.fourthwall.com/zKahY5AcHjlOmuvNkvFtTO44d-ABD91g24tq56StHZg/w:720/sm:1/enc/QlgEDT8bu2Uw5o_L/JfQAZ2FWM0KaJbwE/8ysGsQ7MTp7tueIr/851yvRSNOoijQmm-/KdO9h45LPtmhTrkI/o9rP891B8llIXVZR/uMbzfqduF_eNRkBD/BIeYnrDwNBAp4F4J/4rRWpZC02j9lRwox/9bB1w3QTuBAxPGF8/WB04hpZ9t5zbCFau/5eJhiX2lXXOD8K8b/y6mTdEGPuDJ_VWRE/6b912w',
                ],
                logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
                stylesUrl: 'https://sandbox-shop.fourthwall.com/platform/style.css',
                poweredBy: true,
              },
              summary: 'Live shop with products',
              description: 'Live shop displaying first product image with "Powered by Fourthwall"',
            },
          },
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
