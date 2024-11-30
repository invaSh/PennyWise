/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        tektur: ["Tektur"],
        flex: ["Roboto Flex"],
        hat: ["Red Hat Display"],
        righteous: ["Righteous"],
      }
    },
  },
  plugins: [],
};
