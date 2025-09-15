import React from 'react'
import { ComingSoonComponent } from './ComingSoonComponent'

type EmptyShopComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  logoUrl: string
}

export const EmptyShopComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  siteUrl,
  logoUrl,
}: EmptyShopComponentProps) => {
  return (
    <ComingSoonComponent
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
      fontFamily={fontFamily}
      shopName={shopName}
      siteUrl={siteUrl}
      poweredBy={false}
      logoUrl={logoUrl}
      text={siteUrl || shopName}
    />
  )
}