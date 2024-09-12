import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0) translateY(0) translateX(0)', opacity: '0' },
          '25%': { transform: 'scale(1.2) translateY(-10px) translateX(-10px)', opacity: '1' },
          '50%': { transform: 'scale(1.1) translateY(-20px) translateX(10px)', opacity: '1' },
          '75%': { transform: 'scale(1) translateY(-30px) translateX(-10px)', opacity: '1' },
          '100%': { transform: 'scale(1) translateY(0) translateX(0)', opacity: '1' },
        },
        fadeOut: {
          '0%': { transform: 'translateY(0) translateX(0)', opacity: '1' },
          '25%': { transform: 'translateY(-10px) translateX(10px)', opacity: '0.9' },
          '50%': { transform: 'translateY(-20px) translateX(-10px)', opacity: '0.7' },
          '75%': { transform: 'translateY(-30px) translateX(10px)', opacity: '0.5' },
          '100%': { transform: 'translateY(-50px) translateX(-10px)', opacity: '0' },
        },
      },
      animation: {
        'bounce-in': 'bounceIn 0.5s ease-out forwards',
        'fade-out': 'fadeOut 0.5s ease-out forwards',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          dark: '#1281F9',
          main: '#3898FF',
          light1: '#AFD6FF',
          light2: '#EBF4FF',
        },
        sub: {
          pink: '#FF6795',
          orange: '#FF9C27',
          green: '#00AC9B',
          purple: '#8573F3',
          navy: '#252F46',
        },
        grayscale: {
          900: '#101223',
          800: '#404252',
          700: '#555D6B',
          600: '#7798D6',
          500: '#9496A1',
          400: '#B3B5BD',
          300: '#D2D4DA',
          200: '#E9E9ED',
          100: '#F3F4F8',
          50: '#F8FBFF',
        },
      },
      fontFamily: {
        sans: ['NotoSansKR', 'Arial', 'sans-serif'], // Pretendard를 기본 폰트로 설정
      },
      fontSize: {
        h1: ['30px', '140%'],
        h2: ['20px', '140%'],
        title1: ['17px', '140%'],
        subtitle1: ['15px', '140%'],
        subtitle2: ['14px', '140%'],
        body1: ['14px', '140%'],
        body2: ['14px', '140%'],
        body3: ['12px', '140%'],
        caption1: ['12px', '140%'],
        caption2: ['10px', '140%'],
      },
    },
  },

  plugins: [],
};
export default config;
