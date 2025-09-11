import { z } from 'zod';
export declare const OGImageShopSchema: z.ZodObject<{
    offerImagesUrls: z.ZodArray<z.ZodString>;
    stylesUrl: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    logoUrl: z.ZodDefault<z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodLiteral<"">]>>>;
    shopName: z.ZodString;
    poweredBy: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export type OGImageShopParameters = z.infer<typeof OGImageShopSchema>;
export interface ParsedStyles {
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
}
export interface ShopInfoProps {
    shopName: string;
    primaryColor: string;
    fontFamily: string;
}
export interface ShopLogoProps {
    logoUrl: string;
}
export interface PoweredBySectionProps {
    primaryColor: string;
}
export interface LeftColumnProps {
    logoUrl: string;
    shopName: string;
    poweredBy: boolean;
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
}
export interface RightColumnProps {
    mainImage: string;
    backgroundColor: string;
}
//# sourceMappingURL=types.d.ts.map