import React from 'react'

interface LaunchDateBannerProps {
  launchDate: string // Already formatted date string
  primaryColor: string
  fontFamily: string
}

export const LaunchDateBanner = ({
  launchDate,
  primaryColor,
  fontFamily,
}: LaunchDateBannerProps) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        gap: '16px',
      }}
    >
      <span
        style={{
          fontSize: '48px',
          fontWeight: 400,
          color: primaryColor,
          fontFamily,
          opacity: 0.8,
        }}
      >
        Launching
      </span>
      <span
        style={{
          fontSize: '64px',
          fontWeight: 700,
          color: primaryColor,
          fontFamily,
          textAlign: 'center',
          letterSpacing: '-1px',
        }}
      >
        {launchDate}
      </span>
    </div>
  )
}