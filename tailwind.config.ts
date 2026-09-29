/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "aec-navy": "#0B1F3A",
        "aec-teal": "#0F766E",
        "aec-gold": "#0F766E",
        "aec-white": "#FFFFFF",
        "aec-black": "#000000",
        "aec-cream": "#F8FAFC",
        "aec-sand": "#F1F5F9",
        "mentor-accent": "#0F766E",
        "mentor-heading": "#0B1F3A",
        "mentor-dark": "#000000",
        "mentor-light": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
