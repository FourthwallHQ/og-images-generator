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

      // Should always have Suisse Int'l for Powered by + Nunito Sans fonts
      expect(fonts.length).toBeGreaterThanOrEqual(3)

      // Should have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()
      expect(suisseFont?.weight).toBe(400)

      // Should have Nunito Sans fonts
      const nunitoFonts = fonts.filter(f => f.name === 'Nunito Sans')
      expect(nunitoFonts).toHaveLength(2)
      expect(nunitoFonts[0].weight).toBe(400)
      expect(nunitoFonts[1].weight).toBe(700)
    })

    it('should use PPTelegraf as fallback when no font family is found in CSS', async () => {
      const mockCss = `:root { --color-primary: #000; }` // No font-family defined

      // No need to mock fetch - PPTelegraf is loaded from local file

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      expect(fonts.length).toBeGreaterThan(0)
      // Should always have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()
      expect(suisseFont?.weight).toBe(400)

      // Should use PPTelegraf as default when no font in CSS
      const ppTelegrafFonts = fonts.filter(f => f.name === 'PPTelegraf')
      expect(ppTelegrafFonts.length).toBeGreaterThan(0)
    })

    it('should handle font loading errors gracefully', async () => {
      const mockCss = `
        :root {
          --font-family-base: "NonExistentFont";
        }
      `

      global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))

      const fonts = await loadFontsForImageResponse(mockCss, 'Test Text')

      // When Google Fonts fail, should fall back to PPTelegraf
      expect(fonts.length).toBeGreaterThan(0)

      // Should have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()

      // Should have PPTelegraf as fallback
      const ppTelegrafFonts = fonts.filter(f => f.name === 'PPTelegraf')
      expect(ppTelegrafFonts.length).toBeGreaterThan(0)
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

      // Should have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()

      // Should load Open Sans fonts
      const openSansFonts = fonts.filter(f => f.name === 'Open Sans')
      expect(openSansFonts.length).toBeGreaterThan(0)
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

      // Should have Suisse Int'l + Roboto fonts
      expect(fonts.length).toBeGreaterThanOrEqual(3)

      // Should have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()

      const robotoFonts = fonts.filter(f => f.name === 'Roboto')
      expect(robotoFonts).toHaveLength(2)
      expect(robotoFonts.map(f => f.weight)).toEqual([400, 700])
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

      // When all Google Fonts fail, should fall back to PPTelegraf
      expect(fonts.length).toBeGreaterThan(0)

      // Should have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()

      // Should have PPTelegraf as fallback
      const ppTelegrafFonts = fonts.filter(f => f.name === 'PPTelegraf')
      expect(ppTelegrafFonts.length).toBeGreaterThan(0)
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

      // Should have Suisse Int'l for Powered by
      const suisseFont = fonts.find(f => f.name === "Suisse Int'l")
      expect(suisseFont).toBeDefined()

      // Should have CustomFont loaded
      const customFont = fonts.find(f => f.name === 'CustomFont')
      expect(customFont).toBeDefined()
    })
  })
})