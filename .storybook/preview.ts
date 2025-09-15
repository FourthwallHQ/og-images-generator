import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      defaultViewport: 'og',
      viewports: {
        og: {
          name: 'OG Image (1200x630)',
          styles: {
            width: '1200px',
            height: '630px',
          },
        },
      },
    },
    backgrounds: {
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'light', value: '#f5f5f5' },
        { name: 'dark', value: '#333333' },
      ],
    },
  },
}

export default preview