import React from 'react'

interface ShopInfoProps {
  shopName: string
  primaryColor: string
  fontFamily: string
  siteUrl?: string
}

export const ShopInfo = ({ primaryColor, fontFamily, siteUrl }: ShopInfoProps) => {
  if (!siteUrl) return null

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
      }}
    >
      <span
        style={{
          display: 'block',
          fontSize: '50px',
          fontWeight: '700',
          lineHeight: '106%',
          letterSpacing: '-0.75px',
          color: primaryColor,
          marginTop: '12px',
          fontFamily,
        }}
      >
        {siteUrl}
      </span>
    </div>
  )
}