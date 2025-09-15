import React from 'react'
import { ImageResponse } from '@vercel/og'
import { OGImageShopRequest } from './schemas'
import { parseShopStyles } from './styles-parser'
import { LeftColumn, RightColumn, ComingSoonBanner, LaunchDateBanner } from './components'

export class OGImageService {
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
      default:
        throw new Error(`Unknown strategy: ${params.strategy}`)
    }

    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  static async generateComingSoonImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily } = await parseShopStyles(params.stylesUrl)
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily,
            backgroundColor: '#ffffff',
          }}
        >
          <LeftColumn
            logoUrl={params.logoUrl}
            shopName={params.shopName}
            siteUrl={cleanedSiteUrl}
            poweredBy={Boolean(params.poweredBy)}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
          />
          <RightColumn backgroundColor={backgroundColor}>
            <ComingSoonBanner primaryColor={primaryColor} fontFamily={fontFamily} />
          </RightColumn>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  }

  static cleanSiteUrl(siteUrl: string | undefined): string | undefined {
    if (!siteUrl) return undefined
    return siteUrl.replace(/^https?:\/\//, '')
  }

  static formatDate(dateStr: string): string {
    try {
      const date = new Date(dateStr)
      const options: Intl.DateTimeFormatOptions = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }
      return date.toLocaleDateString('en-US', options)
    } catch {
      return dateStr
    }
  }

  static async generateComingSoonWithDateImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily } = await parseShopStyles(params.stylesUrl)

    if (!params.launchDate) {
      throw new Error('Launch date is required for COMING_SOON_WITH_DATE strategy')
    }

    const formattedDate = this.formatDate(params.launchDate)
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily,
            backgroundColor: '#ffffff',
          }}
        >
          <LeftColumn
            logoUrl={params.logoUrl}
            shopName={params.shopName}
            siteUrl={cleanedSiteUrl}
            poweredBy={Boolean(params.poweredBy)}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
          />
          <RightColumn backgroundColor={backgroundColor}>
            <LaunchDateBanner
              launchDate={formattedDate}
              primaryColor={primaryColor}
              fontFamily={fontFamily}
            />
          </RightColumn>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  }

  static async generateEmptyShopImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily } = await parseShopStyles(params.stylesUrl)
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily,
            backgroundColor: '#ffffff',
          }}
        >
          <LeftColumn
            logoUrl={params.logoUrl}
            shopName={params.shopName}
            siteUrl={cleanedSiteUrl}
            poweredBy={false}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
          />
          <RightColumn backgroundColor={backgroundColor} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  }

  static async generateLiveWithProductsImage(params: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily } = await parseShopStyles(params.stylesUrl)

    if (!params.offerImagesUrls || params.offerImagesUrls.length === 0) {
      throw new Error('Product images are required for LIVE_WITH_PRODUCTS strategy')
    }

    const mainImage = params.offerImagesUrls[0]
    const cleanedSiteUrl = this.cleanSiteUrl(params.siteUrl)

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily,
            backgroundColor: '#ffffff',
          }}
        >
          <LeftColumn
            logoUrl={params.logoUrl}
            shopName={params.shopName}
            siteUrl={cleanedSiteUrl}
            poweredBy={Boolean(params.poweredBy)}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
          />
          <RightColumn mainImage={mainImage} backgroundColor={backgroundColor} />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    )
  }
}
