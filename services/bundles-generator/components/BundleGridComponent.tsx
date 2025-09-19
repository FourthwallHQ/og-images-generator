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

  const renderSingleProduct = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px',
        backgroundColor: '#ffffff',
      }}
    >
      <ProductImage
        src={imageUrls[0]}
        isAvailable={imageAvailability[0]}
        width="100%"
        height="100%"
      />
    </div>
  )

  const renderTwoProducts = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        padding: '80px',
        backgroundColor: '#ffffff',
      }}
    >
      {imageUrls.slice(0, 2).map((url, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProductImage src={url} isAvailable={imageAvailability[index]} />
        </div>
      ))}
    </div>
  )

  const renderThreeProducts = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '60px',
        backgroundColor: '#ffffff',
      }}
    >
      {imageUrls.slice(0, 3).map((url, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ProductImage src={url} isAvailable={imageAvailability[index]} />
        </div>
      ))}
    </div>
  )

  const renderFourProducts = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        padding: '60px',
        backgroundColor: '#ffffff',
      }}
    >
      {[0, 1].map((row) => (
        <div
          key={row}
          style={{
            flex: 1,
            display: 'flex',
            gap: '30px',
          }}
        >
          {[0, 1].map((col) => {
            const index = row * 2 + col
            return (
              <div
                key={col}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductImage
                  src={imageUrls[index]}
                  isAvailable={imageAvailability[index]}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )

  const renderSixProducts = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '25px',
        padding: '50px',
        backgroundColor: '#ffffff',
      }}
    >
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          style={{
            flex: 1,
            display: 'flex',
            gap: '25px',
          }}
        >
          {[0, 1].map((col) => {
            const index = row * 2 + col
            if (index >= productCount) return null
            return (
              <div
                key={col}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductImage
                  src={imageUrls[index]}
                  isAvailable={imageAvailability[index]}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )

  const renderNineProducts = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        padding: '40px',
        backgroundColor: '#ffffff',
      }}
    >
      {[0, 1, 2].map((row) => (
        <div
          key={row}
          style={{
            flex: 1,
            display: 'flex',
            gap: '20px',
          }}
        >
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col
            if (index >= productCount) return null
            return (
              <div
                key={col}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductImage
                  src={imageUrls[index]}
                  isAvailable={imageAvailability[index]}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )

  const renderTwelveProducts = () => (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        padding: '35px',
        backgroundColor: '#ffffff',
      }}
    >
      {[0, 1, 2, 3].map((row) => (
        <div
          key={row}
          style={{
            flex: 1,
            display: 'flex',
            gap: '15px',
          }}
        >
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col
            if (index >= productCount) return null
            return (
              <div
                key={col}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ProductImage
                  src={imageUrls[index]}
                  isAvailable={imageAvailability[index]}
                />
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )

  switch (productCount) {
    case 1:
      return renderSingleProduct()
    case 2:
      return renderTwoProducts()
    case 3:
      return renderThreeProducts()
    case 4:
      return renderFourProducts()
    case 5:
    case 6:
      return renderSixProducts()
    case 7:
    case 8:
    case 9:
      return renderNineProducts()
    case 10:
    case 11:
    case 12:
      return renderTwelveProducts()
    default:
      return renderNineProducts()
  }
}