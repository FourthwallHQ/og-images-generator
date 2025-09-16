import { LeftColumn, RightColumn } from './shared/index.js'
import React from 'react'

type LiveWithProductsComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
  mainImage: string
}

export const LiveWithProductsComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  siteUrl,
  poweredBy,
  logoUrl,
  mainImage,
}: LiveWithProductsComponentProps) => {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        fontFamily,
        backgroundColor: '#ffffff',
      }}
    >
      <LeftColumn
        logoUrl={logoUrl}
        shopName={shopName}
        siteUrl={siteUrl}
        poweredBy={Boolean(poweredBy)}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        fontFamily={fontFamily}
      />
      <RightColumn mainImage={mainImage} backgroundColor={backgroundColor} />
    </div>
  )
}