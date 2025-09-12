import React from 'react'


interface ShopLogoProps {
  logoUrl: string
}

interface ShopInfoProps {
  shopName: string
  primaryColor: string
  fontFamily: string
}

interface PoweredBySectionProps {
  primaryColor: string
}

interface LeftColumnProps {
  logoUrl: string
  shopName: string
  poweredBy: boolean
  primaryColor: string
  backgroundColor: string
  fontFamily: string
}

interface RightColumnProps {
  mainImage: string
  backgroundColor: string
}

export const ShopLogo = ({ logoUrl }: ShopLogoProps) => {
  if (!logoUrl) return null

  return (
    <img
      src={logoUrl}
      style={{
        maxHeight: '120px',
        maxWidth: '280px',
        objectFit: 'contain',
        alignSelf: 'flex-start',
      }}
    />
  )
}

export const ShopInfo = ({ shopName, primaryColor, fontFamily }: ShopInfoProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
    }}
  >
    <span
      style={{
        display: 'block',
        fontSize: '36px',
        color: primaryColor,
        margin: 0,
        opacity: 0.8,
      }}
    >
      Get it at
    </span>

    <span
      style={{
        display: 'block',
        color: primaryColor,
        fontFamily,
        fontSize: '50px',
        fontStyle: 'normal',
        fontWeight: 700,
        lineHeight: '106.5%',
        letterSpacing: '-0.75px',
        margin: 0,
        wordBreak: 'break-word',
      }}
    >
      {shopName}
    </span>
  </div>
)

export const PoweredBySection = ({ primaryColor }: PoweredBySectionProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '8px',
    }}
  >
    <span
      style={{
        fontSize: '24px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        letterSpacing: '-0.36px',
        color: primaryColor,
        opacity: 0.6,
      }}
    >
      Powered by
    </span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="32"
      viewBox="0 0 272 48"
      fill="none"
      style={{
        width: '180px',
        height: '32px',
        opacity: 0.6,
      }}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.3426 0.0391113H23.8112L23.8448 0C14.475 0 10.4354 1.69294 8.75922 9.93411L8.2452 12.169H3.50163L1.88133 19.7677H6.68636L0.903564 47.1451H11.6199L17.3971 19.7677H22.7396C19.9879 23.8455 18.7827 28.7257 18.7827 32.8307C18.7827 43.0888 25.9455 47.9609 35.2985 47.9609C44.6067 47.9609 50.3077 43.0581 53.2822 37.1995C53.273 37.41 53.2662 37.6205 53.2616 37.8312C53.2616 44.7147 56.9548 47.9609 63.3186 47.9609V48C69.2914 48 72.9007 45.469 75.1356 42.6754L74.1634 47.1452H84.6172L92.037 12.2082H81.3207L77.4096 30.5231C76.1078 36.7585 73.0572 39.8706 68.7718 39.8706C65.7882 39.8706 64.3578 38.1553 64.3578 34.8421C64.3898 33.3757 64.5866 31.9176 64.9445 30.4952L68.8556 12.1802H58.1392L55.7116 23.7473C54.5823 15.3008 47.9571 11.2751 39.4554 11.2751C33.5881 11.2751 29.1428 13.2165 25.9068 16.1158L26.7501 12.1802H19.023L19.347 10.4314C19.9952 7.76626 20.8388 7.5707 24.6717 7.5707H27.7223L29.3426 0.0391113ZM38.6732 19.5889C32.829 19.5889 29.8398 25.6231 29.8398 32.3111C29.8398 37.1831 31.9853 39.6471 35.9858 39.6471C41.83 39.6471 44.8192 33.6129 44.8192 26.9194C44.8192 22.0529 42.6737 19.5889 38.6732 19.5889Z"
        fill={primaryColor}
      />
      <path d="M247.028 0.0446956H257.739V47.1172H247.028V0.0446956Z" fill={primaryColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M227.763 18.3541C224.322 18.3541 221.919 20.1029 221.528 23.4831H211.771L206.325 47.1172H193.854L189.183 21.3377L184.507 47.1172H172.109L164.057 12.1802H175.031L179.64 35.8813L183.663 12.1802H194.703L198.793 35.8813L203.403 12.1802H214.376L212.788 19.0731C215.171 14.5144 220.757 11.0795 228.669 11.0795C238.67 11.0795 244.452 15.1023 244.251 25.7571L244.123 33.3502C244.061 37.8982 244.251 44.128 244.899 47.1172H234.384L234.256 42.8932C231.658 46.5975 227.501 47.9608 222.523 47.9608C215.902 47.9608 210.449 44.0498 210.449 37.7027C210.449 29.1318 220.126 26.2712 233.691 25.299V23.9357C233.691 19.8458 231.613 18.3485 227.786 18.3485L227.763 18.3541ZM226.422 40.6974C230.702 40.6974 233.954 38.8816 233.954 32.4562V31.5958C226.484 32.2439 221.483 33.2217 221.483 36.9204C221.483 39.1944 223.629 40.6862 226.422 40.6862V40.6974Z"
        fill={primaryColor}
      />
      <path d="M271.361 0.0446956H260.644V47.1172H271.361V0.0446956Z" fill={primaryColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M144.713 16.8567C147.049 13.9346 150.424 11.4706 156.268 11.4706C162.632 11.4706 166.325 14.7168 166.325 21.6617C166.29 23.629 166.052 25.5874 165.615 27.506L161.464 47.1451H150.748L154.659 28.9642C155.008 27.539 155.195 26.079 155.217 24.6118C155.217 21.3656 153.787 19.7453 150.804 19.7453C146.585 19.7453 143.467 22.7289 142.166 28.9642L138.255 47.1451H127.572L127.578 47.1172H120.89C114.012 47.1172 110.955 46.078 110.955 41.3344C110.997 39.9797 111.171 38.6323 111.475 37.3116L114.537 22.9915C113.318 22.7615 112.079 22.6529 110.838 22.6674C106.296 22.6674 103.111 24.2207 102.072 29.4224L98.306 47.1451H87.5953L94.9928 12.1858H105.385L104.038 18.5999C106.491 14.8341 110.447 11.7835 115.772 11.7835H116.923L118.878 2.62601H129.589L127.516 12.1746H134.992L137.567 0.0390929H148.284L144.713 16.8567ZM133.381 19.7677H125.89L122.577 35.4007C122.459 35.9784 122.393 36.5656 122.381 37.1551C122.381 38.9989 123.488 39.39 126.343 39.39H129.217L133.381 19.7677Z"
        fill={primaryColor}
      />
    </svg>
  </div>
)

export const LeftColumn = ({
  logoUrl,
  shopName,
  poweredBy,
  primaryColor,
  backgroundColor,
  fontFamily,
}: LeftColumnProps) => (
  <div
    style={{
      width: '50%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
    }}
  >
    <div
      style={{
        minHeight: '400px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '0 50px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',
        }}
      >
        <ShopLogo logoUrl={logoUrl} />
        <ShopInfo shopName={shopName} primaryColor={primaryColor} fontFamily={fontFamily} />
      </div>

      {poweredBy && (
        <div style={{ display: 'flex', flexShrink: 0, marginTop: '40px' }}>
          <PoweredBySection primaryColor={primaryColor} />
        </div>
      )}
    </div>
  </div>
)

export const RightColumn = ({ mainImage, backgroundColor }: RightColumnProps) => (
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
  </div>
)
