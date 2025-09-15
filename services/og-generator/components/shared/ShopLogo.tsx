import React from 'react'

interface ShopLogoProps {
  logoUrl?: string
}

export const ShopLogo = ({ logoUrl }: ShopLogoProps) => {
  if (!logoUrl) return null

  return (
    <div>
      <img
        src={logoUrl}
        style={{
          maxHeight: '120px',
          maxWidth: '280px',
          objectFit: 'contain',
          alignSelf: 'flex-start',
        }}
      />
    </div>
  )
}
