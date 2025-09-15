import React from 'react'
import { PoweredBySection, ShopLogo } from './shared'

type ComingSoonComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
}

export const CenteredBox = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      width: '100%',
      gap: '80px',
    }}
  >
    {children}
  </div>
)

const ComingSoonText = ({ primaryColor }: { primaryColor: string }) => {
  return (
    <div
      style={{
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '106.5%',
        letterSpacing: '-0.96px',
        color: primaryColor,
      }}
    >
      Coming Soon
    </div>
  )
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
        fontFamily,
        backgroundColor: backgroundColor || '#ffffff',
      }}
    >
      <CenteredBox>
        <ShopLogo logoUrl={logoUrl} />
        <ComingSoonText primaryColor={primaryColor} />
        <PoweredBySection primaryColor={primaryColor} placement={'horizontal'} size="medium" />
      </CenteredBox>
    </div>
  )
}
