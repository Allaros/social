import Lenis from 'lenis';

// lenis.ts
export let lenisInstance: Lenis | null = null;

export const setLenis = (lenis: Lenis) => {
   lenisInstance = lenis;
};
