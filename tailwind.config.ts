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
        "aec-navy": "#310c08",
        "aec-teal": "#0e7c7b",
        "aec-gold": "#c9a24b",
        "aec-cream": "#faf7f0",
        "aec-sand": "#f4eee1",
        "mentor-accent": "#5fcf80",
        "mentor-heading": "#37423b",
        "mentor-dark": "#060606",
        "mentor-light": "#f9f9f9",
      },
    },
  },
  plugins: [],
};
