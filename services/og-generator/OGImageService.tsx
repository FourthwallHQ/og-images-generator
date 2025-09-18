import React from 'react'
import { ImageResponse } from '@vercel/og'
import { OGImageShopRequest } from './schemas.js'
import { parseShopStyles } from './styles-parser.js'
import { loadFontsForImageResponse } from './font-loader.js'
import { LogoCenteredComponent } from './components/LogoCenteredComponent.js'

export class OGImageService {
  static async checkLogoAvailability(logoUrl: string | undefined): Promise<boolean> {
    if (!logoUrl) return false

    try {
      const response = await fetch(logoUrl, { method: 'HEAD' })
      return response.ok && response.status !== 404
    } catch {
      return false
    }
  }

  static async generateShopImageBuffer(params: OGImageShopRequest): Promise<Buffer> {
    const finalParams = {
      ...params,
      poweredBy: params.poweredBy !== undefined ? params.poweredBy : true,
    }

    const imageResponse = await this.generateLogoCenteredImage(finalParams)
    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  static async generateLogoCenteredImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily, cssText } = await parseShopStyles(
      params.stylesUrl,
    )

    const isLogoAvailable = await this.checkLogoAvailability(params.logoUrl)

    const fonts = await loadFontsForImageResponse(cssText, params.shopName)

    return new ImageResponse(
      (
        <LogoCenteredComponent
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          shopName={params.shopName}
          poweredBy={params.poweredBy}
          logoUrl={params.logoUrl}
          isLogoAvailable={isLogoAvailable}
        />
      ),
      {
        width: 1200,
        height: 630,
        fonts,
      },
    )
  }
}
