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
              objectFit: 'contain',
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
              objectFit: 'contain',
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
              objectFit: 'contain',
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
              objectFit: 'contain',
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
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    )
  }

  const renderFiveProducts = () => {
    // Fixed dimensions for products
    // Width: 563px with 3:4 aspect ratio
    const productWidth = 563
    const productHeight = Math.round(productWidth * (4 / 3)) // 751px

    // Container dimensions for centering
    const containerWidth = 1536
    const containerHeight = 2048

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
          {/* First image - top-left */}
          <img
            src={imageUrls[0]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: 143,
              left: 128,
              width: productWidth,
              height: productHeight,
              objectFit: 'contain',
            }}
          />

          {/* Second image - top-right */}
          <img
            src={imageUrls[1]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: 246,
              right: 128,
              width: productWidth,
              height: productHeight,
              objectFit: 'contain',
            }}
          />

          {/* Third image - bottom-left */}
          <img
            src={imageUrls[2]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              bottom: 246,
              left: 128,
              width: productWidth,
              height: productHeight,
              objectFit: 'contain',
            }}
          />

          {/* Fourth image - bottom-right */}
          <img
            src={imageUrls[3]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              bottom: 143,
              right: 128,
              width: productWidth,
              height: productHeight,
              objectFit: 'contain',
            }}
          />

          {/* Fifth image - centered with higher z-index */}
          <img
            src={imageUrls[4]}
            width={productWidth}
            height={productHeight}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: productWidth,
              height: productHeight,
              objectFit: 'contain',
              zIndex: 1, // On top of other images
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
              objectFit: 'contain',
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
              objectFit: 'contain',
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
              objectFit: 'contain',
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
              objectFit: 'contain',
            }}
          />
        </div>
      </div>
    )
  }


  // For less than 2 products - show error
  if (productCount < 2) {
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
          <div>Minimum 2 products required</div>
          <div style={{ fontSize: '20px', opacity: 0.7, marginTop: '20px' }}>
            Bundle must contain at least 2 products
          </div>
        </div>
      </div>
    )
  }

  // For more than 5 products - use only first 5
  if (productCount > 5) {
    // Slice arrays to use only first 5
    const limitedUrls = imageUrls.slice(0, 5)
    const limitedAvailability = imageAvailability.slice(0, 5)

    // Create a new component instance with limited data
    return (
      <BundleGridComponent
        imageUrls={limitedUrls}
        imageAvailability={limitedAvailability}
      />
    )
  }

  // Handle 2-5 products normally
  switch (productCount) {
    case 2:
      return renderTwoProducts()
    case 3:
      return renderThreeProducts()
    case 4:
      return renderFourProducts()
    case 5:
      return renderFiveProducts()
    default:
      return null
  }
}
