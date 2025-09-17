import React from 'react'
import { PoweredBySection, ShopLogo } from './shared/index.js'

type ComingSoonComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
  text?: string
  isLogoAvailable?: boolean
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

const ComingSoonText = ({ primaryColor, text }: { primaryColor: string; text: string }) => {
  return (
    <div
      style={{
        display: 'contents',
        fontSize: '64px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '106.5%',
        letterSpacing: '-0.96px',
        color: primaryColor,
      }}
    >
      {text}
    </div>
  )
}

export const ComingSoonComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  poweredBy,
  logoUrl,
  text = 'Coming Soon',
  isLogoAvailable = true,
}: ComingSoonComponentProps) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '100%',
        width: '100%',
        fontFamily,
        backgroundColor: backgroundColor || '#ffffff',
      }}
    >
      <CenteredBox>
        <ShopLogo
          logoUrl={logoUrl}
          shopName={shopName}
          size="medium"
          alignment="center"
          primaryColor={primaryColor}
          fontFamily={fontFamily}
          isLogoAvailable={isLogoAvailable}
        />
        <ComingSoonText primaryColor={primaryColor} text={text} />
        {poweredBy && (
          <PoweredBySection primaryColor={primaryColor} placement={'horizontal'} size="medium" />
        )}
      </CenteredBox>
    </div>
  )
}
