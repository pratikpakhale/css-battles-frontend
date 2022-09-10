module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#864879',
        secondary: '#1F1D36',
        tertiary: '#3F3351',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        code: ['IBM Plex Mono', 'monospace'],
      },
      borderWidth: {
        ccss: '20px',
        'ccss-sm': '10px',
      },
      spacing: {
        300: '300px',
        400: '400px',
        550: '550px',
      },
      fontWeight: {
        regular: '200',
        medium: '500',
      },
    },
  },
  plugins: [
    require('@shrutibalasa/tailwind-grid-auto-fit'),
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}
