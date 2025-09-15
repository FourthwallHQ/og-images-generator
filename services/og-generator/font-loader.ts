async function loadGoogleFont(font: string, weight: number, text: string): Promise<ArrayBuffer> {
  // Format font name for Google Fonts (handle spaces)
  const formattedFont = font.replace(' ', '+')
  // Don't use text parameter to load the complete font file with all characters
  const url = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@${weight}`
  console.log('🔤 Loading Google Font:', { font, weight, url })

  const css = await (await fetch(url)).text()
  console.log('📝 Google Fonts CSS response:', css.substring(0, 500)) // Log first 500 chars

  // Try different patterns for font URL extraction
  const patterns = [
    /src: url\((.+?\.woff2)\)/,  // Prefer woff2
    /src: url\((.+?\.ttf)\)/,     // Then ttf
    /src: url\((.+)\) format\('(opentype|truetype)'\)/  // Fallback
  ]

  let fontUrl: string | null = null
  for (const pattern of patterns) {
    const match = css.match(pattern)
    if (match && match[1]) {
      fontUrl = match[1]
      break
    }
  }

  console.log('🔍 Font resource URL:', fontUrl || 'NO MATCH FOUND')

  if (fontUrl) {
    const response = await fetch(fontUrl)
    console.log('📥 Font file fetch status:', response.status)
    if (response.status == 200) {
      const arrayBuffer = await response.arrayBuffer()
      console.log('✅ Font loaded successfully:', { font, weight, size: arrayBuffer.byteLength })
      return arrayBuffer
    }
  }

  console.error('❌ Failed to load font data for:', font, 'weight:', weight)
  throw new Error(`failed to load font data for ${font} weight ${weight}`)
}

interface FontConfig {
  name: string
  data: ArrayBuffer
  weight: number
  style: 'normal' | 'italic'
}

export async function loadFontsForImageResponse(cssText: string, text: string): Promise<FontConfig[]> {
  console.log('🎨 Starting font loading for ImageResponse')
  console.log('📄 CSS Text length:', cssText.length)
  console.log('💬 Text to render:', text)

  // Parse font family from CSS
  const fontFamilyMatch = cssText.match(/--font-family-base:\s*["']?([^,;"']+)["']?/)
  console.log('🔎 Font family match:', fontFamilyMatch ? fontFamilyMatch[0] : 'NO MATCH')

  const fontFamily = fontFamilyMatch ? fontFamilyMatch[1].replace(/["']/g, '') : 'Inter'
  console.log('🔤 Selected font family:', fontFamily)

  // Parse font weights from CSS
  const baseWeight = parseInt(cssText.match(/--font-weight-base:\s*(\d+)/)?.[1] || '400')
  const boldWeight = parseInt(cssText.match(/--font-weight-base-bold:\s*(\d+)/)?.[1] || '700')

  console.log('⚖️ Font weights found in CSS:', { baseWeight, boldWeight })

  // Only load the weights that are actually used in components (400 and 700)
  const weights = [...new Set([baseWeight, boldWeight, 400, 700])]
  const fonts: FontConfig[] = []

  for (const weight of weights) {
    try {
      console.log(`🔄 Loading ${fontFamily} weight ${weight}...`)
      const fontData = await loadGoogleFont(fontFamily, weight, text)
      fonts.push({
        name: fontFamily,
        data: fontData,
        weight: weight,
        style: 'normal' as const,
      })
      console.log(`✅ Loaded ${fontFamily} weight ${weight}`)
    } catch (error) {
      console.error(`⚠️ Failed to load ${fontFamily} weight ${weight}:`, error)
    }
  }

  console.log('📦 Total fonts loaded:', fonts.length, 'weights:', fonts.map(f => f.weight))

  if (fonts.length === 0) {
    console.log('⚠️ No fonts loaded, returning empty array')
  }

  return fonts
}