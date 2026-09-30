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
        "aec-teal": "#4DA3D9",
        "aec-gold": "#4DA3D9",
        "aec-sky": "#4DA3D9",
        "aec-skyblue": "#4DA3D9",
        "aec-lightblue": "#EAF5FC",
        "aec-white": "#FFFFFF",
        "aec-black": "#000000",
        "aec-cream": "#EAF5FC",
        "aec-sand": "#EAF5FC",
        "mentor-accent": "#4DA3D9",
        "mentor-heading": "#0B1F3A",
        "mentor-dark": "#000000",
        "mentor-light": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
