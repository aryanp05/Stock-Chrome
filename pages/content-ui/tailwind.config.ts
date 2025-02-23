import { type Config } from 'tailwindcss';

const config: Config = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        flyAcross: {
          '0%': { left: '50px' },
          '100%': { left: '110%' },
        },
      },
      animation: {
        fly: 'flyAcross 10s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
