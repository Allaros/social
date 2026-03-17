import { useEffect, useState } from 'react';

export function useIsMobile(breakpoint: number = 768) {
   const [isMobile, setIsMobile] = useState<boolean>(() => {
      if (typeof window === 'undefined') return false;
      return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
   });

   useEffect(() => {
      const media = window.matchMedia(`(max-width: ${breakpoint}px)`);

      const listener = () => {
         setIsMobile(media.matches);
      };

      media.addEventListener('change', listener);

      return () => media.removeEventListener('change', listener);
   }, [breakpoint]);

   return isMobile;
}
