/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        obs:     "#0A0A0F",
        obs2:    "#0F0F18",
        obs3:    "#141422",
        slate2:  "#1A1A2E",
        em:      "#00C896",
        em2:     "#00E5A8",
        em3:     "#00A87A",
        copper:  "#E8754A",
        copper2: "#F5956E",
        pearl:   "#F0EEE9",
        ghost:   "#E8E6E0",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body:    ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      animation: {
        "mesh-1":  "meshMove 12s ease-in-out infinite",
        "mesh-2":  "meshMove2 15s ease-in-out infinite",
        "float":   "float 6s ease-in-out infinite",
        "glow":    "glow 3s ease-in-out infinite",
        "shimmer": "shimmer 4s linear infinite",
      },
      keyframes: {
        meshMove:  { "0%,100%":{ transform:"translate(0%,0%) scale(1)" }, "33%":{ transform:"translate(3%,-2%) scale(1.05)" }, "66%":{ transform:"translate(-2%,3%) scale(0.97)" } },
        meshMove2: { "0%,100%":{ transform:"translate(0%,0%) scale(1)" }, "33%":{ transform:"translate(-4%,2%) scale(1.08)" }, "66%":{ transform:"translate(2%,-3%) scale(0.95)" } },
        float:     { "0%,100%":{ transform:"translateY(0)" }, "50%":{ transform:"translateY(-8px)" } },
        glow:      { "0%,100%":{ boxShadow:"0 0 20px rgba(0,200,150,0.2)" }, "50%":{ boxShadow:"0 0 40px rgba(0,200,150,0.5)" } },
        shimmer:   { "0%":{ backgroundPosition:"-200% center" }, "100%":{ backgroundPosition:"200% center" } },
      },
      boxShadow: {
        em:     "0 8px 40px rgba(0,200,150,0.3)",
        "em-lg":"0 12px 60px rgba(0,200,150,0.4)",
        copper: "0 8px 40px rgba(232,117,74,0.3)",
      },
    },
  },
  plugins: [],
};
