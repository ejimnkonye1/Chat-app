export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nightowl: {
          background: '#011627',  // Dark background
          chatBackground: '#0d1b2a',  // Slightly lighter for chat area
          text: '#d6deeb',  // Light blue for general text
          blue: '#82aaff',  // Accent blue
          green: '#22da6e',  // Accent green
          pink: '#c792ea',  // Accent pink
          yellow: '#ecc48d',  // Accent yellow
          red: '#ef5350',  // Error or alert color
          cyan: '#7fdbca',  // Secondary accent
          bubbleBackground: '#132237',  // Background for chat bubbles
          userText: '#ffffff',  // Text for user messages
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],  // Clean, modern font
        mono: ['Fira Code', 'monospace'],  // For code blocks if needed
      },
      fontSize: {
        xs: '0.75rem',   // Timestamps
        sm: '0.875rem',  // System messages
        base: '1rem',    // Main chat text
        lg: '1.125rem',  // Chat headers
      },
      spacing: {
        1: '0.25rem',
        2: '0.5rem',
        4: '1rem',
        6: '1.5rem',
        8: '2rem',
      },
      borderRadius: {
        chatBubble: '1rem',  // Rounded corners for chat bubbles
      },
      boxShadow: {
        bubble: '0 2px 8px rgba(0, 0, 0, 0.25)',  // Subtle shadow for chat bubbles
      },
    },
  },
  plugins: [],
}
