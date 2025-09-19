import sharp from 'sharp'

interface ConvertedImage {
  url: string
  isConverted: boolean
  originalUrl: string
}

export class ImageConverter {
  private static cache = new Map<string, string>()

  static isWebP(url: string): boolean {
    return url.toLowerCase().includes('.webp')
  }

  static async convertWebPtoPNGDataUrl(webpUrl: string): Promise<string> {
    if (this.cache.has(webpUrl)) {
      return this.cache.get(webpUrl)!
    }

    try {
      const response = await fetch(webpUrl)
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
      }

      const arrayBuffer = await response.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const pngBuffer = await sharp(buffer).png().toBuffer()

      const base64 = pngBuffer.toString('base64')
      const dataUrl = `data:image/png;base64,${base64}`

      this.cache.set(webpUrl, dataUrl)

      return dataUrl
    } catch (error) {
      console.error(`Failed to convert WebP image: ${webpUrl}`, error)
      throw error
    }
  }

  static async processImageUrl(url: string): Promise<ConvertedImage> {
    if (!this.isWebP(url)) {
      return {
        url,
        isConverted: false,
        originalUrl: url,
      }
    }

    try {
      const convertedUrl = await this.convertWebPtoPNGDataUrl(url)
      return {
        url: convertedUrl,
        isConverted: true,
        originalUrl: url,
      }
    } catch (error) {
      console.error(`Failed to process WebP image, using original: ${url}`, error)
      return {
        url,
        isConverted: false,
        originalUrl: url,
      }
    }
  }

  static async processAllImageUrls(urls: string[]): Promise<ConvertedImage[]> {
    return Promise.all(urls.map((url) => this.processImageUrl(url)))
  }

  static clearCache(): void {
    this.cache.clear()
  }

  static getCacheSize(): number {
    return this.cache.size
  }
}