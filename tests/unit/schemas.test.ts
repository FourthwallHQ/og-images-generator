import { describe, it, expect } from 'vitest'
import { OGImageShopRequestSchema, ErrorResponseSchema } from '../../services/og-generator/schemas'

describe('OGImageShopRequestSchema', () => {
  describe('valid inputs', () => {
    it('should accept minimal valid input for LOGO_CENTERED strategy', () => {
      const input = {
        shopId: 'sh_test',
        strategy: 'LOGO_CENTERED',
        shopName: 'Test Shop',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.shopName).toBe('Test Shop')
        expect(result.data.stylesUrl).toBe('') // default value
        expect(result.data.logoUrl).toBe('') // default value
      }
    })

    it('should accept full valid input', () => {
      const input = {
        shopId: 'sh_awesome',
        strategy: 'LOGO_CENTERED',
        shopName: 'My Awesome Shop',
        stylesUrl: 'https://example.com/styles.css',
        logoUrl: 'https://example.com/logo.png',
        poweredBy: true,
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.shopName).toBe('My Awesome Shop')
        expect(result.data.poweredBy).toBe(true)
        expect(result.data.stylesUrl).toBe('https://example.com/styles.css')
        expect(result.data.logoUrl).toBe('https://example.com/logo.png')
      }
    })

    it('should accept LOGO_CENTERED strategy with empty URLs', () => {
      const input = {
        shopId: 'sh_coming_soon',
        strategy: 'LOGO_CENTERED',
        shopName: 'Test Shop',
        stylesUrl: '',
        logoUrl: '',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(true)
    })

  })

  describe('invalid inputs', () => {
    it('should reject missing shopId', () => {
      const input = {
        strategy: 'LOGO_CENTERED',
        shopName: 'Test Shop',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
      if (!result.success) {
        const shopIdError = result.error.issues.find((issue) => issue.path.includes('shopId'))
        expect(shopIdError).toBeDefined()
      }
    })

    it('should reject missing shopName', () => {
      const input = {
        strategy: 'LOGO_CENTERED',
        shopId: 'sh_test',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
      if (!result.success) {
        const shopNameError = result.error.issues.find((issue) => issue.path.includes('shopName'))
        expect(shopNameError).toBeDefined()
      }
    })

    it('should reject empty shopName', () => {
      const input = {
        strategy: 'LOGO_CENTERED',
        shopId: 'sh_test',
        shopName: '',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject missing strategy', () => {
      const input = {
        shopId: 'sh_test',
        shopName: 'Test Shop',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })


    it('should reject invalid strategy', () => {
      const input = {
        strategy: 'INVALID_STRATEGY',
        shopId: 'sh_test',
        shopName: 'Test Shop',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
      if (!result.success) {
        const error = result.error.issues[0]
        expect(error.message).toContain('Invalid input')
      }
    })


    it('should reject invalid stylesUrl', () => {
      const input = {
        shopId: 'sh_test',
        strategy: 'LOGO_CENTERED',
        shopName: 'Test Shop',
        stylesUrl: 'not-a-url',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject invalid logoUrl', () => {
      const input = {
        strategy: 'LOGO_CENTERED',
        shopId: 'sh_test',
        shopName: 'Test Shop',
        logoUrl: 'not-a-url',
      }

      const result = OGImageShopRequestSchema.safeParse(input)
      expect(result.success).toBe(false)
    })

    it('should reject non-boolean poweredBy', () => {
      const input = {
        shopId: 'sh_test',
        strategy: 'LOGO_CENTERED',
        shopName: 'Test Shop',
        poweredBy: 'yes', // should be boolean
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
        { path: 'logoUrl', message: 'Invalid URL format' },
      ],
    }

    const result = ErrorResponseSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('should validate error response without issues', () => {
    const input = {
      error: 'Internal server error',
    }

    const result = ErrorResponseSchema.safeParse(input)
    expect(result.success).toBe(true)
  })

  it('should reject missing error field', () => {
    const input = {
      issues: [{ path: 'test', message: 'test' }],
    }

    const result = ErrorResponseSchema.safeParse(input)
    expect(result.success).toBe(false)
  })
})