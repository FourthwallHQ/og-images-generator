import React from 'react'

interface ShopInfoProps {
  shopName: string
  primaryColor: string
  fontFamily: string
  siteUrl?: string
}

function smartBreakUrl(url: string): string[] {
  if (url.length <= 20) {
    return [url]
  }

  // For subdomain URLs like "store.cohhilition.com", break after first part if it fits
  const subdomainMatch = url.match(/^([^.]{4,20})(\..+)$/)
  if (subdomainMatch && subdomainMatch[1].length <= 20) {
    const remainder = subdomainMatch[2]
    if (remainder.length <= 20) {
      return [subdomainMatch[1], remainder]
    } else {
      return [subdomainMatch[1], ...smartBreakUrl(remainder)]
    }
  }

  // For domain-like URLs, try to break before .fourthwall.com or similar
  const domainMatch = url.match(/^(.{8,})(\.(fourthwall\.com|[^.]+\.com).*)$/)
  if (domainMatch && domainMatch[1].length <= 20) {
    return [domainMatch[1], domainMatch[2]]
  }

  // Try to break at natural points like hyphens
  const hyphenIndex = url.lastIndexOf('-', 20)
  if (hyphenIndex > 8 && hyphenIndex < 20) {
    const firstPart = url.substring(0, hyphenIndex)
    const remainder = url.substring(hyphenIndex)
    return [firstPart, ...smartBreakUrl(remainder)]
  }

  // For longer URLs without natural break points, break at 20 chars
  if (url.length > 20) {
    const firstPart = url.substring(0, 20)
    const remainder = url.substring(20)
    return [firstPart, ...smartBreakUrl(remainder)]
  }

  return [url]
}

export const ShopInfo = ({ primaryColor, fontFamily, siteUrl }: ShopInfoProps) => {
  if (!siteUrl) return null

  const urlParts = smartBreakUrl(siteUrl)

  // Adjust font size based on URL length
  const urlLength = siteUrl.length
  let fontSize = '50px'

  if (urlLength > 25) {
    fontSize = '40px'
  } else if (urlLength > 20) {
    fontSize = '45px'
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        fontSize,
        fontWeight: '700',
        letterSpacing: '-0.75px',
        color: primaryColor,
        fontFamily,
        gap: '4px',
      }}
    >
      {urlParts.map((part, index) => (
        <div key={index} style={{ lineHeight: '106%' }}>
          {part}
        </div>
      ))}
    </div>
  )
}
