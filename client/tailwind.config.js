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
  content: ["./src/**/*.{html,ts,tsx,js,jsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
