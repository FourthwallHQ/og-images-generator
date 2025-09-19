import { describe, it, expect, vi, beforeEach } from 'vitest'
import { parseShopStyles } from '../../services/og-generator/utils/styles-parser'

describe('parseShopStyles', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should parse CSS variables correctly', async () => {
    const cssText = `
        :root {
          --color-background: #f0f0f0;
          --color-on-background: #333333;
          --color-primary: #667eea;
          --font-family-base: "Inter", sans-serif;
        }
      `
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => cssText,
    })

    const result = await parseShopStyles('https://example.com/styles.css')

    expect(result).toEqual({
      backgroundColor: '#f0f0f0',
      primaryColor: '#333333', // Should pick --color-on-background first
      fontFamily: 'Inter, sans-serif',
      cssText,
    })
  })

  it('should handle alternative CSS variable names', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `
        :root {
          --background-color: #222222;
          --primary-color: #ff6600;
          --font-family-heading: "Roboto", sans-serif;
        }
      `,
    })

    const result = await parseShopStyles('https://example.com/styles.css')

    expect(result.backgroundColor).toBe('#222222')
    expect(result.primaryColor).toBe('#ff6600')
    expect(result.fontFamily).toBe('Roboto, sans-serif')
    expect(result.cssText).toBeDefined()
  })

  it('should remove quotes from font family', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => `
        :root {
          --font-family-base: "'Helvetica Neue'", 'Arial', sans-serif;
        }
      `,
    })

    const result = await parseShopStyles('https://example.com/styles.css')

    expect(result.fontFamily).toBe('Helvetica Neue, Arial, sans-serif')
    expect(result.cssText).toBeDefined()
  })

  it('should return defaults when fetch fails', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

    const result = await parseShopStyles('https://example.com/styles.css')

    expect(result).toEqual({
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      cssText: '',
    })
  })

  it('should return defaults when response is not ok', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 404,
    })

    const result = await parseShopStyles('https://example.com/styles.css')

    expect(result).toEqual({
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      cssText: '',
    })
  })

  it('should handle empty CSS content', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      text: async () => '',
    })

    const result = await parseShopStyles('https://example.com/styles.css')

    expect(result).toEqual({
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      cssText: '',
    })
  })

  it('should handle empty styles URL', async () => {
    const result = await parseShopStyles('')

    expect(result).toEqual({
      primaryColor: '#000000',
      backgroundColor: '#ffffff',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      cssText: '',
    })
  })
})
