async function loadGoogleFont(font: string, weight: number, text: string): Promise<ArrayBuffer> {
  // Format font name for Google Fonts (handle spaces)
  const formattedFont = font.replace(' ', '+')
  // Don't use text parameter to load the complete font file with all characters
  const url = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@${weight}`

  const css = await (await fetch(url)).text()

  // Try different patterns for font URL extraction
  const patterns = [
    /src: url\((.+?\.woff2)\)/, // Prefer woff2
    /src: url\((.+?\.ttf)\)/, // Then ttf
    /src: url\((.+)\) format\('(opentype|truetype)'\)/, // Fallback
  ]

  let fontUrl: string | null = null
  for (const pattern of patterns) {
    const match = css.match(pattern)
    if (match && match[1]) {
      fontUrl = match[1]
      break
    }
  }

  if (fontUrl) {
    const response = await fetch(fontUrl)
    if (response.status == 200) {
      const arrayBuffer = await response.arrayBuffer()
      return arrayBuffer
    }
  }

  console.error('❌ Failed to load font data for:', font, 'weight:', weight)
  throw new Error(`failed to load font data for ${font} weight ${weight}`)
}

// Match the FontOptions type from @vercel/og
interface FontConfig {
  name: string
  data: ArrayBuffer
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  style?: 'normal' | 'italic'
}

export async function loadFontsForImageResponse(
  cssText: string,
  text: string,
): Promise<FontConfig[]> {
  // Parse font family from CSS
  const fontFamilyMatch = cssText.match(/--font-family-base:\s*["']?([^,;"']+)["']?/)

  const fontFamily = fontFamilyMatch ? fontFamilyMatch[1].replace(/["']/g, '') : 'Inter'

  // Parse font weights from CSS
  const baseWeight = parseInt(cssText.match(/--font-weight-base:\s*(\d+)/)?.[1] || '400')
  const boldWeight = parseInt(cssText.match(/--font-weight-base-bold:\s*(\d+)/)?.[1] || '700')

  // Only load the weights that are actually used in components (400 and 700)
  const weights = [...new Set([baseWeight, boldWeight, 400, 700])]
  const fonts: FontConfig[] = []

  for (const weight of weights) {
    try {
      const fontData = await loadGoogleFont(fontFamily, weight, text)
      fonts.push({
        name: fontFamily,
        data: fontData,
        weight: weight as 400 | 700,
        style: 'normal',
      })
    } catch (error) {
      console.error(`⚠️ Failed to load ${fontFamily} weight ${weight}:`, error)
    }
  }

  return fonts
}
