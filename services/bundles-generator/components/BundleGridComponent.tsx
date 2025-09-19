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

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        }}
      >
        {/* Wrapper for absolute positioned items */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
          }}
        >
          {/* First image - top-left corner with 100px padding */}
          <img
            src={imageUrls[0]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: 100,
              left: 100,
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />

          {/* Second image - bottom-right corner with 100px padding */}
          <img
            src={imageUrls[1]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              bottom: 100,
              right: 100,
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    )
  }

  const renderThreeProducts = () => {
    // Fixed dimensions for products
    // Width: 715px with 3:4 aspect ratio
    const productWidth = 715
    const productHeight = Math.round(productWidth * (4 / 3)) // 953px
    const padding = 100

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        }}
      >
        {/* Wrapper for absolute positioned items */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
          }}
        >
          {/* First image - top-left corner with 100px padding */}
          <img
            src={imageUrls[0]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: padding, // 100px from top
              left: padding, // 100px from left
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />

          {/* Second image - right edge, 420px from top (plus 100px padding) */}
          <img
            src={imageUrls[1]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: 420 + padding, // 420px + 100px padding = 520px from top
              right: padding, // 100px from right edge
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />

          {/* Third image - bottom edge, 320px from left (plus 100px padding) */}
          <img
            src={imageUrls[2]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              bottom: padding, // 100px from bottom
              left: 320 + padding, // 320px + 100px padding = 420px from left
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    )
  }

  const renderFourProducts = () => {
    // Fixed dimensions for products
    // Width: 615px with 3:4 aspect ratio
    const productWidth = 615
    const productHeight = Math.round(productWidth * (4 / 3)) // 820px
    const padding = 100

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: 'transparent',
        }}
      >
        {/* Wrapper for absolute positioned items */}
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            display: 'flex',
          }}
        >
          {/* First image - top-left corner */}
          <img
            src={imageUrls[0]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: padding, // 100px from top
              left: padding, // 100px from left
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />

          {/* Second image - right edge, 220px from top (including 100px padding) */}
          <img
            src={imageUrls[1]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: 220, // 220px from top edge (including padding)
              right: padding, // 100px from right edge
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />

          {/* Third image - left edge, 220px from bottom (including 100px padding) */}
          <img
            src={imageUrls[2]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              bottom: 220, // 220px from bottom edge (including padding)
              left: padding, // 100px from left edge
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />

          {/* Fourth image - bottom-right corner */}
          <img
            src={imageUrls[3]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              bottom: padding, // 100px from bottom
              right: padding, // 100px from right edge
              width: productWidth,
              height: productHeight,
              objectFit: 'cover',
            }}
          />
        </div>
      </div>
    )
  }


  // Support only 2-4 products
  if (productCount < 2 || productCount > 4) {
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
          <div>Only 2, 3 or 4 products supported</div>
          <div style={{ fontSize: '20px', opacity: 0.7, marginTop: '20px' }}>
            Bundle must contain 2-4 products
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
    case 4:
      return renderFourProducts()
    default:
      return null
  }
}
