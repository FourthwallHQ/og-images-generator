import React from 'react'
import { PoweredBySection } from './shared/index.js'

type LogoCenteredComponentProps = {
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  shopName: string
  siteUrl?: string
  poweredBy?: boolean
  logoUrl: string
  isLogoAvailable?: boolean
}

const CenteredLogo = ({
  logoUrl,
  shopName,
  primaryColor,
  fontFamily,
  isLogoAvailable,
}: {
  logoUrl?: string
  shopName?: string
  primaryColor: string
  fontFamily: string
  isLogoAvailable?: boolean
}) => {
  if (!logoUrl || !isLogoAvailable) {
    if (!shopName) return null

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '72px',
          fontWeight: 700,
          lineHeight: 1.2,
          color: primaryColor,
          fontFamily,
          maxWidth: '60%',
          maxHeight: '50%',
          textAlign: 'center',
        }}
      >
        {shopName}
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      style={{
        maxWidth: '60%',
        maxHeight: '50%',
        width: 'auto',
        height: 'auto',
        objectFit: 'contain',
      }}
    />
  )
}

export const LogoCenteredComponent = ({
  primaryColor,
  backgroundColor,
  fontFamily,
  shopName,
  poweredBy,
  logoUrl,
  isLogoAvailable = true,
}: LogoCenteredComponentProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        fontFamily,
        backgroundColor: backgroundColor || '#ffffff',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <CenteredLogo
          logoUrl={logoUrl}
          shopName={shopName}
          primaryColor={primaryColor}
          fontFamily={fontFamily}
          isLogoAvailable={isLogoAvailable}
        />
      </div>

      {poweredBy && (
        <div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <PoweredBySection primaryColor={primaryColor} placement={'horizontal'} size="medium" />
        </div>
      )}
    </div>
  )
}
