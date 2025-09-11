import { z } from 'zod'

export const OGImageShopSchema = z.object({
  offerImagesUrls: z.array(z.string().url()).min(1, 'At least one image URL is required'),
  stylesUrl: z.union([z.string().url(), z.literal('')]).optional().default(''),
  logoUrl: z.union([z.string().url(), z.literal('')]).optional().default(''),
  shopName: z.string().min(1, 'Shop name is required'),
  poweredBy: z.boolean().optional().default(false),
})

export type OGImageShopParameters = z.infer<typeof OGImageShopSchema>

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