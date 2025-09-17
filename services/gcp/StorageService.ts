import { Storage } from '@google-cloud/storage'

export class StorageService {
  private storage: Storage
  private bucketName: string

  constructor(bucketName: string) {
    this.storage = new Storage()
    this.bucketName = bucketName
  }

  async uploadImage(buffer: Buffer, fileName: string): Promise<string> {
    const bucket = this.storage.bucket(this.bucketName)
    const file = bucket.file(fileName)

    await file.save(buffer, {
      metadata: {
        contentType: 'image/png',
      },
    })

    return `gs://${this.bucketName}/${fileName}`
  }
}