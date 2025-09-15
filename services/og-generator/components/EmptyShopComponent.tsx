import { LeftColumn, RightColumn } from './shared'
import React from 'react'

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
        poweredBy={false}
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        fontFamily={fontFamily}
      />
      <RightColumn backgroundColor={backgroundColor} />
    </div>
  )
}