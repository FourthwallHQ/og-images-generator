import React from 'react'

interface ProductImageProps {
  src: string
  isAvailable: boolean
  width?: string | number
  height?: string | number
}

export const ProductImage: React.FC<ProductImageProps> = ({ src, isAvailable, width, height }) => {
  if (!isAvailable) {
    return (
      <div
        style={{
          width: width || '100%',
          height: height || '100%',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
        }}
      >
        <div
          style={{
            fontSize: '24px',
            color: '#999',
            textAlign: 'center',
          }}
        >
          Image
          <br />
          Unavailable
        </div>
      </div>
    )
  }

  return (
    <img
      src={src}
      width={typeof width === 'number' ? width : undefined}
      height={typeof height === 'number' ? height : undefined}
      style={{
        width: width || '100%',
        height: height || '100%',
        objectFit: 'contain',
        borderRadius: '8px',
      }}
    />
  )
}
