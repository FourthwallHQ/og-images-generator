import { ImageResponse } from '@vercel/og';
import { OGImageShopParameters } from './types';
export declare class OGImageService {
    static generateShopImage({ offerImagesUrls, stylesUrl, logoUrl, shopName, poweredBy, }: OGImageShopParameters): Promise<ImageResponse>;
    static generateShopImageBuffer(params: OGImageShopParameters): Promise<Buffer>;
}
//# sourceMappingURL=OGImageService.d.ts.map