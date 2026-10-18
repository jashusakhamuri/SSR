/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Luxury Artisan Palette
        brand: {
          crimson: '#8B1E1E',      // Deep royal terracotta red
          'crimson-dark': '#6B1313',
          saffron: '#C89B3C',      // Metallic warm saffron gold
          'saffron-light': '#E5C07B',
          terracotta: '#B85C37',
          cardamom: '#3B552B',
          alabaster: '#FBF8F3',    // Warm luxury off-white
          cream: '#FFFDF9',
          dark: '#1C120F',
          muted: '#6B5852',
        },
        // Backwards compatibility colors
        chilli:  { DEFAULT: '#8B1E1E', dark: '#6B1313', light: '#A82D2D' },
        turmeric: { DEFAULT: '#C89B3C', dark: '#A67B22', light: '#E5C07B' },
        earth:   { DEFAULT: '#3A251E', dark: '#1C120F', light: '#6B5852', beige: '#F2ECE4' },
        leaf:    { DEFAULT: '#3B552B', dark: '#283B1E', light: '#50723C' },
        cream:   { DEFAULT: '#FBF8F3', dark: '#F2ECE4', light: '#FFFDF9' },
      },
      fontFamily: {
        playfair:    ['"Playfair Display"', 'serif'],
        cormorant:   ['"Cormorant Garamond"', 'serif'],
        sans:        ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        luxury:        '0 20px 50px rgba(28, 18, 15, 0.08)',
        'luxury-hover': '0 30px 60px rgba(139, 30, 30, 0.16)',
        glass:         '0 8px 32px 0 rgba(28, 18, 15, 0.12)',
      },
      scale: { 105: '1.05', 108: '1.08' },
      transitionDuration: { 400: '400ms' },
    },
  },
  plugins: [],
}
