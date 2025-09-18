import { PubSub } from '@google-cloud/pubsub'

export interface OGImageGeneratedMessage {
  shopId: string
  shopName: string
  strategy: string
  imageUrl: string
  timestamp: string
  metadata?: Record<string, any>
}

export class PubSubService {
  private pubsub: PubSub
  private topicName: string

  constructor(topicName: string) {
    this.pubsub = new PubSub()
    this.topicName = topicName
  }

  async publishMessage(message: OGImageGeneratedMessage): Promise<string> {
    const topic = this.pubsub.topic(this.topicName)
    const messageBuffer = Buffer.from(JSON.stringify(message))

    const attributes: Record<string, string> = {
      shopId: message.shopId,
      shopName: message.shopName,
      strategy: message.strategy,
      timestamp: message.timestamp,
    }

    return await topic.publishMessage({
      data: messageBuffer,
      attributes,
    })
  }
}