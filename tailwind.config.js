/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    screens: {
      xsm: '360px',
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
      xxl: '1920px',
    },
    extend: {
      colors: {
        'brand-main': 'var(--brand-main)',
        'brand-light': 'var(--brand-light)',
        'brand-dark': 'var(--brand-dark)',
        'brand-hover': 'var(--brand-hover)',
        'brand-grey': 'var(--brand-grey)',
        success: 'var(--success)',
        error: 'var(--error)',
        'lime-500': '#84CC16',
        'lime-50': '#F7FEE7',
        'secondary-text': '#64748B',
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
