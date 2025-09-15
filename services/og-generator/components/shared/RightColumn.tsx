import React from 'react'

interface RightColumnProps {
  mainImage?: string
  backgroundColor: string
  children?: React.ReactNode
}

export const RightColumn = ({ mainImage, backgroundColor, children }: RightColumnProps) => (
  <div
    style={{
      width: '50%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
      position: 'relative',
    }}
  >
    {mainImage && (
      <img
        src={mainImage}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    )}
    {children}
  </div>
)