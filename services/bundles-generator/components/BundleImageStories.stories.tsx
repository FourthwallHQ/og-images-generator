import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { BundleGridComponent } from './BundleGridComponent'

const BundleImageWrapper = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      width: '768px',
      height: '1024px',
      border: '2px solid #333',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      position: 'relative',
      backgroundColor: '#f5f5f5',
    }}
  >
    <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
      <div style={{ width: '1536px', height: '2048px' }}>{children}</div>
    </div>
  </div>
)

const meta: Meta<typeof BundleGridComponent> = {
  title: 'Bundle Images/BundleGrid',
  component: BundleGridComponent,
  decorators: [
    (Story) => (
      <BundleImageWrapper>
        <Story />
      </BundleImageWrapper>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof BundleGridComponent>

const SAMPLE_URLS = [
  'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/14bbd894-30f5-452f-928a-86efe6919e4a.webp',
  'https://storage.googleapis.com/popshop-staging-orders-customizations-single/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/720dced4-a1bd-4b24-9842-2e31f316f8b7.webp',
  'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e97d3a33-477e-42da-ae4c-7fd90f1a7bdb.webp',
  'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/e1517ac2-88e2-4463-9ea0-9edb93d4d02c.webp',
  'https://cdn.staging.fourthwall.com/customizations/sh_5571d83e-a68b-40ae-a191-0659fb72a4e2/b9378402-27cf-4b5c-ac1c-bedd0ba43732.webp',
  'https://cdn.fourthwall.com/offer/sh_a770864c-ac52-45bc-9e66-4314ef3ef294/d7197c52-439b-49b0-849d-be8e8af89bd0.jpeg',
  'https://imgproxy.fourthwall.com/r-yJ8pEpHYH59oWrCVdxh7TrCvowgtK_LS1hxf9ccK0/w:720/sm:1/enc/o1mPzYDIvr-tFI0Z/PqsRrfFTXXwuGKr1.webp',
  'https://imgproxy.fourthwall.com/znUuftqVFCE6kJZU4wDvBffxOjHJwUrXna3-ydnMw3s/w:720/sm:1/enc/HF42bl3FbnmqoCWP/N8A99lNkB0Dvhrey.webp',
  'https://imgproxy.fourthwall.com/Eu01zG-aBTWT_defeLffOTmceu1_MpZaFELrLNYBtFA/w:900/sm:1/enc/tJ7CPaEJr5wrI1-j/rPnvBfFB8zmLXK15.webp',
  'https://imgproxy.fourthwall.com/7DpsLOnMjSLeapCYnDr_P7OgKp2gBikus0JJgfOgyJ4/w:900/sm:1/enc/TlrXGZrj-A-P0NHh.webp',
  'https://imgproxy.fourthwall.com/kS17RIRJZey84G8quR-VXjzeNy5i7kn-cVawSjzysUA/w:720/sm:1/enc/rHvy0V74qY_tKOiy.webp',
  'https://imgproxy.fourthwall.com/a1mt3Or3pPUwLBDyQgaPbZh8MC68XIUEXgGw2x8pyso/w:720/sm:1/enc/bexLTO-60ZQdS-u4.webp',
]

export const SingleProduct: Story = {
  args: {
    imageUrls: [SAMPLE_URLS[0]],
    imageAvailability: [true],
  },
}

export const TwoProducts: Story = {
  args: {
    imageUrls: SAMPLE_URLS.slice(0, 2),
    imageAvailability: [true, true],
  },
}

export const ThreeProducts: Story = {
  args: {
    imageUrls: SAMPLE_URLS.slice(0, 3),
    imageAvailability: [true, true, true],
  },
}

export const FourProducts: Story = {
  args: {
    imageUrls: SAMPLE_URLS.slice(0, 4),
    imageAvailability: [true, true, true, true],
  },
}

export const FiveProducts: Story = {
  args: {
    imageUrls: SAMPLE_URLS.slice(0, 5),
    imageAvailability: [true, true, true, true, true],
  },
}

export const MixedAvailability: Story = {
  args: {
    imageUrls: SAMPLE_URLS.slice(0, 5),
    imageAvailability: [true, false, true, true, false],
  },
  name: 'Mixed Available/Unavailable (5 products)',
}

export const AllUnavailable: Story = {
  args: {
    imageUrls: SAMPLE_URLS.slice(0, 4),
    imageAvailability: [false, false, false, false],
  },
  name: 'All Images Unavailable',
}