import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { GCPService } from '../../services/gcp/GCPService.js'
import { StorageService } from '../../services/gcp/StorageService.js'
import { PubSubService } from '../../services/gcp/PubSubService.js'
import { OGImageShopRequest } from '../../services/og-generator/schemas.js'

vi.mock('../../services/gcp/StorageService.js')
vi.mock('../../services/gcp/PubSubService.js')

describe('GCP Integration', () => {
  let originalEnv: NodeJS.ProcessEnv

  beforeEach(() => {
    originalEnv = { ...process.env }
    vi.clearAllMocks()
  })

  afterEach(() => {
    process.env = originalEnv
  })

  describe('GCPService', () => {
    it('should throw error when environment variables are not set', () => {
      delete process.env.GCP_STORAGE_BUCKET
      delete process.env.GCP_PUBSUB_TOPIC

      expect(() => new GCPService()).toThrow(
        'GCP configuration is required. Please set GCP_STORAGE_BUCKET and GCP_PUBSUB_TOPIC environment variables.'
      )
    })

    it('should throw error when only bucket is configured', () => {
      process.env.GCP_STORAGE_BUCKET = 'test-bucket'
      delete process.env.GCP_PUBSUB_TOPIC

      expect(() => new GCPService()).toThrow(
        'GCP configuration is required. Please set GCP_STORAGE_BUCKET and GCP_PUBSUB_TOPIC environment variables.'
      )
    })

    it('should initialize when both environment variables are set', () => {
      process.env.GCP_STORAGE_BUCKET = 'test-bucket'
      process.env.GCP_PUBSUB_TOPIC = 'test-topic'

      expect(() => new GCPService()).not.toThrow()
      
      const service = new GCPService()
      const config = service.getConfiguration()
      expect(config.bucketName).toBe('test-bucket')
      expect(config.topicName).toBe('test-topic')
    })

    it('should process image and return results', async () => {
      process.env.GCP_STORAGE_BUCKET = 'test-bucket'
      process.env.GCP_PUBSUB_TOPIC = 'test-topic'

      const mockUpload = vi.fn().mockResolvedValue('gs://test-bucket/og-images/test-shop/live_with_products_2024.png')
      const mockPublish = vi.fn().mockResolvedValue('message-123')

      vi.mocked(StorageService).mockImplementation(
        () => ({
          uploadImage: mockUpload,
        }) as any
      )

      vi.mocked(PubSubService).mockImplementation(
        () => ({
          publishMessage: mockPublish,
        }) as any
      )

      const service = new GCPService()
      const buffer = Buffer.from('test-image')
      const params: OGImageShopRequest = {
        strategy: 'LIVE_WITH_PRODUCTS',
        shopName: 'Test Shop',
        siteUrl: 'test.com',
        logoUrl: 'https://test.com/logo.png',
        stylesUrl: 'https://test.com/styles.css',
        offerImagesUrls: ['https://test.com/product.jpg'],
      }

      const result = await service.processImage(buffer, params)

      expect(result.imageUrl).toBe('gs://test-bucket/og-images/test-shop/live_with_products_2024.png')
      expect(result.messageId).toBe('message-123')
      expect(mockUpload).toHaveBeenCalledWith(buffer, expect.stringContaining('og-images/test-shop/live_with_products'))
      expect(mockPublish).toHaveBeenCalledWith(expect.objectContaining({
        shopName: 'Test Shop',
        strategy: 'LIVE_WITH_PRODUCTS',
        imageUrl: 'gs://test-bucket/og-images/test-shop/live_with_products_2024.png',
      }))
    })
  })
})