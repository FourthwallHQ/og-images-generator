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

      const mockUpload = vi.fn().mockResolvedValue('gs://test-bucket/og-images/test-shop/logo_centered_2024.png')
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
        strategy: 'LOGO_CENTERED',
        shopName: 'Test Shop',
        logoUrl: 'https://test.com/logo.png',
        stylesUrl: 'https://test.com/styles.css',
        poweredBy: true,
      }

      const result = await service.processImage(buffer, params)

      expect(result.imageUrl).toBe('gs://test-bucket/og-images/test-shop/logo_centered_2024.png')
      expect(result.messageId).toBe('message-123')
      expect(mockUpload).toHaveBeenCalledWith(buffer, expect.stringContaining('og-images/test-shop/logo_centered'))
      expect(mockPublish).toHaveBeenCalledWith(expect.objectContaining({
        shopName: 'Test Shop',
        strategy: 'LOGO_CENTERED',
        imageUrl: 'gs://test-bucket/og-images/test-shop/logo_centered_2024.png',
      }))
    })
  })
})