import { z } from 'zod';
export const OGImageShopSchema = z.object({
    offerImagesUrls: z.array(z.string().url()).min(1, 'At least one image URL is required'),
    stylesUrl: z.union([z.string().url(), z.literal('')]).optional().default(''),
    logoUrl: z.union([z.string().url(), z.literal('')]).optional().default(''),
    shopName: z.string().min(1, 'Shop name is required'),
    poweredBy: z.boolean().optional().default(false),
});
//# sourceMappingURL=types.js.map