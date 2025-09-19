import React from 'react'

interface ProductImageProps {
  src: string

  width?: string | number
  height?: string | number
  style?: React.CSSProperties
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,

  width,
  height,
  style,
}) => {
  return (
    <img
      src={src}
      width={typeof width === 'number' ? width : undefined}
      height={typeof height === 'number' ? height : undefined}
      style={{
        width: width || '100%',
        height: height || '100%',
        objectFit: 'contain',
        ...style,
      }}
    />
  )
}
