import React from 'react'
import { ComingSoonComponent } from './ComingSoonComponent.js'

type ComingSoonWithDateComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
  launchDate: string
  isLogoAvailable?: boolean
}

export const ComingSoonWithDateComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  siteUrl,
  poweredBy,
  logoUrl,
  launchDate,
  isLogoAvailable = true,
}: ComingSoonWithDateComponentProps) => {
  return (
    <ComingSoonComponent
      primaryColor={primaryColor}
      backgroundColor={backgroundColor}
      fontFamily={fontFamily}
      shopName={shopName}
      siteUrl={siteUrl}
      poweredBy={poweredBy}
      logoUrl={logoUrl}
      text={launchDate}
      isLogoAvailable={isLogoAvailable}
    />
  )
}