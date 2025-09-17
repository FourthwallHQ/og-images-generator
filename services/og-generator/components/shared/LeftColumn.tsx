import React from 'react'
import { ShopLogo } from './ShopLogo.js'
import { ShopInfo } from './ShopInfo.js'
import { PoweredBySection } from './PoweredBySection.js'

interface LeftColumnProps {
  logoUrl?: string
  shopName: string
  siteUrl?: string
  poweredBy: boolean
  primaryColor: string
  backgroundColor: string
  fontFamily: string
  isLogoAvailable?: boolean
}

export const LeftColumn = ({
  logoUrl,
  shopName,
  siteUrl,
  poweredBy,
  primaryColor,
  backgroundColor,
  fontFamily,
  isLogoAvailable = true,
}: LeftColumnProps) => (
  <div
    style={{
      width: '50%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
    }}
  >
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 80px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '64px',
          maxWidth: '440px',
        }}
      >
        <ShopLogo
          logoUrl={logoUrl}
          shopName={shopName}
          primaryColor={primaryColor}
          fontFamily={fontFamily}
          isLogoAvailable={isLogoAvailable}
        />
        <ShopInfo
          shopName={shopName}
          primaryColor={primaryColor}
          fontFamily={fontFamily}
          siteUrl={siteUrl}
        />

        {poweredBy && (
          <div style={{ display: 'flex', flexShrink: 0 }}>
            <PoweredBySection primaryColor={primaryColor} />
          </div>
        )}
      </div>
    </div>
  </div>
)
