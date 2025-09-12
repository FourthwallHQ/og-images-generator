import { ImageResponse } from '@vercel/og';
import { OGImageShopRequest } from './schemas';
export declare class OGImageService {
    static generateShopImage({ offerImagesUrls, stylesUrl, logoUrl, shopName, poweredBy, }: OGImageShopRequest): Promise<ImageResponse>;
    static generateShopImageBuffer(params: OGImageShopRequest): Promise<Buffer>;
}
//# sourceMappingURL=OGImageService.d.ts.map