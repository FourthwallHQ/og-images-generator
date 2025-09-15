import { describe, it, expect, vi, beforeEach } from 'vitest'
import { loadFontsForImageResponse } from '../../services/og-generator/font-loader'

describe('Font Loader', () => {
  beforeEach(() => {
    vi.resetAllMocks()
    // Mock console methods to avoid noise in tests
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  describe('loadFontsForImageResponse', () => {
    it('should parse font family from CSS and load fonts', async () => {
      const mockCss = `
        :root {
          --font-family-base: "Nunito Sans";
          --font-weight-base: 400;
          --font-weight-base-bold: 700;
        }
      `

      // Mock Google Fonts API responses
      global.fetch = vi.fn()
        .mockImplementation((url: string) => {
          if (url.includes('fonts.googleapis.com')) {
            return Promise.resolve({
              ok: true,
              text: async () => `
                @font-face {
                  font-family: 'Nunito Sans';
                  src: url(https://fonts.gstatic.com/font.woff2);
                }
              `,
            })
          }
          if (url.includes('fonts.gstatic.com')) {
            return Promise.resolve({
              ok: true,
              status: 200,
              arrayBuffer: async () => new ArrayBuffer(1000),
            })
          }
          return Promise.reject(new Error('Unknown URL'))
        })

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts).toHaveLength(2) // Should load 400 and 700 weights
      expect(fonts[0]).toMatchObject({
        name: 'Nunito Sans',
        weight: 400,
        style: 'normal',
      })
      expect(fonts[1]).toMatchObject({
        name: 'Nunito Sans',
        weight: 700,
        style: 'normal',
      })
    })

    it('should use Roboto as fallback font when no font family is found in CSS', async () => {
      const mockCss = `:root { --color-primary: #000; }`

      global.fetch = vi.fn()
        .mockImplementation((url: string) => {
          if (url.includes('fonts.googleapis.com') && url.includes('Roboto')) {
            return Promise.resolve({
              ok: true,
              text: async () => `
                @font-face {
                  font-family: 'Roboto';
                  src: url(https://fonts.gstatic.com/font.woff2);
                }
              `,
            })
          }
          if (url.includes('fonts.gstatic.com')) {
            return Promise.resolve({
              ok: true,
              status: 200,
              arrayBuffer: async () => new ArrayBuffer(1000),
            })
          }
          return Promise.reject(new Error('Unknown URL'))
        })

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts.length).toBeGreaterThan(0)
      expect(fonts[0].name).toBe('Roboto')
    })

    it('should handle font loading errors gracefully', async () => {
      const mockCss = `
        :root {
          --font-family-base: "NonExistentFont";
        }
      `

      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts).toEqual([]) // Should return empty array on error
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle spaces in font names', async () => {
      const mockCss = `
        :root {
          --font-family-base: "Open Sans";
        }
      `

      global.fetch = vi.fn()
        .mockImplementation((url: string) => {
          if (url.includes('fonts.googleapis.com')) {
            expect(url).toContain('Open+Sans') // Should replace spaces with +
            return Promise.resolve({
              ok: true,
              text: async () => `
                @font-face {
                  font-family: 'Open Sans';
                  src: url(https://fonts.gstatic.com/font.woff2);
                }
              `,
            })
          }
          if (url.includes('fonts.gstatic.com')) {
            return Promise.resolve({
              ok: true,
              status: 200,
              arrayBuffer: async () => new ArrayBuffer(1000),
            })
          }
          return Promise.reject(new Error('Unknown URL'))
        })

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts.length).toBeGreaterThan(0)
      expect(fonts[0].name).toBe('Open Sans')
    })

    it('should load unique font weights only', async () => {
      const mockCss = `
        :root {
          --font-family-base: "Roboto";
          --font-weight-base: 400;
          --font-weight-base-bold: 400; /* Same as base */
        }
      `

      let fontRequestCount = 0
      global.fetch = vi.fn()
        .mockImplementation((url: string) => {
          if (url.includes('fonts.googleapis.com')) {
            fontRequestCount++
            return Promise.resolve({
              ok: true,
              text: async () => `
                @font-face {
                  font-family: 'Roboto';
                  src: url(https://fonts.gstatic.com/font.woff2);
                }
              `,
            })
          }
          if (url.includes('fonts.gstatic.com')) {
            return Promise.resolve({
              ok: true,
              status: 200,
              arrayBuffer: async () => new ArrayBuffer(1000),
            })
          }
          return Promise.reject(new Error('Unknown URL'))
        })

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      // Should only load weight 400 and 700 (default bold), not duplicate 400
      expect(fonts).toHaveLength(2)
      expect(fonts.map(f => f.weight)).toEqual([400, 700])
    })

    it('should return empty array when all font loading fails', async () => {
      const mockCss = `
        :root {
          --font-family-base: "CustomFont";
        }
      `

      // Mock all font loads to fail
      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts).toEqual([])
      expect(console.error).toHaveBeenCalled()
    })

    it('should handle missing woff2 format gracefully', async () => {
      const mockCss = `
        :root {
          --font-family-base: "CustomFont";
        }
      `

      global.fetch = vi.fn()
        .mockImplementation((url: string) => {
          if (url.includes('fonts.googleapis.com')) {
            return Promise.resolve({
              ok: true,
              text: async () => `
                @font-face {
                  font-family: 'CustomFont';
                  src: url(https://fonts.gstatic.com/font.ttf) format('truetype');
                }
              `,
            })
          }
          if (url.includes('fonts.gstatic.com')) {
            return Promise.resolve({
              ok: true,
              status: 200,
              arrayBuffer: async () => new ArrayBuffer(1000),
            })
          }
          return Promise.reject(new Error('Unknown URL'))
        })

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts.length).toBeGreaterThan(0) // Should still load ttf format
    })
  })
})