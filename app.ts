import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { OGImageService } from './services/og-generator/OGImageService.js'
import {
  createShopOGImageRoute,
  createShopOGImageAsyncRoute,
} from './services/og-generator/routes.js'
import { BundleImageService } from './services/bundles-generator/BundleImageService.js'
import {
  createBundleImageRoute,
  createBundleImageAsyncRoute,
} from './services/bundles-generator/routes.js'
import { GCPService } from './services/gcp/GCPService.js'

export function createApp() {
  const app = new OpenAPIHono()
  let gcpService: GCPService | null = null

  // Only initialize GCP services if environment variables are set
  const isGCPConfigured = process.env.GCP_STORAGE_BUCKET && process.env.GCP_PUBSUB_TOPIC

  if (isGCPConfigured) {
    try {
      gcpService = new GCPService()
      console.log('✅ GCP services initialized successfully')
    } catch (error) {
      console.error('Failed to initialize GCP services:', error)
      throw error
    }
  } else {
    console.log('⚠️ GCP services not configured - running without Cloud Storage and Pub/Sub integration')
  }

  // Synchronous endpoint - returns image immediately with background GCP processing
  app.openapi(createShopOGImageRoute, async (c) => {
    const body = c.req.valid('json')

    try {
      const buffer = await OGImageService.generateShopImageBuffer(body)

      // Process image with GCP services asynchronously if configured
      if (gcpService) {
        gcpService
          .processImage(buffer, body)
          .then((gcpResult) => {
            console.log('GCP processing completed:', gcpResult)
          })
          .catch((gcpError) => {
            console.error('Error processing image with GCP services:', gcpError)
          })
      }

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
          if (gcpService) {
            try {
              const gcpResult = await gcpService.processImage(buffer, body)
              console.log('Async GCP processing completed:', gcpResult)
            } catch (gcpError) {
              console.error('Error in async GCP processing:', gcpError)
            }
          }
        })
        .catch((error) => {
          console.error('Error in async OG image generation:', error)
        })

      // Return immediate accepted response
      return c.json(
        {
          status: 'accepted',
          message: 'OG image generation request received and is being processed',
        },
        202,
      )
    } catch (error) {
      console.error('Error initiating async OG image generation:', error)
      return c.json({ error: 'Failed to initiate OG image generation' }, 500)
    }
  })

  // Bundle image endpoints
  app.openapi(createBundleImageRoute, async (c) => {
    const body = c.req.valid('json')

    try {
      const buffer = await BundleImageService.generateBundleImageBuffer(body)

      // Process image with GCP services asynchronously if configured
      if (gcpService) {
        gcpService
          .processImage(buffer, body as any)
          .then((gcpResult) => {
            console.log('GCP processing completed for bundle:', gcpResult)
          })
          .catch((gcpError) => {
            console.error('Error processing bundle image with GCP services:', gcpError)
          })
      }

      return c.body(new Uint8Array(buffer), 200, {
        'Content-Type': 'image/png',
      })
    } catch (error) {
      console.error('Error generating bundle image:', error)
      return c.json({ error: 'Failed to generate bundle image' }, 500)
    }
  })

  // Asynchronous bundle endpoint
  app.openapi(createBundleImageAsyncRoute, async (c) => {
    const body = c.req.valid('json')

    try {
      // Generate and process image asynchronously in background
      BundleImageService.generateBundleImageBuffer(body)
        .then(async (buffer) => {
          if (gcpService) {
            try {
              const gcpResult = await gcpService.processImage(buffer, body as any)
              console.log('Async GCP processing completed for bundle:', gcpResult)
            } catch (gcpError) {
              console.error('Error in async GCP processing for bundle:', gcpError)
            }
          }
        })
        .catch((error) => {
          console.error('Error in async bundle image generation:', error)
        })

      // Return immediate accepted response
      return c.json(
        {
          status: 'accepted',
          message: 'Bundle image generation request received and is being processed',
        },
        202,
      )
    } catch (error) {
      console.error('Error initiating async bundle image generation:', error)
      return c.json({ error: 'Failed to initiate bundle image generation' }, 500)
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
      title: 'OG Image & Bundle Generator API',
      description:
        'API for generating Open Graph images for shops and bundle images from product collections',
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
