import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { OGImageService } from './services/og-generator/OGImageService.js'
import { createShopOGImageRoute } from './services/og-generator/routes.js'

export function createApp() {
  const app = new OpenAPIHono()

  app.openapi(createShopOGImageRoute, async (c) => {
    const body = c.req.valid('json')

    try {
      const buffer = await OGImageService.generateShopImageBuffer(body)
      return c.body(new Uint8Array(buffer), 200, {
        'Content-Type': 'image/png',
      })
    } catch (error) {
      console.error('Error generating shop OG image:', error)
      return c.json({ error: 'Failed to generate shop OG image' }, 500)
    }
  })

  const servers = process.env.K_SERVICE
    ? [
        {
          url: 'https://og-images-generator-353003853979.us-west1.run.app',
          description: 'Production server',
        },
      ]
    : [
        {
          url: 'http://localhost:3000',
          description: 'Development server',
        },
      ]

  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'OG Image Generator API',
      description: 'API for generating Open Graph images for shops with custom branding',
    },
    servers,
  })

  app.get(
    '/ui',
    swaggerUI({
      url: '/doc',
    }),
  )

  return app
}

export const app = createApp()
