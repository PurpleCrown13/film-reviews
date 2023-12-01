const { nextui } = require("@nextui-org/react");


/** @type {import('tailwindcss').Config} */
module.exports = {
  // corePlugins: {
  //   preflight: false,
  // },
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "#0070F0",

          "secondary": "#9455D3",

          "accent": "#c149ad",

          "neutral": "#021431",

          "base-100": "#ffffff",

          "info": "#93e6fb",

          "success": "#18C964",

          "warning": "#F5A524",

          "error": "#e63946",
        },
      },
    ],
  },
  content: [
    "./index.html",
    "./src/*.{js,ts,jsx,tsx}",
    "./pages/*.{js,ts,jsx,tsx}",
    "./components/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [require('daisyui'), nextui(),],
}

// 