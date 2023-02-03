/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    colors: {
      'brand-main': 'var(--brand-main)',
      'brand-light': 'var(--brand-light)',
      'brand-dark': 'var(--brand-dark)',
      'brand-hover': 'var(--brand-hover)',
      'brand-grey': 'var(--brand-grey)',
      success: 'var(--success)',
      error: 'var(--error)',
    },
    extend: {},
  },
  plugins: [require('flowbite/plugin')],
};
