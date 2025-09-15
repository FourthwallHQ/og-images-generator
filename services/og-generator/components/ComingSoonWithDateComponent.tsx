import { LaunchDateBanner, LeftColumn, RightColumn } from './shared'
import React from 'react'

type ComingSoonWithDateComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
  launchDate: string
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
}: ComingSoonWithDateComponentProps) => {
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
        <LaunchDateBanner
          launchDate={launchDate}
          primaryColor={primaryColor}
          fontFamily={fontFamily}
        />
      </RightColumn>
    </div>
  )
}