import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { LogoCenteredComponent } from './LogoCenteredComponent'
import { OGImageWrapper } from './shared'

// Full Layout Component
interface FullLayoutProps {
  colorPalette?: { primaryColor: string; backgroundColor: string }
  logoUrl: string
  shopName: string
  poweredBy: boolean
  primaryColor?: string
  backgroundColor?: string
  fontFamily: string
  isLogoAvailable?: boolean
}

const FullLayout = ({
  colorPalette,
  logoUrl,
  shopName,
  poweredBy,
  primaryColor: customPrimaryColor,
  backgroundColor: customBackgroundColor,
  fontFamily,
  isLogoAvailable = true,
}: FullLayoutProps) => {
  // Use palette colors if provided, otherwise use custom colors
  const primaryColor = colorPalette?.primaryColor || customPrimaryColor || '#000000'
  const backgroundColor = colorPalette?.backgroundColor || customBackgroundColor || '#F5F5F5'

  return (
    <OGImageWrapper>
      <LogoCenteredComponent
        primaryColor={primaryColor}
        backgroundColor={backgroundColor}
        fontFamily={fontFamily}
        shopName={shopName}
        poweredBy={poweredBy}
        logoUrl={logoUrl}
        isLogoAvailable={isLogoAvailable}
      />
    </OGImageWrapper>
  )
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
  title: 'OG Image/Logo Centered',
  component: FullLayout,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'og',
    },
  },
  argTypes: {
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
    poweredBy: {
      control: { type: 'boolean' },
      description: 'Show "Powered by Fourthwall"',
    },
    isLogoAvailable: {
      control: { type: 'boolean' },
      description: 'Is logo available (false shows shop name instead)',
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
  },
} satisfies Meta<typeof FullLayout>

export default meta
type Story = StoryObj<typeof meta>

// Logo Centered with logo
export const WithLogo: Story = {
  args: {
    colorPalette: colorPalettes['Fourthwall Default'],
    shopName: 'Creator Store',
    logoUrl: 'https://sandbox-shop.fourthwall.com/platform/logo',
    poweredBy: true,
    isLogoAvailable: true,
    fontFamily: '"Nunito Sans", sans-serif',
  },
}

// Logo Centered without logo (shows shop name)
export const WithoutLogo: Story = {
  args: {
    colorPalette: colorPalettes['Ocean Blue'],
    shopName: 'Amazing Creator Shop',
    logoUrl: '',
    poweredBy: true,
    isLogoAvailable: false,
    fontFamily: '"Georgia", serif',
  },
}