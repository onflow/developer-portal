import React from 'react';
import '../styles/tailwind.css';

export const parameters = {
  layout: 'fullscreen',
  themes: {
    clearable: false,
    list: [
      {
        name: 'light',
        class: [],
        color: '#ffffff',
        default: true,
      },
      {
        name: 'dark',
        class: ['dark'],
        color: '#000000',
      },
    ],
  },
  viewport: {
    viewports: {
      xs: {
        name: 'xs',
        styles: {
          width: '360px',
          height: '667px',
        },
      },
      sm: {
        name: 'sm',
        styles: {
          width: '375px',
          height: '667px',
        },
      },
      md: {
        name: 'md',
        styles: {
          width: '768px',
          height: '1024px',
        },
      },
      lg: {
        name: 'lg',
        styles: {
          width: '1440px',
          height: '900px',
        },
      },
      xl: {
        name: 'xl',
        styles: {
          width: '1536px',
          height: '1440px',
        },
      },
    },
  },
};

export const decorators = [
  (Story) => (
    <div
      className="text-gray-900 bg-white dark:bg-black dark:text-gray-200"
      style={{ height: '100%', minHeight: '100vh', padding: '1rem' }}
    >
      <Story />
    </div>
  ),
];
