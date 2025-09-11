import React from 'react'
import { ImageResponse } from '@vercel/og'
import { OGImageShopParameters } from './types'
import { parseShopStyles } from './styles-parser'
import { LeftColumn, RightColumn } from './components'

export class OGImageService {
  static async generateShopImage({
    offerImagesUrls,
    stylesUrl,
    logoUrl,
    shopName,
    poweredBy,
  }: OGImageShopParameters): Promise<ImageResponse> {
    const { primaryColor, backgroundColor, fontFamily } = await parseShopStyles(stylesUrl)
    const mainImage = offerImagesUrls[0]

    return new ImageResponse(
      React.createElement(
        'div',
        {
          style: {
            height: '100%',
            width: '100%',
            display: 'flex',
            fontFamily,
            backgroundColor: '#ffffff',
          },
        },
        React.createElement(LeftColumn, {
          logoUrl,
          shopName,
          poweredBy,
          primaryColor,
          backgroundColor,
          fontFamily,
        }),
        React.createElement(RightColumn, {
          mainImage,
          backgroundColor,
        })
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  }

  static async generateShopImageBuffer(params: OGImageShopParameters): Promise<Buffer> {
    const imageResponse = await this.generateShopImage(params)
    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }
}