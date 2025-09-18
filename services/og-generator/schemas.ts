import { z } from '@hono/zod-openapi'

const SHOPS_TO_TEST = {
  'https://store.cohhilition.com/': [
    'https://imgproxy.fourthwall.com/a1mt3Or3pPUwLBDyQgaPbZh8MC68XIUEXgGw2x8pyso/w:720/sm:1/enc/bexLTO-60ZQdS-u4/ptFMuPygjl7dJxob/0QBOg6dFDk2kQCox/KIZFA14SanXuywuz/3T25s3cqrbEZEWIh/6MIdnZe0fZXdQOlw/QHfI4YsmpI2AXMGj/kQ-6-t9PKTBdaELX/cE-SWpdcxpWaT_MP/LgHc0Fy771nqTiAS/qQxEKfeYs7uAK6Yo/444PpdW-1X1lgh0E/lp-jzzrZ6Kii61vf/4QnF2GIIV5uURi6P/4zKNT6ky-XA',
  ],
  'https://anthony-padilla-1-shop.fourthwall.com/': [
    'https://imgproxy.fourthwall.com/kS17RIRJZey84G8quR-VXjzeNy5i7kn-cVawSjzysUA/w:720/sm:1/enc/rHvy0V74qY_tKOiy/90pHU3tTWoNOgciZ/Dr3uif1OM4eNaXaC/hyPwTT21te3BvgNy/4Rt1IZjP-gOk2EKQ/9eHm2PVLG0KziawH/FPHNf1OdgxLHaih5/7z8SeRXX6NuzZQra/0t7zkJUQGu__IaQw/nxAWLQ',
  ],
  'https://paymoneywubby-shop.fourthwall.com/': [
    'https://imgproxy.fourthwall.com/2Ta5R33TxvUNCOeb2a5Im4gFPvB96fY68VU9KriRSrE/w:220/sm:1/enc/Badv7acTylTBJtEi/OkjYyb7LgHwBUHgB/oT0cyi169zTIYNls/yh1mIXiudW-IMG4o/tOSuDIWXDwjqrT3F/mqmqPORczUXjxRm8/cUOKOZPvdg8ZBbdy/R5aIHgrEy-tO63ZB/6FIj2hexqjj7ICgr/-LbrXcFNmJlorZu6/jCYHyNnun9BPUAew/4k8UOar3iRgSiSBE/WEQCHNu_-CgFnp1Y/ghZuUQ',
  ],
  'https://shop.nymag.com/': [
    'https://imgproxy.fourthwall.com/7DpsLOnMjSLeapCYnDr_P7OgKp2gBikus0JJgfOgyJ4/w:900/sm:1/enc/TlrXGZrj-A-P0NHh/tHkv1ewyPhnBPjIK/CFfk_rOc4xvFTaSg/UUYVNncKnPXSQdfV/y8aSirEv0BI6hOd_/LNwV6raKk14YNcyj/TbSjWkFPmH1c4wks/SKpSLIVIOjSAevHU/e-UC_5sMzqOFYf5L/buHncpTxjrufrnQT/okXUPZYCKrbvNaFL/WiO2BuVzWGBFq5PZ/i3sLqI5J2jNWOIQj/9LVQlg',
  ],
  'https://mkbhd.com/': [
    'https://imgproxy.fourthwall.com/Eu01zG-aBTWT_defeLffOTmceu1_MpZaFELrLNYBtFA/w:900/sm:1/enc/tJ7CPaEJr5wrI1-j/rPnvBfFB8zmLXK15/mCR052JWOrnFLdey/OIQHsJCqSr85hBuv/s_LlRHLtdIGWyvY9/Cr0h5wfOEF0CI3ub/CZOIJRjTi4STTdOz/kL6gmj9HXS5SQF7R/MAg1RyiTn2EnjCVR/V_hAT3y43LlW5Djb/OTUJskRY_VamGTWi/yW5kR6bN_NcEZV35/w1zs7Easz_sACH2l/qxXTkw',
  ],
  'https://shop.harrymackofficial.com/': [
    'https://imgproxy.fourthwall.com/znUuftqVFCE6kJZU4wDvBffxOjHJwUrXna3-ydnMw3s/w:720/sm:1/enc/HF42bl3FbnmqoCWP/N8A99lNkB0Dvhrey/LkkhpnM6ahp-d0ED/sJI5dmo-UL5Kek6d/_Yaq0BEgQHyrkp0g/VaHfwfOxmc-qFXUA/Fzf-ooCxu1xzzbzW/Ny2-2alHvjKZV1Uw/_JeOOPfHuhrEvxay/-QvS1EpIDpycqrU2/QGICPwew2bu2B2-I/5n_n7ilS8vtPQG9I/0hpPb9r-1P5ThU1r/4nWZog',
  ],
  'https://madsmitch.com/': [
    'https://imgproxy.fourthwall.com/r-yJ8pEpHYH59oWrCVdxh7TrCvowgtK_LS1hxf9ccK0/w:720/sm:1/enc/o1mPzYDIvr-tFI0Z/PqsRrfFTXXwuGKr1/F_SddOWRBUna5r98/M_p0vZ08hvSVk_tE/h5h0LAJ2xqd4ScNZ/i64ueQyet5i6onKw/kqd86ATHr1-wfa5a/LK2KcbeyZcsNAzDM/3VFx7SW6yROQh424/D1S_wcYZPtcVvuUP/xCaE7htrY-7xICpN/8gECSBnwkUUpbi4B/h2ZNYDr4zjEl-YZ3/v9lY9evJyJZ6s8dc/hde5holPr8U',
  ],
  'https://beautifulbastard.com/': [
    'https://cdn.fourthwall.com/offer/sh_a770864c-ac52-45bc-9e66-4314ef3ef294/d7197c52-439b-49b0-849d-be8e8af89bd0.jpeg',
  ],
}

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

export const StrategyEnum = z
  .enum(['COMING_SOON', 'COMING_SOON_WITH_DATE', 'EMPTY_SHOP', 'LIVE_WITH_PRODUCTS', 'LOGO_CENTERED'])
  .openapi({
    description: 'OG image generation strategy based on shop status',
    example: 'LIVE_WITH_PRODUCTS',
  })

export const OGImageShopRequestSchema = z
  .object({
    strategy: StrategyEnum,
    shopName: z.string().min(1).openapi({
      example: 'sandbox-shop.fourthwall.com',
      description: 'Name of the shop',
    }),
    siteUrl: z.string().optional().openapi({
      example: 'sandbox-shop.fourthwall.com',
      description: 'Shop URL to display',
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
    launchDate: z.string().optional().openapi({
      example: '2024-12-25T00:00:00Z',
      description: 'Launch date for coming_soon_with_date strategy (ISO 8601 format)',
    }),
    offerImagesUrls: z
      .array(z.url())
      .optional()
      .openapi({
        example: [
          'https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k',
          'https://imgproxy.fourthwall.com/zKahY5AcHjlOmuvNkvFtTO44d-ABD91g24tq56StHZg/w:720/sm:1/enc/QlgEDT8bu2Uw5o_L/JfQAZ2FWM0KaJbwE/8ysGsQ7MTp7tueIr/851yvRSNOoijQmm-/KdO9h45LPtmhTrkI/o9rP891B8llIXVZR/uMbzfqduF_eNRkBD/BIeYnrDwNBAp4F4J/4rRWpZC02j9lRwox/9bB1w3QTuBAxPGF8/WB04hpZ9t5zbCFau/5eJhiX2lXXOD8K8b/y6mTdEGPuDJ_VWRE/6b912w',
          'https://imgproxy.fourthwall.com/Yih6UMzazcfX4d-v4k9wCVaZPSMKFxc2AO4PjyIovGA/w:900/sm:1/enc/1iKZJCi5yvqS-s-U/BRZRo_wrfImHCR_B/S3W-I-PJM_CiNWNf/21wuEVeHkyREaaDf/1w0ur-9sO_kf0oQp/-g1Ovrj8TwiXl06y/3QZ2RQKMfA3YD5Mf/S6R-oCobe5uXBW1r/AK76WbNmRFXLojkl/qa7jeY_O-zU6W4UI/ohuIVvZKugnXeYVF/0-4p9nn8ytvjQ5g-/PyjgeTQ3xnneQG3P/bW5k7g',
        ],
        description: 'Array of product image URLs (required for LIVE_WITH_PRODUCTS strategy)',
      }),
    poweredBy: z.boolean().optional().openapi({
      example: true,
      description:
        'Show "Powered by Fourthwall" section (auto-set based on strategy if not provided)',
    }),
  })
  .refine(
    (data) => {
      if (
        data.strategy === 'LIVE_WITH_PRODUCTS' &&
        (!data.offerImagesUrls || data.offerImagesUrls.length === 0)
      ) {
        return false
      }
      if (data.strategy === 'COMING_SOON_WITH_DATE' && !data.launchDate) {
        return false
      }
      return true
    },
    {
      message: 'Invalid data for selected strategy',
      path: ['strategy'],
    },
  )
  .openapi('OGImageShopRequest')

export type OGImageShopRequest = z.infer<typeof OGImageShopRequestSchema>
