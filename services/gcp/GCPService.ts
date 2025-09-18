import { StorageService } from './StorageService.js'
import { PubSubService, OGImageGeneratedMessage } from './PubSubService.js'
import { OGImageShopRequest } from '../og-generator/schemas.js'

export class GCPService {
  private storageService: StorageService
  private pubsubService: PubSubService

  constructor() {
    const bucketName = process.env.GCP_STORAGE_BUCKET
    const topicName = process.env.GCP_PUBSUB_TOPIC

    if (!bucketName || !topicName) {
      throw new Error(
        'GCP configuration is required. Please set GCP_STORAGE_BUCKET and GCP_PUBSUB_TOPIC environment variables.',
      )
    }

    this.storageService = new StorageService(bucketName)
    this.pubsubService = new PubSubService(topicName)
  }

  private generateFileName(params: OGImageShopRequest): string {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const safeName = params.shopName.toLowerCase().replace(/[^a-z0-9]/g, '-')
    return `og-images/${params.shopId}/${safeName}/${params.strategy.toLowerCase()}_${timestamp}.png`
  }

  async processImage(
    buffer: Buffer,
    params: OGImageShopRequest,
  ): Promise<{
    imageUrl: string
    messageId: string
  }> {
    const fileName = this.generateFileName(params)
    const imageUrl = await this.storageService.uploadImage(buffer, fileName)

    const message: OGImageGeneratedMessage = {
      shopId: params.shopId,
      shopName: params.shopName,
      strategy: params.strategy,
      imageUrl: imageUrl,
      timestamp: new Date().toISOString(),
      metadata: {
        logoUrl: params.logoUrl,
      },
    }
    const messageId = await this.pubsubService.publishMessage(message)

    return { imageUrl, messageId }
  }

  getConfiguration(): {
    bucketName: string
    topicName: string
  } {
    return {
      bucketName: process.env.GCP_STORAGE_BUCKET!,
      topicName: process.env.GCP_PUBSUB_TOPIC!,
    }
  }
}
