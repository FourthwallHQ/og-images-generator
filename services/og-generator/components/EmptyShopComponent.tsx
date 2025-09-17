import React from 'react'
import { ComingSoonComponent } from './ComingSoonComponent.js'

type EmptyShopComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  logoUrl: string
  isLogoAvailable?: boolean
}

export const EmptyShopComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  siteUrl,
  logoUrl,
  isLogoAvailable = true,
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
      isLogoAvailable={isLogoAvailable}
    />
  )
}