import { z } from '@hono/zod-openapi'


export const ErrorResponseSchema = z.object({
  error: z.string(),
  issues: z.array(z.object({
    path: z.string(),
    message: z.string()
  })).optional()
}).openapi('ErrorResponse')


export const OGImageShopRequestSchema = z.object({
  offerImagesUrls: z.array(z.url()).min(1).openapi({
    example: [
      'https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k',
      'https://imgproxy.fourthwall.com/zKahY5AcHjlOmuvNkvFtTO44d-ABD91g24tq56StHZg/w:720/sm:1/enc/QlgEDT8bu2Uw5o_L/JfQAZ2FWM0KaJbwE/8ysGsQ7MTp7tueIr/851yvRSNOoijQmm-/KdO9h45LPtmhTrkI/o9rP891B8llIXVZR/uMbzfqduF_eNRkBD/BIeYnrDwNBAp4F4J/4rRWpZC02j9lRwox/9bB1w3QTuBAxPGF8/WB04hpZ9t5zbCFau/5eJhiX2lXXOD8K8b/y6mTdEGPuDJ_VWRE/6b912w',
      'https://imgproxy.fourthwall.com/Yih6UMzazcfX4d-v4k9wCVaZPSMKFxc2AO4PjyIovGA/w:900/sm:1/enc/1iKZJCi5yvqS-s-U/BRZRo_wrfImHCR_B/S3W-I-PJM_CiNWNf/21wuEVeHkyREaaDf/1w0ur-9sO_kf0oQp/-g1Ovrj8TwiXl06y/3QZ2RQKMfA3YD5Mf/S6R-oCobe5uXBW1r/AK76WbNmRFXLojkl/qa7jeY_O-zU6W4UI/ohuIVvZKugnXeYVF/0-4p9nn8ytvjQ5g-/PyjgeTQ3xnneQG3P/bW5k7g'
    ],
    description: 'Array of product image URLs'
  }),
  stylesUrl: z.union([z.url(), z.literal('')]).optional().default('').openapi({
    example: 'https://sandbox-shop.fourthwall.com/platform/style.css',
    description: 'URL to CSS file with shop styles'
  }),
  logoUrl: z.union([z.url(), z.literal('')]).optional().default('').openapi({
    example: 'https://sandbox-shop.fourthwall.com/platform/logo',
    description: 'URL to shop logo image'
  }),
  shopName: z.string().min(1).openapi({
    example: 'sandbox-shop.fourthwall.com',
    description: 'Name of the shop'
  }),
  poweredBy: z.boolean().optional().default(false).openapi({
    example: true,
    description: 'Show "Powered by Fourthwall" section'
  }),
}).openapi('OGImageShopRequest')


export type OGImageShopRequest = z.infer<typeof OGImageShopRequestSchema>
