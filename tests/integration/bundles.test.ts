import { describe, it, expect, vi } from 'vitest'

// Set GCP environment variables BEFORE any mocks or imports
process.env.GCP_STORAGE_BUCKET = 'test-bucket'
process.env.GCP_PUBSUB_TOPIC = 'test-topic'

vi.mock('../../services/bundles-generator/BundleImageService', () => ({
  BundleImageService: {
    generateBundleImageBuffer: vi.fn().mockResolvedValue(Buffer.from('fake-bundle-image-data')),
  },
}))

vi.mock('../../services/gcp/GCPService', () => ({
  GCPService: vi.fn().mockImplementation(() => ({
    processImage: vi.fn().mockResolvedValue({
      imageUrl: 'gs://test-bucket/test-bundle.png',
      messageId: 'message-456',
    }),
    getConfiguration: vi.fn().mockReturnValue({
      bucketName: 'test-bucket',
      topicName: 'test-topic',
    }),
  })),
}))

import { app } from '../../app'

describe('Bundle Image Endpoints', () => {
  describe('POST /bundles/generate', () => {
    it('should generate bundle with single product', async () => {
      const response = await app.request('/bundles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          'https://cdn.staging.fourthwall.com/customizations/test.webp',
        ]),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should generate bundle with multiple products', async () => {
      const response = await app.request('/bundles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          'https://cdn.staging.fourthwall.com/customizations/1.webp',
          'https://cdn.staging.fourthwall.com/customizations/2.webp',
          'https://cdn.staging.fourthwall.com/customizations/3.webp',
          'https://cdn.staging.fourthwall.com/customizations/4.webp',
          'https://cdn.staging.fourthwall.com/customizations/5.webp',
        ]),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should handle maximum 12 products', async () => {
      const urls = Array.from({ length: 12 }, (_, i) =>
        `https://cdn.staging.fourthwall.com/customizations/${i + 1}.webp`
      )

      const response = await app.request('/bundles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(urls),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should reject empty array', async () => {
      const response = await app.request('/bundles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([]),
      })

      expect(response.status).toBe(400)
      const data = await response.json() as any
      expect(data.error).toBeDefined()
    })

    it('should reject more than 12 products', async () => {
      const urls = Array.from({ length: 13 }, (_, i) =>
        `https://cdn.staging.fourthwall.com/customizations/${i + 1}.webp`
      )

      const response = await app.request('/bundles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(urls),
      })

      expect(response.status).toBe(400)
      const data = await response.json() as any
      expect(data.error).toBeDefined()
    })

    it('should reject invalid URLs', async () => {
      const response = await app.request('/bundles/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(['not-a-valid-url', 'also-invalid']),
      })

      expect(response.status).toBe(400)
      const data = await response.json() as any
      expect(data.error).toBeDefined()
    })
  })

  describe('POST /bundles/generate/async', () => {
    it('should accept async bundle generation request', async () => {
      const response = await app.request('/bundles/generate/async', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify([
          'https://cdn.staging.fourthwall.com/customizations/1.webp',
          'https://cdn.staging.fourthwall.com/customizations/2.webp',
        ]),
      })

      expect(response.status).toBe(202)
      const data = await response.json() as any
      expect(data.status).toBe('accepted')
      expect(data.message).toContain('Bundle image generation')
    })

    it('should reject invalid JSON in async endpoint', async () => {
      const response = await app.request('/bundles/generate/async', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'not-valid-json',
      })

      expect(response.status).toBe(400)
    })
  })
})