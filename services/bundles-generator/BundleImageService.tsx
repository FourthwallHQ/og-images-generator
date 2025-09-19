import React from 'react'
import { ImageResponse } from '@vercel/og'
import { BundleImageRequest } from './schemas.js'
import { BundleGridComponent } from './components/BundleGridComponent.js'
import { ImageConverter } from './image-converter.js'

export class BundleImageService {
  static async checkImageAvailability(imageUrl: string): Promise<boolean> {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' })
      return response.ok && response.status !== 404
    } catch {
      return false
    }
  }

  static async checkAllImagesAvailability(imageUrls: string[]): Promise<boolean[]> {
    return Promise.all(imageUrls.map((url) => this.checkImageAvailability(url)))
  }

  static async generateBundleImageBuffer(imageUrls: BundleImageRequest): Promise<Buffer> {
    const imageResponse = await this.generateBundleImage(imageUrls)
    const arrayBuffer = await imageResponse.arrayBuffer()
    return Buffer.from(arrayBuffer)
  }

  static async generateBundleImage(imageUrls: BundleImageRequest): Promise<ImageResponse> {
    // Convert WebP images to PNG data URLs
    const convertedImages = await ImageConverter.processAllImageUrls(imageUrls)
    const processedUrls = convertedImages.map((img) => img.url)

    // Check availability of all images (including converted ones)
    const imageAvailability = await this.checkAllImagesAvailability(
      convertedImages.map((img) => img.originalUrl)
    )

    return new ImageResponse(
      <BundleGridComponent imageUrls={processedUrls} imageAvailability={imageAvailability} />,
      {
        width: 1536,
        height: 2048,
      },
    )
  }
}