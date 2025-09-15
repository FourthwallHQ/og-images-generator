import { ComingSoonBanner, LeftColumn, RightColumn } from './shared'
import React from 'react'

type ComingSoonComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
}

export const ComingSoonComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  siteUrl,
  poweredBy,
  logoUrl,
}: ComingSoonComponentProps) => {
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
      <RightColumn backgroundColor={backgroundColor}>
        <ComingSoonBanner primaryColor={primaryColor} fontFamily={fontFamily} />
      </RightColumn>
    </div>
  )
}
