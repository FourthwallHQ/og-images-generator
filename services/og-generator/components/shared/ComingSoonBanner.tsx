import React from 'react'

interface ComingSoonBannerProps {
  primaryColor: string
  fontFamily: string
}

export const ComingSoonBanner = ({ primaryColor, fontFamily }: ComingSoonBannerProps) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    }}
  >
    <span
      style={{
        fontSize: '72px',
        fontWeight: 700,
        color: primaryColor,
        fontFamily,
        textAlign: 'center',
        letterSpacing: '-1px',
      }}
    >
      Coming Soon
    </span>
  </div>
)