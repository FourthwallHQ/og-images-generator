import React from 'react'
import { ImageResponse } from '@vercel/og'
import { OGImageShopRequest } from './schemas'
import { parseShopStyles } from './styles-parser'
import { LeftColumn, RightColumn } from './components'

export class OGImageService {
  static async generateShopImage({
    offerImagesUrls,
    stylesUrl,
    logoUrl,
    shopName,
    poweredBy,
  }: OGImageShopRequest): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily } = await parseShopStyles(stylesUrl)
    const mainImage = offerImagesUrls[0]

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
            logoUrl={logoUrl}
            shopName={shopName}
            poweredBy={poweredBy}
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
          />
          <RightColumn
            mainImage={mainImage}
            backgroundColor={backgroundColor}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

  static async generateShopImageBuffer(params: OGImageShopRequest): Promise<Buffer> {
    const imageResponse = await this.generateShopImage(params)
    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }
}