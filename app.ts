import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { OGImageService } from './services/og-generator/OGImageService.js'
import { createShopOGImageRoute, createShopOGImageAsyncRoute } from './services/og-generator/routes.js'
import { GCPService } from './services/gcp/GCPService.js'

export function createApp() {
  const app = new OpenAPIHono()
  let gcpService: GCPService

  try {
    gcpService = new GCPService()
  } catch (error) {
    console.error('Failed to initialize GCP services:', error)
    throw error
  }

  // Synchronous endpoint - returns image immediately with background GCP processing
  app.openapi(createShopOGImageRoute, async (c) => {
    const body = c.req.valid('json')

    try {
      const buffer = await OGImageService.generateShopImageBuffer(body)
      
      // Process image with GCP services asynchronously
      gcpService.processImage(buffer, body)
        .then((gcpResult) => {
          console.log('GCP processing completed:', gcpResult)
        })
        .catch((gcpError) => {
          console.error('Error processing image with GCP services:', gcpError)
        })

      return c.body(new Uint8Array(buffer), 200, {
        'Content-Type': 'image/png',
      })
    } catch (error) {
      console.error('Error generating shop OG image:', error)
      return c.json({ error: 'Failed to generate shop OG image' }, 500)
    }
  })

  // Asynchronous endpoint - returns accepted immediately, processes in background
  app.openapi(createShopOGImageAsyncRoute, async (c) => {
    const body = c.req.valid('json')

    try {
      // Generate and process image asynchronously in background
      OGImageService.generateShopImageBuffer(body)
        .then(async (buffer) => {
          try {
            const gcpResult = await gcpService.processImage(buffer, body)
            console.log('Async GCP processing completed:', gcpResult)
          } catch (gcpError) {
            console.error('Error in async GCP processing:', gcpError)
          }
        })
        .catch((error) => {
          console.error('Error in async OG image generation:', error)
        })

      // Return immediate accepted response
      return c.json({ 
        status: 'accepted',
        message: 'OG image generation request received and is being processed'
      }, 202)
    } catch (error) {
      console.error('Error initiating async OG image generation:', error)
      return c.json({ error: 'Failed to initiate OG image generation' }, 500)
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
