import type { Config } from 'tailwindcss';

const config: Config = {
   content: [
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
   ],
   theme: {
      extend: {
         colors: {
            primary: {
               900: '#4C68D5',
               800: '#6174D9',
               700: '#7381DD',
               600: '#858EE1',
               500: '#959CE5',
               400: '#A5A9E9',
               300: '#B4B7ED',
               200: '#C3C5F1',
               100: '#E1E2F8',
            },
            neutralBlack: {
               900: '#0C1024',
               850: '#1A2338',
               800: '#27364B',
               700: '#39465A',
               600: '#4B5669',
               500: '#5D6778',
               400: '#707988',
               300: '#838B98',
               200: '#979DA9',
               100: '#ABB0B9',
            },
            neutralWhite: {
               500: '#E2E8F0',
               400: '#ECF0F5',
               300: '#F1F4F9',
               250: '#F6F8FC',
               200: '#FAFBFF',
               100: '#FFFFFF',
            },
            danger: {
               900: '#B81616',
               800: '#C23729',
               700: '#CC4F3C',
               600: '#D46450',
               500: '#DD7864',
               400: '#E48B78',
               300: '#EB9F8E',
               200: '#F5C5BA',
               100: '#FAD8D0',
            },
            success: {
               900: '#036B30',
               800: '#2A7841',
               700: '#428553',
               600: '#589264',
               500: '#6DA076',
               400: '#81AD89',
               300: '#96BA9C',
               200: '#BFD6C2',
               100: '#D4E3D6',
            },
            warning: {
               900: '#E4A704',
               800: '#E8AF2F',
               700: '#EDB648',
               600: '#F0BE5E',
               500: '#F4C673',
               400: '#F7CE87',
               300: '#F9D69B',
               200: '#FCDEAF',
               100: '#FEEED7',
            },
         },
         keyframes: {
            'accordion-down': {
               from: { height: '0' },
               to: { height: 'var(--radix-accordion-content-height)' },
            },
            'accordion-up': {
               from: { height: 'var(--radix-accordion-content-height)' },
               to: { height: '0' },
            },
         },

         animation: {
            'accordion-down': 'accordion-down 0.4s ease-out',
            'accordion-up': 'accordion-up 0.4s ease-out',
         },
         fontFamily: {
            inter: ['var(--font-inter)', 'sans-serif'],
            manrope: ['var(--font-manrope)', 'sans-serif'],
         },
      },
   },
   plugins: [],
};

export default config;
