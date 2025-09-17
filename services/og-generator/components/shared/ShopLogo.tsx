import React from 'react'

interface ShopLogoProps {
  logoUrl?: string
  shopName?: string
  size?: 'small' | 'medium'
  alignment?: 'center' | 'flex-start'
  primaryColor?: string
  fontFamily?: string
  isLogoAvailable?: boolean
}

export const ShopLogo = ({
  logoUrl,
  shopName,
  size = 'small',
  alignment = 'flex-start',
  primaryColor = '#000000',
  fontFamily = 'Inter, Arial',
  isLogoAvailable = true
}: ShopLogoProps) => {
  // If logo is not available or returns 404, display shop name
  if (!logoUrl || !isLogoAvailable) {
    if (!shopName) return null

    const textStyles =
      size === 'medium'
        ? {
            fontSize: '48px',
            fontWeight: 700,
            lineHeight: 1.2,
          }
        : {
            fontSize: '32px',
            fontWeight: 700,
            lineHeight: 1.2,
          }

    return (
      <div style={{
        display: 'flex',
        alignSelf: alignment,
        color: primaryColor,
        fontFamily,
        ...textStyles
      }}>
        {shopName}
      </div>
    )
  }

  const logoStyles =
    size === 'medium'
      ? {
          maxWidth: '600px',
          maxHeight: '150px',
        }
      : {
          maxWidth: '300px',
          maxHeight: '100px',
        }

  return (
    <div style={{ display: 'contents' }}>
      <img
        src={logoUrl}
        style={{
          ...logoStyles,
          objectFit: 'contain',
          alignSelf: alignment,
        }}
      />
    </div>
  )
}