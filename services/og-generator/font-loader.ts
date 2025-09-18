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
  const fontFamily = fontFamilyMatch ? fontFamilyMatch[1].replace(/["']/g, '') : null

  // Parse font weights from CSS
  const baseWeight = parseInt(cssText.match(/--font-weight-base:\s*(\d+)/)?.[1] || '400')
  const boldWeight = parseInt(cssText.match(/--font-weight-base-bold:\s*(\d+)/)?.[1] || '700')

  // Only load the weights that are actually used in components
  const weights = [...new Set([baseWeight, boldWeight, 400, 700])]
  const fonts: FontConfig[] = []

  // STEP 1: Always load Suisse Int'l Regular (400) for "Powered by" text
  try {
    const fs = await import('fs/promises')
    const path = await import('path')
    const suisseIntlPath = path.join(process.cwd(), 'services/og-generator/fonts/suisseIntl/SuisseIntl-Regular.otf')
    const suisseIntlBuffer = await fs.readFile(suisseIntlPath)
    const arrayBuffer = new ArrayBuffer(suisseIntlBuffer.length)
    const view = new Uint8Array(arrayBuffer)
    for (let i = 0; i < suisseIntlBuffer.length; i++) {
      view[i] = suisseIntlBuffer[i]
    }
    fonts.push({
      name: "Suisse Int'l",
      data: arrayBuffer,
      weight: 400,
      style: 'normal',
    })
  } catch (error) {
    console.error("⚠️ Failed to load Suisse Int'l font for Powered by text:", error)
  }

  // STEP 2: Try to load font from CSS
  if (fontFamily === 'Suisse Intl' || fontFamily === "Suisse Int'l") {
    // Handle Suisse Intl font locally
    try {
      const fs = await import('fs/promises')
      const path = await import('path')

      const weightToFile: Record<number, string> = {
        100: 'SuisseIntl-Thin.otf',
        200: 'SuisseIntl-UltraLight.otf',
        300: 'SuisseIntl-Light.otf',
        400: 'SuisseIntl-Regular.otf',
        500: 'SuisseIntl-Medium.otf',
        600: 'SuisseIntl-SemiBold.otf',
        700: 'SuisseIntl-Bold.otf',
        800: 'SuisseIntl-Bold.otf',
        900: 'SuisseIntl-Black.otf',
      }

      for (const weight of weights) {
        if (weight === 400) continue // Already loaded for Powered by

        const fileName = weightToFile[weight] || 'SuisseIntl-Regular.otf'
        const fontPath = path.join(process.cwd(), 'services/og-generator/fonts/suisseIntl', fileName)

        try {
          const fontBuffer = await fs.readFile(fontPath)
          const arrayBuffer = new ArrayBuffer(fontBuffer.length)
          const view = new Uint8Array(arrayBuffer)
          for (let i = 0; i < fontBuffer.length; i++) {
            view[i] = fontBuffer[i]
          }
          fonts.push({
            name: 'Suisse Intl',
            data: arrayBuffer,
            weight: weight as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
            style: 'normal',
          })
        } catch (error) {
          console.error(`⚠️ Failed to load Suisse Intl weight ${weight}:`, error)
        }
      }
    } catch (error) {
      console.error('⚠️ Failed to load Suisse Intl fonts:', error)
    }
  } else if (fontFamily) {
    // Try to load from Google Fonts
    let googleFontsLoaded = false
    for (const weight of weights) {
      try {
        const fontData = await loadGoogleFont(fontFamily, weight, text)
        fonts.push({
          name: fontFamily,
          data: fontData,
          weight: weight as 400 | 700,
          style: 'normal',
        })
        googleFontsLoaded = true
      } catch (error) {
        console.error(`⚠️ Failed to load ${fontFamily} weight ${weight}:`, error)
      }
    }

    // If Google Fonts failed, use PPTelegraf-Semibold as fallback
    if (!googleFontsLoaded) {
      console.log('📦 Google Fonts failed, using PPTelegraf-Semibold as fallback...')
      try {
        const fs = await import('fs/promises')
        const path = await import('path')

        // Load PPTelegraf-Semibold for text display
        const ppTelegrafPath = path.join(process.cwd(), 'services/og-generator/fonts/ppTelegraf/PPTelegraf-Semibold.otf')
        const ppTelegrafBuffer = await fs.readFile(ppTelegrafPath)
        const arrayBuffer = new ArrayBuffer(ppTelegrafBuffer.length)
        const view = new Uint8Array(arrayBuffer)
        for (let i = 0; i < ppTelegrafBuffer.length; i++) {
          view[i] = ppTelegrafBuffer[i]
        }

        // Add PPTelegraf-Semibold for all requested weights
        for (const weight of weights) {
          fonts.push({
            name: 'PPTelegraf',
            data: arrayBuffer,
            weight: weight as 400 | 700,
            style: 'normal',
          })
        }
      } catch (error) {
        console.error('⚠️ Failed to load PPTelegraf-Semibold fallback:', error)
      }
    }
  } else {
    // No font family specified - use PPTelegraf-Semibold as default
    console.log('📦 No font family in CSS, using PPTelegraf-Semibold as default...')
    try {
      const fs = await import('fs/promises')
      const path = await import('path')

      const ppTelegrafPath = path.join(process.cwd(), 'services/og-generator/fonts/ppTelegraf/PPTelegraf-Semibold.otf')
      const ppTelegrafBuffer = await fs.readFile(ppTelegrafPath)
      const arrayBuffer = new ArrayBuffer(ppTelegrafBuffer.length)
      const view = new Uint8Array(arrayBuffer)
      for (let i = 0; i < ppTelegrafBuffer.length; i++) {
        view[i] = ppTelegrafBuffer[i]
      }

      // Add PPTelegraf for standard weights
      fonts.push({
        name: 'PPTelegraf',
        data: arrayBuffer,
        weight: 400,
        style: 'normal',
      })
      fonts.push({
        name: 'PPTelegraf',
        data: arrayBuffer,
        weight: 700,
        style: 'normal',
      })
    } catch (error) {
      console.error('⚠️ Failed to load PPTelegraf-Semibold default:', error)
    }
  }

  if (fonts.length === 0) {
    console.log('⚠️ Could not load any fonts, will use system fonts: Helvetica, Arial, sans-serif')
  }

  return fonts
}
