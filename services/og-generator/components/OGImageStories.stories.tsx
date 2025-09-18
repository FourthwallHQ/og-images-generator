import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { ComingSoonComponent } from './ComingSoonComponent'
import { ComingSoonWithDateComponent } from './ComingSoonWithDateComponent'
import { EmptyShopComponent } from './EmptyShopComponent'
import { LiveWithProductsComponent } from './LiveWithProductsComponent'
import { LogoCenteredComponent } from './LogoCenteredComponent'
import { OGImageWrapper } from './shared'

// Helper function to format launch date for Storybook preview
const formatLaunchDate = (dateStr: string): string => {
  try {
    const date = new Date(dateStr)
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const day = date.getDate()
    
    // Add ordinal suffix (st, nd, rd, th)
    const getOrdinalSuffix = (day: number): string => {
      if (day > 3 && day < 21) return 'th'
      switch (day % 10) {
        case 1: return 'st'
        case 2: return 'nd'
        case 3: return 'rd'
        default: return 'th'
      }
    }
    
    return `Launching ${month} ${day}${getOrdinalSuffix(day)}`
  } catch {
    return `Launching ${dateStr}`
  }
}

// Full Layout Component
interface FullLayoutProps {
  strategy: 'COMING_SOON' | 'COMING_SOON_WITH_DATE' | 'EMPTY_SHOP' | 'LIVE_WITH_PRODUCTS' | 'LOGO_CENTERED'
  colorPalette?: { primaryColor: string; backgroundColor: string }
  logoUrl: string
  shopName: string
  siteUrl: string
  poweredBy: boolean
  primaryColor?: string
  backgroundColor?: string
  fontFamily: string
  launchDate?: string
  mainImage?: string
}

const FullLayout = ({
  strategy,
  colorPalette,
  logoUrl,
  shopName,
  siteUrl,
  poweredBy,
  primaryColor: customPrimaryColor,
  backgroundColor: customBackgroundColor,
  fontFamily,
  launchDate,
  mainImage,
}: FullLayoutProps) => {
  // Use palette colors if provided, otherwise use custom colors
  const primaryColor = colorPalette?.primaryColor || customPrimaryColor || '#000000'
  const backgroundColor = colorPalette?.backgroundColor || customBackgroundColor || '#F5F5F5'
  // Render appropriate component based on strategy, wrapped like ImageResponse
  const renderComponent = () => {
    switch (strategy) {
      case 'COMING_SOON':
        return (
          <ComingSoonComponent
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
            shopName={shopName}
            siteUrl={siteUrl}
            poweredBy={poweredBy}
            logoUrl={logoUrl}
          />
        )
      case 'COMING_SOON_WITH_DATE':
        return (
          <ComingSoonWithDateComponent
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
            shopName={shopName}
            siteUrl={siteUrl}
            poweredBy={poweredBy}
            logoUrl={logoUrl}
            launchDate={formatLaunchDate(launchDate || '2024-12-25')}
          />
        )
      case 'EMPTY_SHOP':
        return (
          <EmptyShopComponent
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
            shopName={shopName}
            siteUrl={siteUrl}
            logoUrl={logoUrl}
          />
        )
      case 'LIVE_WITH_PRODUCTS':
        return (
          <LiveWithProductsComponent
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
            shopName={shopName}
            siteUrl={siteUrl}
            poweredBy={poweredBy}
            logoUrl={logoUrl}
            mainImage={mainImage || ''}
          />
        )
      case 'LOGO_CENTERED':
        return (
          <LogoCenteredComponent
            primaryColor={primaryColor}
            backgroundColor={backgroundColor}
            fontFamily={fontFamily}
            shopName={shopName}
            siteUrl={siteUrl}
            poweredBy={poweredBy}
            logoUrl={logoUrl}
          />
        )
      default:
        return null
    }
  }

  return <OGImageWrapper>{renderComponent()}</OGImageWrapper>
}

// Color palettes
const colorPalettes = {
  'Fourthwall Default': {
    primaryColor: '#F9F6F0',
    backgroundColor: '#0B1B26',
  },
  'Ocean Blue': {
    primaryColor: '#1E3A8A',
    backgroundColor: '#EFF6FF',
  },
  'Forest Green': {
    primaryColor: '#14532D',
    backgroundColor: '#F0FDF4',
  },
  'Sunset Orange': {
    primaryColor: '#C2410C',
    backgroundColor: '#FFF7ED',
  },
  'Purple Dream': {
    primaryColor: '#6B21A8',
    backgroundColor: '#FAF5FF',
  },
  'Midnight Dark': {
    primaryColor: '#F3F4F6',
    backgroundColor: '#111827',
  },
  'Rose Gold': {
    primaryColor: '#BE185D',
    backgroundColor: '#FDF2F8',
  },
  'Teal Fresh': {
    primaryColor: '#0F766E',
    backgroundColor: '#F0FDFA',
  },
  Custom: {
    primaryColor: '#000000',
    backgroundColor: '#F5F5F5',
  },
}

const meta = {
  title: 'OG Image/Full Layouts',
  component: FullLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'og',
    },
  },
  argTypes: {
    strategy: {
      control: { type: 'select' },
      options: ['COMING_SOON', 'COMING_SOON_WITH_DATE', 'EMPTY_SHOP', 'LIVE_WITH_PRODUCTS', 'LOGO_CENTERED'],
      description: 'OG image strategy',
    },
    colorPalette: {
      control: { type: 'select' },
      options: Object.keys(colorPalettes),
      description: 'Color palette preset',
      mapping: colorPalettes,
    },
    logoUrl: {
      control: { type: 'text' },
      description: 'Shop logo URL',
    },
    shopName: {
      control: { type: 'text' },
      description: 'Shop name',
    },
    siteUrl: {
      control: { type: 'text' },
      description: 'Site URL (without https://)',
    },
    poweredBy: {
      control: { type: 'boolean' },
      description: 'Show "Powered by Fourthwall"',
    },
    primaryColor: {
      control: { type: 'color' },
      description: 'Primary text color (when Custom palette selected)',
      if: { arg: 'colorPalette', eq: colorPalettes['Custom'] },
    },
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color (when Custom palette selected)',
      if: { arg: 'colorPalette', eq: colorPalettes['Custom'] },
    },
    fontFamily: {
      control: { type: 'text' },
      description: 'Font family',
    },
    launchDate: {
      control: { type: 'text' },
      description: 'Launch date (for COMING_SOON_WITH_DATE)',
      if: { arg: 'strategy', eq: 'COMING_SOON_WITH_DATE' },
    },
    mainImage: {
      control: { type: 'text' },
      description: 'Product image URL (for LIVE_WITH_PRODUCTS)',
      if: { arg: 'strategy', eq: 'LIVE_WITH_PRODUCTS' },
    },
  },
} satisfies Meta<typeof FullLayout>

export default meta
type Story = StoryObj<typeof meta>

// Coming Soon Strategy
export const ComingSoon: Story = {
  args: {
    strategy: 'COMING_SOON',
    colorPalette: colorPalettes['Fourthwall Default'],
    shopName: 'Awesome Merch Store',
    siteUrl: 'awesome-merch.fourthwall.com',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    poweredBy: true,
    fontFamily: '"Nunito Sans", sans-serif',
  },
}

// Coming Soon with Date Strategy
export const ComingSoonWithDate: Story = {
  args: {
    strategy: 'COMING_SOON_WITH_DATE',
    colorPalette: colorPalettes['Fourthwall Default'],
    shopName: 'Epic Creators Shop',
    siteUrl: 'epic-creators.fourthwall.com',
    launchDate: '2024-12-25',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    poweredBy: true,
    fontFamily: '"Nunito Sans", sans-serif',
  },
}

// Empty Shop Strategy
export const EmptyShop: Story = {
  args: {
    strategy: 'EMPTY_SHOP',
    colorPalette: colorPalettes['Fourthwall Default'],
    shopName: 'New Creator Store',
    siteUrl: 'new-creator.fourthwall.com',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    poweredBy: false,
    fontFamily: '"Nunito Sans", sans-serif',
  },
}

// Live with Products Strategy
export const LiveWithProducts: Story = {
  args: {
    strategy: 'LIVE_WITH_PRODUCTS',
    colorPalette: colorPalettes['Fourthwall Default'],
    shopName: 'Premium Merch Hub',
    siteUrl: 'premium-merch.fourthwall.com',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    mainImage:
      'https://imgproxy.fourthwall.com/aCcIsLboesTA8clwEDOgt8BPwY7zwAzjpIMhus9bvvs/w:900/sm:1/enc/ap1S5lrqqHDKNFon/YPHQdEwufVPUPCtV/nFEC_GqkhcrVJotj/YPBL157OJjTlWqar/6JsSxpEvQ_lUR8vY/AtaPA4_cb4NVHNIp/M9t1PHzS_fMry4Xp/Mq98Uo_uKB-V0quh/xdz4l3HLWKVRn3d9/Yq4RlQSPUz8bWWsp/rGdBJQPIr29eZkhX/AEO3YQtaFejrL4q3/Q2n9vr5ahpXCT9cQ/L075yKoYI8vqFKCU/fyQuxB9mS6k',
    poweredBy: true,
    fontFamily: '"Nunito Sans", sans-serif',
  },
}

// Logo Centered Strategy
export const LogoCentered: Story = {
  args: {
    strategy: 'LOGO_CENTERED',
    colorPalette: colorPalettes['Fourthwall Default'],
    shopName: 'Creator Store',
    siteUrl: 'creator.fourthwall.com',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    poweredBy: true,
    fontFamily: '"Nunito Sans", sans-serif',
  },
}
