import { describe, it, expect, beforeAll, vi } from 'vitest'
import { app } from '../../app'

vi.mock('../../services/og-generator/OGImageService', () => ({
  OGImageService: {
    generateShopImageBuffer: vi.fn().mockResolvedValue(Buffer.from('fake-image-data'))
  }
}))

describe('API Endpoints', () => {

  describe('POST /og/shop', () => {
    it('should generate image with valid input', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: 'Test Shop',
          offerImagesUrls: ['https://example.com/image.jpg'],
          poweredBy: true
        })
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
      
      const buffer = await response.arrayBuffer()
      expect(buffer.byteLength).toBeGreaterThan(0)
    })

    it('should return 400 for missing shopName', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          offerImagesUrls: ['https://example.com/image.jpg']
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for empty shopName', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: '',
          offerImagesUrls: ['https://example.com/image.jpg']
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for empty offerImagesUrls', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: 'Test Shop',
          offerImagesUrls: []
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for invalid URLs', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: 'Test Shop',
          offerImagesUrls: ['not-a-url']
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for invalid JSON', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: 'invalid json'
      })

      expect(response.status).toBe(400)
    })

    it('should handle optional fields correctly', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: 'Test Shop',
          offerImagesUrls: ['https://example.com/image.jpg'],
          stylesUrl: 'https://example.com/styles.css',
          logoUrl: 'https://example.com/logo.png',
          poweredBy: false
        })
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
      
      const json = await response.json() as any
      expect(json.openapi).toBe('3.0.0')
      expect(json.info.title).toBe('OG Image Generator API')
      expect(json.paths['/og/shop']).toBeDefined()
    })

    it('should include proper schema definitions', async () => {
      const response = await app.request('/doc')
      const json = await response.json() as any
      
      expect(json.components.schemas).toBeDefined()
      expect(json.components.schemas['OGImageShopRequest']).toBeDefined()
      expect(json.components.schemas['ErrorResponse']).toBeDefined()
    })
  })
})
