import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { lenisInstance } from '@/shared/lib/lenis';

export const useLenisInstance = () => {
   const [lenis, setLenisState] = useState<Lenis | null>(lenisInstance);

   useEffect(() => {
      if (lenisInstance) {
         setLenisState(lenisInstance);
         return;
      }

      const interval = setInterval(() => {
         if (lenisInstance) {
            setLenisState(lenisInstance);
            clearInterval(interval);
         }
      }, 50);

      return () => clearInterval(interval);
   }, []);

   return lenis;
};
