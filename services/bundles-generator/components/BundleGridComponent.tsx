import React from 'react'
import { ProductImage } from './shared/ProductImage.js'

interface BundleGridComponentProps {
  imageUrls: string[]
  imageAvailability: boolean[]
}

export const BundleGridComponent: React.FC<BundleGridComponentProps> = ({
  imageUrls,
  imageAvailability,
}) => {
  const productCount = imageUrls.length

  const renderTwoProducts = () => {
    // Fixed dimensions for products
    const productWidth = 820
    const productHeight = 1093 // 820 * (4/3) for 3:4 aspect ratio

    // Container is 1536x2048, but we position relative to the full container
    // Images will overlap in the middle

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
        {/* First image - top-left corner with 100px padding */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            left: '100px',
            width: `${productWidth}px`,
            height: `${productHeight}px`,
            zIndex: 1,
          }}
        >
          <ProductImage
            src={imageUrls[0]}
            width={productWidth}
            height={productHeight}
            style={{
              width: `${productWidth}px`,
              height: `${productHeight}px`,
              objectFit: 'cover',
              aspectRatio: '3 / 4',
            }}
          />
        </div>

        {/* Second image - bottom-right corner with 100px padding */}
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            right: '100px',
            width: `${productWidth}px`,
            height: `${productHeight}px`,
            zIndex: 2,
          }}
        >
          <ProductImage
            src={imageUrls[1]}
            width={productWidth}
            height={productHeight}
            style={{
              width: `${productWidth}px`,
              height: `${productHeight}px`,
              objectFit: 'cover',
              aspectRatio: '3 / 4',
            }}
          />
        </div>
      </div>
    )
  }

  const renderThreeProducts = () => {
    // Fixed dimensions for products
    const productWidth = 820
    const productHeight = 1093 // 3:4 aspect ratio

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          backgroundColor: 'transparent',
        }}
      >
        {/* First image - top-left */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            left: '100px',
            width: `${productWidth}px`,
            height: `${productHeight}px`,
            zIndex: 1,
          }}
        >
          <ProductImage
            src={imageUrls[0]}
            width={productWidth}
            height={productHeight}
            style={{
              width: `${productWidth}px`,
              height: `${productHeight}px`,
              objectFit: 'cover',
              aspectRatio: '3 / 4',
            }}
          />
        </div>

        {/* Second image - top-right */}
        <div
          style={{
            position: 'absolute',
            top: '100px',
            right: '100px',
            width: `${productWidth}px`,
            height: `${productHeight}px`,
            zIndex: 2,
          }}
        >
          <ProductImage
            src={imageUrls[1]}
            width={productWidth}
            height={productHeight}
            style={{
              width: `${productWidth}px`,
              height: `${productHeight}px`,
              objectFit: 'cover',
              aspectRatio: '3 / 4',
            }}
          />
        </div>

        {/* Third image - bottom-center */}
        <div
          style={{
            position: 'absolute',
            bottom: '100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${productWidth}px`,
            height: `${productHeight}px`,
            zIndex: 3,
          }}
        >
          <ProductImage
            src={imageUrls[2]}
            width={productWidth}
            height={productHeight}
            style={{
              width: `${productWidth}px`,
              height: `${productHeight}px`,
              objectFit: 'cover',
              aspectRatio: '3 / 4',
            }}
          />
        </div>
      </div>
    )
  }


  // Support only 2-3 products
  // Less than 2 or more than 3 products not supported
  if (productCount < 2 || productCount > 3) {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
          padding: '100px',
        }}
      >
        <div
          style={{
            color: '#999',
            fontSize: '32px',
            textAlign: 'center',
            flexDirection: 'column',
            gap: '20px',
          }}
        >
          <div>Only 2 or 3 products supported</div>
          <div style={{ fontSize: '20px', opacity: 0.7, marginTop: '20px' }}>
            Bundle must contain exactly 2 or 3 products
          </div>
        </div>
      </div>
    )
  }

  switch (productCount) {
    case 2:
      return renderTwoProducts()
    case 3:
      return renderThreeProducts()
    default:
      return null
  }
}
