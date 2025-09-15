import React from 'react'

interface OGImageWrapperProps {
  children: React.ReactNode
}

export const OGImageWrapper = ({ children }: OGImageWrapperProps) => (
  <div
    style={{
      width: '1200px',
      height: '630px',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {children}
  </div>
)