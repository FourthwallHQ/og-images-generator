import React from 'react'

interface ShopLogoProps {
  logoUrl?: string
  size?: 'small' | 'medium'
}

export const ShopLogo = ({ logoUrl, size = 'small' }: ShopLogoProps) => {
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
    <div>
      <img
        src={logoUrl}
        style={{
          ...logoStyles,
          objectFit: 'contain',
          alignSelf: 'flex-start',
        }}
      />
    </div>
  )
}
