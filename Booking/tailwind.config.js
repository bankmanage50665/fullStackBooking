module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this based on your project structure
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37", // Gold color
        },
        "gray-900": "#1A1A1A", // Dark gray background
        "gray-800": "#2B2B2B", // Slightly lighter gray for gradient
      },
    },
  },
  plugins: [],
};
