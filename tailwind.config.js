module.exports = {
  mode: "jit",
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,html,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,html,mdx}",
  ],
  darkMode: "class",
  theme: {
    screens: {
      md: { max: "1050px" },
      sm: { max: "550px" },
      lg: { min: "1051px" },
    },
    extend: {
      colors: {
        amber: {
          a400: "var(--amber_a400)",
          a400_00: "var(--amber_a400_00)",
          a400_01: "var(--amber_a400_01)",
        },
        chess_gold: "#FACC00", // The bright yellow color visible in the image
        chess_dark: "#0D0404",
        black: {
          900: "var(--black_900)",
          "900_00": "var(--black_900_00)",
          "900_01": "var(--black_900_01)",
          "900_02": "var(--black_900_02)",
          "900_26": "var(--black_900_26)",
          "900_3f": "var(--black_900_3f)",
          "900_a5": "var(--black_900_a5)",
          "900_bf": "var(--black_900_bf)",
        },
        blue: { a700: "var(--blue_a700)" },
        blue_gray: {
          100: "var(--blue_gray_100)",
          400: "var(--blue_gray_400)",
          800: "var(--blue_gray_800)",
          "400_59": "var(--blue_gray_400_59)",
          "700_7f": "var(--blue_gray_700_7f)",
        },
        cyan: { "400_26": "var(--cyan_400_26)" },
        deep_purple: {
          200: "var(--deep_purple_200)",
          700: "var(--deep_purple_700)",
          a100: "var(--deep_purple_a100)",
          a100_01: "var(--deep_purple_a100_01)",
          a200_26: "var(--deep_purple_a200_26)",
        },
        gray: {
          50: "var(--gray_50)",
          200: "var(--gray_200)",
          500: "var(--gray_500)",
          "400_7f": "var(--gray_400_7f)",
          "400_a5": "var(--gray_400_a5)",
          "500_01": "var(--gray_500_01)",
        },
        indigo: { 50: "var(--indigo_50)" },
        light_blue: { 600: "var(--light_blue_600)" },
        light_green: {
          600: "var(--light_green_600)",
          700: "var(--light_green_700)",
        },
        red: { 400: "var(--red_400)", 600: "var(--red_600)" },
        teal: {
          300: "var(--teal_300)",
          "300_01": "var(--teal_300_01)",
          "300_26": "var(--teal_300_26)",
        },
        white: {
          a700: "var(--white_a700)",
          a700_33: "var(--white_a700_33)",
          a700_bf: "var(--white_a700_bf)",
        },
        yellow: {
          800: "var(--yellow_800)",
          900: "var(--yellow_900)",
          "800_01": "var(--yellow_800_01)",
          "800_26": "var(--yellow_800_26)",
        },
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(5%)" },
        },
      },
      animation: {
        marquee: "marquee 25s linear infinite",
      },
      boxShadow: {
        xs: "0 40px 143px 0 #000f2026",
        sm: "0 3.08px 3px 0 #0000003f",
      },
      fontFamily: {
        quicksand: "Quicksand",
        nunitosans: "Nunito Sans",
        poppins: "Poppins",
      },
      backgroundImage: {
        gradient: "linear-gradient(270deg, #0d040400,#0d0404)",
        gradient1: "linear-gradient(90deg, #f1c50200,#f1c502)",
        gradient2:
          "radial-gradient(163deg, #a6a6a6,#aaaaaa,#cecece,#e9e9e9,#f9f9f9,#ffffff)",
        customgradient: "linear-gradient(180deg, #FACC00 0%, #FACC00 100%)",
        herogradient: "linear-gradient(90deg, #FACC00 0%, #FACC00 100%)",
      },
      textShadow: { ts: "0px 3.08px 3px #0000003f" },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
