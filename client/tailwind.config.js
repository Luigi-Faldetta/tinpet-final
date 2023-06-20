/** @type {import('tailwindcss').Config} */
// import { defineConfig } from "vite";

// export default defineConfig({
//   darkMode: false,
//   theme: {
//     extend: {},
//   },
//   variants: {
//     extend: {},
//   },
//   plugins: [daisyui],
// });

import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx,css}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
// module.exports = {
//   content: [
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
