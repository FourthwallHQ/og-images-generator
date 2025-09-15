import React from 'react'

interface ShopInfoProps {
  shopName: string
  primaryColor: string
  fontFamily: string
  siteUrl?: string
}

export const ShopInfo = ({ primaryColor, fontFamily, siteUrl }: ShopInfoProps) => {
  if (!siteUrl) return null

  // Adjust font size based on URL length
  const urlLength = siteUrl.length
  let fontSize = '50px'

  if (urlLength > 25) {
    fontSize = '40px'
  } else if (urlLength > 20) {
    fontSize = '45px'
  }

  return (
    <span
      style={{
        display: 'block',
        fontSize,
        fontWeight: '700',
        lineHeight: '106%',
        letterSpacing: '-0.75px',
        color: primaryColor,
        fontFamily,
        wordBreak: 'break-word',
        hyphens: 'manual',
      }}
    >
      {siteUrl}
    </span>
  )
}
