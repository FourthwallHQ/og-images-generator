import React from 'react'

interface ShopLogoProps {
  logoUrl?: string
  size?: 'small' | 'medium'
  alignment?: 'center' | 'flex-start'
}

export const ShopLogo = ({ logoUrl, size = 'small', alignment = 'flex-start' }: ShopLogoProps) => {
  if (!logoUrl) return null

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