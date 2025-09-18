import { createRoute } from '@hono/zod-openapi'
import { z } from 'zod'
import { OGImageShopRequestSchema, ErrorResponseSchema } from './schemas.js'

// Shop data for generating examples with real product images
const SHOPS_DATA = [
  {
    name: 'Cohhilition Store',
    url: 'store.cohhilition.com',
    displayName: 'Cohhilition',
    productImages: [
      'https://imgproxy.fourthwall.com/a1mt3Or3pPUwLBDyQgaPbZh8MC68XIUEXgGw2x8pyso/w:720/sm:1/enc/bexLTO-60ZQdS-u4/ptFMuPygjl7dJxob/0QBOg6dFDk2kQCox/KIZFA14SanXuywuz/3T25s3cqrbEZEWIh/6MIdnZe0fZXdQOlw/QHfI4YsmpI2AXMGj/kQ-6-t9PKTBdaELX/cE-SWpdcxpWaT_MP/LgHc0Fy771nqTiAS/qQxEKfeYs7uAK6Yo/444PpdW-1X1lgh0E/lp-jzzrZ6Kii61vf/4QnF2GIIV5uURi6P/4zKNT6ky-XA',
    ],
  },
  {
    name: 'Anthony Padilla Shop',
    url: 'anthony-padilla-1-shop.fourthwall.com',
    displayName: 'Anthony Padilla',
    productImages: [
      'https://imgproxy.fourthwall.com/kS17RIRJZey84G8quR-VXjzeNy5i7kn-cVawSjzysUA/w:720/sm:1/enc/rHvy0V74qY_tKOiy/90pHU3tTWoNOgciZ/Dr3uif1OM4eNaXaC/hyPwTT21te3BvgNy/4Rt1IZjP-gOk2EKQ/9eHm2PVLG0KziawH/FPHNf1OdgxLHaih5/7z8SeRXX6NuzZQra/0t7zkJUQGu__IaQw/nxAWLQ',
    ],
  },
  {
    name: 'PaymoneyWubby Shop',
    url: 'paymoneywubby-shop.fourthwall.com',
    displayName: 'PaymoneyWubby',
    productImages: [
      'https://cdn.fourthwall.com/offer/sh_5a5494f5-d784-4d33-ac52-eebb2c57de75/ddb58048-3f1d-442b-bcf1-97d24898fcd1.png',
    ],
  },
  {
    name: 'NY Mag Shop',
    url: 'shop.nymag.com',
    displayName: 'NY Mag',
    productImages: [
      'https://imgproxy.fourthwall.com/7DpsLOnMjSLeapCYnDr_P7OgKp2gBikus0JJgfOgyJ4/w:900/sm:1/enc/TlrXGZrj-A-P0NHh/tHkv1ewyPhnBPjIK/CFfk_rOc4xvFTaSg/UUYVNncKnPXSQdfV/y8aSirEv0BI6hOd_/LNwV6raKk14YNcyj/TbSjWkFPmH1c4wks/SKpSLIVIOjSAevHU/e-UC_5sMzqOFYf5L/buHncpTxjrufrnQT/okXUPZYCKrbvNaFL/WiO2BuVzWGBFq5PZ/i3sLqI5J2jNWOIQj/9LVQlg',
    ],
  },
  {
    name: 'MKBHD',
    url: 'mkbhd.com',
    displayName: 'MKBHD',
    productImages: [
      'https://imgproxy.fourthwall.com/Eu01zG-aBTWT_defeLffOTmceu1_MpZaFELrLNYBtFA/w:900/sm:1/enc/tJ7CPaEJr5wrI1-j/rPnvBfFB8zmLXK15/mCR052JWOrnFLdey/OIQHsJCqSr85hBuv/s_LlRHLtdIGWyvY9/Cr0h5wfOEF0CI3ub/CZOIJRjTi4STTdOz/kL6gmj9HXS5SQF7R/MAg1RyiTn2EnjCVR/V_hAT3y43LlW5Djb/OTUJskRY_VamGTWi/yW5kR6bN_NcEZV35/w1zs7Easz_sACH2l/qxXTkw',
    ],
  },
  {
    name: 'Harry Mack Official',
    url: 'shop.harrymackofficial.com',
    displayName: 'Harry Mack',
    productImages: [
      'https://imgproxy.fourthwall.com/znUuftqVFCE6kJZU4wDvBffxOjHJwUrXna3-ydnMw3s/w:720/sm:1/enc/HF42bl3FbnmqoCWP/N8A99lNkB0Dvhrey/LkkhpnM6ahp-d0ED/sJI5dmo-UL5Kek6d/_Yaq0BEgQHyrkp0g/VaHfwfOxmc-qFXUA/Fzf-ooCxu1xzzbzW/Ny2-2alHvjKZV1Uw/_JeOOPfHuhrEvxay/-QvS1EpIDpycqrU2/QGICPwew2bu2B2-I/5n_n7ilS8vtPQG9I/0hpPb9r-1P5ThU1r/4nWZog',
    ],
  },
  {
    name: 'Mads Mitch',
    url: 'madsmitch.com',
    displayName: 'Mads Mitch',
    productImages: [
      'https://imgproxy.fourthwall.com/r-yJ8pEpHYH59oWrCVdxh7TrCvowgtK_LS1hxf9ccK0/w:720/sm:1/enc/o1mPzYDIvr-tFI0Z/PqsRrfFTXXwuGKr1/F_SddOWRBUna5r98/M_p0vZ08hvSVk_tE/h5h0LAJ2xqd4ScNZ/i64ueQyet5i6onKw/kqd86ATHr1-wfa5a/LK2KcbeyZcsNAzDM/3VFx7SW6yROQh424/D1S_wcYZPtcVvuUP/xCaE7htrY-7xICpN/8gECSBnwkUUpbi4B/h2ZNYDr4zjEl-YZ3/v9lY9evJyJZ6s8dc/hde5holPr8U',
    ],
  },
  {
    name: 'Beautiful Bastard',
    url: 'beautifulbastard.com',
    displayName: 'Beautiful Bastard',
    productImages: [
      'https://cdn.fourthwall.com/offer/sh_a770864c-ac52-45bc-9e66-4314ef3ef294/d7197c52-439b-49b0-849d-be8e8af89bd0.jpeg',
    ],
  },
]

// Helper function to generate examples for all shops and strategies
function generateShopExamples() {
  const examples: Record<string, any> = {}

  // Add special test case for missing logo (404 scenario)
  examples['Test Shop (No Logo)'] = {
    value: {
      strategy: 'LOGO_CENTERED',
      shopName: 'Test Shop Without Logo',
      siteUrl: 'test-shop.fourthwall.com',
      logoUrl: 'https://example.com/nonexistent-logo-404.png',
      stylesUrl: 'https://test-shop.fourthwall.com/platform/style.css',
      poweredBy: true,
    },
    summary: 'Test Shop with missing logo (404)',
    description: 'Shows shop name when logo returns 404',
  }

  // Test cases for URL display
  examples['URL Test (Short)'] = {
    value: {
      strategy: 'LOGO_CENTERED',
      shopName: 'Short URL Shop',
      siteUrl: 'short.com',
      logoUrl: 'https://short.com/platform/logo',
      stylesUrl: 'https://short.com/platform/style.css',
      poweredBy: true,
    },
    summary: 'Short URL (under 20 chars)',
    description: 'Tests URL that fits in one line',
  }

  examples['URL Test (Hyphenated)'] = {
    value: {
      strategy: 'LOGO_CENTERED',
      shopName: 'Hyphenated URL Shop',
      siteUrl: 'super-long-shop-name.fourthwall.com',
      logoUrl: 'https://super-long-shop-name.fourthwall.com/platform/logo',
      stylesUrl: 'https://super-long-shop-name.fourthwall.com/platform/style.css',
      poweredBy: true,
    },
    summary: 'Hyphenated URL',
    description: 'Tests URL with hyphens',
  }

  examples['URL Test (Subdomain)'] = {
    value: {
      strategy: 'LOGO_CENTERED',
      shopName: 'Subdomain Shop',
      siteUrl: 'store.cohhilition.com',
      logoUrl: 'https://store.cohhilition.com/platform/logo',
      stylesUrl: 'https://store.cohhilition.com/platform/style.css',
      poweredBy: true,
    },
    summary: 'Subdomain URL',
    description: 'Tests URL with subdomain',
  }

  SHOPS_DATA.forEach((shop) => {
    // Logo Centered example for each shop
    examples[`${shop.displayName}`] = {
      value: {
        strategy: 'LOGO_CENTERED',
        shopName: shop.name,
        siteUrl: shop.url,
        logoUrl: `https://${shop.url}/platform/logo`,
        stylesUrl: `https://${shop.url}/platform/style.css`,
        poweredBy: true,
      },
      summary: `${shop.displayName} shop`,
      description: `${shop.displayName} shop with centered logo and "Powered by Fourthwall" section`,
    }

    // Without powered by section
    examples[`${shop.displayName} (No Powered By)`] = {
      value: {
        strategy: 'LOGO_CENTERED',
        shopName: shop.name,
        siteUrl: shop.url,
        logoUrl: `https://${shop.url}/platform/logo`,
        stylesUrl: `https://${shop.url}/platform/style.css`,
        poweredBy: false,
      },
      summary: `${shop.displayName} shop (no footer)`,
      description: `${shop.displayName} shop with centered logo, without "Powered by Fourthwall" section`,
    }
  })

  return examples
}

export const createShopOGImageAsyncRoute = createRoute({
  method: 'post',
  path: '/og/shop/async',
  tags: ['OG Image Generation'],
  summary: 'Generate shop OG image (async)',
  description: `Generate an Open Graph image for a shop asynchronously. Returns immediately with accepted status while processing in background.
  
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
          examples: generateShopExamples(),
        },
      },
      description: 'Shop OG image configuration with strategy selection',
      required: true,
    },
  },
  responses: {
    202: {
      description: 'Request accepted for processing',
      content: {
        'application/json': {
          schema: z.object({
            status: z.string(),
            message: z.string(),
          }).openapi({
            example: {
              status: 'accepted',
              message: 'OG image generation request received and is being processed',
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

export const createShopOGImageRoute = createRoute({
  method: 'post',
  path: '/og/shop',
  tags: ['OG Image Generation'],
  summary: 'Generate shop OG image',
  description: `Generate an Open Graph image for a shop.

Strategy:
- **LOGO_CENTERED**: Displays the shop logo centered with optional "Powered by Fourthwall" footer`,
  request: {
    body: {
      content: {
        'application/json': {
          schema: OGImageShopRequestSchema,
          examples: generateShopExamples(),
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
