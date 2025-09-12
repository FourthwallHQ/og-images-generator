import React from 'react';
interface ShopLogoProps {
    logoUrl: string;
}
interface ShopInfoProps {
    shopName: string;
    primaryColor: string;
    fontFamily: string;
}
interface PoweredBySectionProps {
    primaryColor: string;
}
interface LeftColumnProps {
    logoUrl: string;
    shopName: string;
    poweredBy: boolean;
    primaryColor: string;
    backgroundColor: string;
    fontFamily: string;
}
interface RightColumnProps {
    mainImage: string;
    backgroundColor: string;
}
export declare const ShopLogo: ({ logoUrl }: ShopLogoProps) => React.JSX.Element | null;
export declare const ShopInfo: ({ shopName, primaryColor, fontFamily }: ShopInfoProps) => React.JSX.Element;
export declare const PoweredBySection: ({ primaryColor }: PoweredBySectionProps) => React.JSX.Element;
export declare const LeftColumn: ({ logoUrl, shopName, poweredBy, primaryColor, backgroundColor, fontFamily, }: LeftColumnProps) => React.JSX.Element;
export declare const RightColumn: ({ mainImage, backgroundColor }: RightColumnProps) => React.JSX.Element;
export {};
//# sourceMappingURL=components.d.ts.map