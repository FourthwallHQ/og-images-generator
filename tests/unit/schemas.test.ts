import { describe, it, expect } from 'vitest'
import { OGImageShopRequestSchema, ErrorResponseSchema } from '../../services/og-generator/schemas'

describe('OGImageShopRequestSchema', () => {
  describe('valid inputs', () => {
    it('should accept minimal valid input', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: ['https://example.com/image.jpg']
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.shopName).toBe('Test Shop')
        expect(result.data.offerImagesUrls).toHaveLength(1)
        expect(result.data.poweredBy).toBe(false) // default value
        expect(result.data.stylesUrl).toBe('') // default value
        expect(result.data.logoUrl).toBe('') // default value
      }
    })

    it('should accept full valid input', () => {
      const input = {
        shopName: 'My Awesome Shop',
        offerImagesUrls: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg',
          'https://example.com/image3.jpg'
        ],
        stylesUrl: 'https://example.com/styles.css',
        logoUrl: 'https://example.com/logo.png',
        poweredBy: true
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.shopName).toBe('My Awesome Shop')
        expect(result.data.offerImagesUrls).toHaveLength(3)
        expect(result.data.poweredBy).toBe(true)
        expect(result.data.stylesUrl).toBe('https://example.com/styles.css')
        expect(result.data.logoUrl).toBe('https://example.com/logo.png')
      }
    })

    it('should accept empty strings for optional URL fields', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: ['https://example.com/image.jpg'],
        stylesUrl: '',
        logoUrl: ''
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(true)
    })
  })

  describe('invalid inputs', () => {
    it('should reject missing shopName', () => {
      const input = {
        offerImagesUrls: ['https://example.com/image.jpg']
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
      if (!result.success) {
        const shopNameError = result.error.issues.find(issue => issue.path.includes('shopName'))
        expect(shopNameError).toBeDefined()
      }
    })

    it('should reject empty shopName', () => {
      const input = {
        shopName: '',
        offerImagesUrls: ['https://example.com/image.jpg']
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject missing offerImagesUrls', () => {
      const input = {
        shopName: 'Test Shop'
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject empty offerImagesUrls array', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: []
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.issues[0]
        expect(error.message).toContain('Too small')
      }
    })

    it('should reject invalid URLs in offerImagesUrls', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: ['not-a-url', 'also-not-a-url']
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject invalid stylesUrl', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: ['https://example.com/image.jpg'],
        stylesUrl: 'not-a-url'
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject invalid logoUrl', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: ['https://example.com/image.jpg'],
        logoUrl: 'not-a-url'
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject non-boolean poweredBy', () => {
      const input = {
        shopName: 'Test Shop',
        offerImagesUrls: ['https://example.com/image.jpg'],
        poweredBy: 'yes' // should be boolean
      }
      
      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })
  })
})

describe('ErrorResponseSchema', () => {
  it('should validate error response with issues', () => {
    const input = {
      error: 'Validation failed',
      issues: [
        { path: 'shopName', message: 'Required' },
        { path: 'offerImagesUrls', message: 'At least one URL required' }
      ]
    }
    
    const result = ErrorResponseSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('should validate error response without issues', () => {
    const input = {
      error: 'Internal server error'
    }
    
    const result = ErrorResponseSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('should reject missing error field', () => {
    const input = {
      issues: [{ path: 'test', message: 'test' }]
    }
    
    const result = ErrorResponseSchema.safeParse(input)
    expect(result.success).toBe(false)
  })
})