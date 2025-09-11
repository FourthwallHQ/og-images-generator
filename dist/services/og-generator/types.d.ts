export interface OGImageShopParameters {
    offerImagesUrls: string[];
    stylesUrl: string;
    logoUrl: string;
    shopName: string;
    poweredBy: boolean;
}
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