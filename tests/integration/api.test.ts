import { describe, it, expect, vi } from 'vitest'

// Set GCP environment variables BEFORE any mocks or imports
process.env.GCP_STORAGE_BUCKET = 'test-bucket'
process.env.GCP_PUBSUB_TOPIC = 'test-topic'

vi.mock('../../services/og-generator/OGImageService', () => ({
  OGImageService: {
    generateShopImageBuffer: vi.fn().mockResolvedValue(Buffer.from('fake-image-data')),
  },
}))

vi.mock('../../services/gcp/GCPService', () => ({
  GCPService: vi.fn().mockImplementation(() => ({
    processImage: vi.fn().mockResolvedValue({
      imageUrl: 'gs://test-bucket/test-image.png',
      messageId: 'message-123',
    }),
    getConfiguration: vi.fn().mockReturnValue({
      bucketName: 'test-bucket',
      topicName: 'test-topic',
    }),
  })),
}))

import { app } from '../../app'

describe('API Endpoints', () => {
  describe('POST /og/shop - Strategy Tests', () => {
    it('should generate LOGO_CENTERED image', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LOGO_CENTERED',
          shopId: 'sh_test_logo_centered',
          shopName: 'Test Shop',
          logoUrl: 'https://example.com/logo.png',
        }),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should generate LOGO_CENTERED image with all optional fields', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LOGO_CENTERED',
          shopId: 'sh_test_all_fields',
          shopName: 'Test Shop',
          logoUrl: 'https://example.com/logo.png',
          stylesUrl: 'https://example.com/styles.css',
          poweredBy: false,
        }),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should return 400 for missing strategy', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: 'Test Shop',
        }),
      })

      expect(response.status).toBe(400)
      const json = (await response.json()) as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for invalid strategy', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'invalid_strategy',
          shopName: 'Test Shop',
        }),
      })

      expect(response.status).toBe(400)
      const json = (await response.json()) as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for missing shopName', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LOGO_CENTERED',
        }),
      })

      expect(response.status).toBe(400)
      const json = (await response.json()) as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for empty shopName', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LOGO_CENTERED',
          shopName: '',
        }),
      })

      expect(response.status).toBe(400)
      const json = (await response.json()) as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for invalid JSON', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json',
      })

      expect(response.status).toBe(400)
    })

    it('should handle optional fields correctly', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LOGO_CENTERED',
          shopId: 'sh_test_optional_fields',
          shopName: 'Test Shop',
          stylesUrl: 'https://example.com/styles.css',
          logoUrl: 'https://example.com/logo.png',
          poweredBy: false,
        }),
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })
  })

  describe('GET /doc', () => {
    it('should return OpenAPI specification', async () => {
      const response = await app.request('/doc')

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toContain('application/json')

      const json = (await response.json()) as any
      expect(json.openapi).toBe('3.0.0')
      expect(json.info.title).toBe('OG Image & Bundle Generator API')
      expect(json.paths['/og/shop']).toBeDefined()
    })

    it('should include proper schema definitions', async () => {
      const response = await app.request('/doc')
      const json = (await response.json()) as any

      expect(json.components.schemas).toBeDefined()
      expect(json.components.schemas['OGImageShopRequest']).toBeDefined()
      expect(json.components.schemas['ErrorResponse']).toBeDefined()
    })
  })
})
