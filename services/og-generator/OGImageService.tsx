import React from 'react'
import { ImageResponse } from '@vercel/og'
import { OGImageShopRequest } from './schemas.js'
import { parseShopStyles } from './styles-parser.js'
import { loadFontsForImageResponse } from './font-loader.js'
import { ComingSoonComponent } from './components/ComingSoonComponent.js'
import { ComingSoonWithDateComponent } from './components/ComingSoonWithDateComponent.js'
import { EmptyShopComponent } from './components/EmptyShopComponent.js'
import { LiveWithProductsComponent } from './components/LiveWithProductsComponent.js'
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
      poweredBy:
        params.poweredBy !== undefined ? params.poweredBy : params.strategy !== 'EMPTY_SHOP',
    }

    let imageResponse: ImageResponse

    switch (params.strategy) {
      case 'COMING_SOON':
        imageResponse = await this.generateComingSoonImage(finalParams)
        break
      case 'COMING_SOON_WITH_DATE':
        imageResponse = await this.generateComingSoonWithDateImage(finalParams)
        break
      case 'EMPTY_SHOP':
        imageResponse = await this.generateEmptyShopImage(finalParams)
        break
      case 'LIVE_WITH_PRODUCTS':
        imageResponse = await this.generateLiveWithProductsImage(finalParams)
        break
      case 'LOGO_CENTERED':
        imageResponse = await this.generateLogoCenteredImage(finalParams)
        break
      default:
        throw new Error(`Unknown strategy: ${params.strategy}`)
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  static async generateComingSoonImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily, cssText } = await parseShopStyles(
      params.stylesUrl,
    )
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)
    const isLogoAvailable = await this.checkLogoAvailability(params.logoUrl)

    // Load fonts for the image
    const fonts = await loadFontsForImageResponse(cssText, params.shopName)

    return new ImageResponse(
      (
        <ComingSoonComponent
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          shopName={params.shopName}
          siteUrl={cleanedSiteUrl}
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

  static cleanSiteUrl(siteUrl: string | undefined): string | undefined {
    if (!siteUrl) return undefined
    return siteUrl.replace(/^https?:\/\//, '')
  }

  static formatLaunchDate(dateStr: string): string {
    try {
      const date = new Date(dateStr)
      const month = date.toLocaleDateString('en-US', { month: 'short' })
      const day = date.getDate()

      // Add ordinal suffix (st, nd, rd, th)
      const getOrdinalSuffix = (day: number): string => {
        if (day > 3 && day < 21) return 'th'
        switch (day % 10) {
          case 1:
            return 'st'
          case 2:
            return 'nd'
          case 3:
            return 'rd'
          default:
            return 'th'
        }
      }

      return `Launching ${month} ${day}${getOrdinalSuffix(day)}`
    } catch {
      // If date parsing fails, return the original string with "Launching" prefix
      return `Launching ${dateStr}`
    }
  }

  static async generateComingSoonWithDateImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily, cssText } = await parseShopStyles(
      params.stylesUrl,
    )

    if (!params.launchDate) {
      throw new Error('Launch date is required for COMING_SOON_WITH_DATE strategy')
    }

    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)
    const formattedDate = this.formatLaunchDate(params.launchDate)
    const isLogoAvailable = await this.checkLogoAvailability(params.logoUrl)

    // Load fonts with the text that will be displayed
    const textContent = `${params.shopName} ${formattedDate}`
    const fonts = await loadFontsForImageResponse(cssText, textContent)

    return new ImageResponse(
      (
        <ComingSoonWithDateComponent
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          shopName={params.shopName}
          siteUrl={cleanedSiteUrl}
          poweredBy={params.poweredBy}
          logoUrl={params.logoUrl}
          launchDate={formattedDate}
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

  static async generateEmptyShopImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily, cssText } = await parseShopStyles(
      params.stylesUrl,
    )
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)
    const isLogoAvailable = await this.checkLogoAvailability(params.logoUrl)

    // Load fonts for the image
    const fonts = await loadFontsForImageResponse(cssText, params.shopName)

    return new ImageResponse(
      (
        <EmptyShopComponent
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          shopName={params.shopName}
          siteUrl={cleanedSiteUrl}
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

  static async generateLiveWithProductsImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily, cssText } = await parseShopStyles(
      params.stylesUrl,
    )

    if (!params.offerImagesUrls || params.offerImagesUrls.length === 0) {
      throw new Error('Product images are required for LIVE_WITH_PRODUCTS strategy')
    }

    const mainImage = params.offerImagesUrls[0]
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)
    const isLogoAvailable = await this.checkLogoAvailability(params.logoUrl)

    // Load fonts for the image
    const fonts = await loadFontsForImageResponse(cssText, params.shopName)

    return new ImageResponse(
      (
        <LiveWithProductsComponent
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          shopName={params.shopName}
          siteUrl={cleanedSiteUrl}
          poweredBy={params.poweredBy}
          logoUrl={params.logoUrl}
          mainImage={mainImage}
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

  static async generateLogoCenteredImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily, cssText } = await parseShopStyles(
      params.stylesUrl,
    )
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)
    const isLogoAvailable = await this.checkLogoAvailability(params.logoUrl)

    // Load fonts for the image
    const fonts = await loadFontsForImageResponse(cssText, params.shopName)

    return new ImageResponse(
      (
        <LogoCenteredComponent
          primaryColor={primaryColor}
          backgroundColor={backgroundColor}
          fontFamily={fontFamily}
          shopName={params.shopName}
          siteUrl={cleanedSiteUrl}
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
