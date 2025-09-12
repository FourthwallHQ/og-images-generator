import { describe, it, expect, beforeAll, vi } from 'vitest'
import { app } from '../../app'

vi.mock('../../services/og-generator/OGImageService', () => ({
  OGImageService: {
    generateShopImageBuffer: vi.fn().mockResolvedValue(Buffer.from('fake-image-data'))
  }
}))

describe('API Endpoints', () => {

  describe('POST /og/shop - Strategy Tests', () => {
    it('should generate COMING_SOON image', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'COMING_SOON',
          shopName: 'Test Shop',
          siteUrl: 'testshop.com',
          logoUrl: 'https://example.com/logo.png'
        })
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should generate COMING_SOON_WITH_DATE image', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'COMING_SOON_WITH_DATE',
          shopName: 'Test Shop',
          siteUrl: 'testshop.com',
          launchDate: '2024-12-25T00:00:00Z',
          logoUrl: 'https://example.com/logo.png'
        })
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should generate EMPTY_SHOP image', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'EMPTY_SHOP',
          shopName: 'Test Shop',
          siteUrl: 'testshop.com',
          logoUrl: 'https://example.com/logo.png'
        })
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should generate LIVE_WITH_PRODUCTS image', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LIVE_WITH_PRODUCTS',
          shopName: 'Test Shop',
          offerImagesUrls: ['https://example.com/product.jpg'],
          logoUrl: 'https://example.com/logo.png'
        })
      })

      expect(response.status).toBe(200)
      expect(response.headers.get('content-type')).toBe('image/png')
    })

    it('should return 400 for missing strategy', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          shopName: 'Test Shop'
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for invalid strategy', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'invalid_strategy',
          shopName: 'Test Shop'
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for LIVE_WITH_PRODUCTS strategy without products', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'LIVE_WITH_PRODUCTS',
          shopName: 'Test Shop'
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for COMING_SOON_WITH_DATE without launch date', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'COMING_SOON_WITH_DATE',
          shopName: 'Test Shop'
        })
      })

      expect(response.status).toBe(400)
      const json = await response.json() as any
      expect(json.error).toBeDefined()
    })

    it('should return 400 for missing shopName', async () => {
      const response = await app.request('/og/shop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          strategy: 'COMING_SOON'
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
          strategy: 'COMING_SOON',
          shopName: ''
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
          strategy: 'LIVE_WITH_PRODUCTS',
          shopName: 'Test Shop',
          offerImagesUrls: ['https://example.com/image.jpg'],
          stylesUrl: 'https://example.com/styles.css',
          logoUrl: 'https://example.com/logo.png',
          siteUrl: 'testshop.com',
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
