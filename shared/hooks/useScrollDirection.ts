import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export const useScrollDirection = (lenis: Lenis | null) => {
   const [direction, setDirection] = useState<'up' | 'down'>('up');

   useEffect(() => {
      let last = 0;
      let timeout: NodeJS.Timeout | null = null;

      const handle = (scroll: number) => {
         if (timeout) clearTimeout(timeout);

         timeout = setTimeout(() => {
            const diff = scroll - last;

            if (Math.abs(diff) < 5) return;

            if (scroll < 50) {
               setDirection('up');
            } else {
               setDirection(diff > 0 ? 'down' : 'up');
            }

            last = scroll;
         }, 20);
      };

      if (lenis) {
         const handler = ({ scroll }: { scroll: number }) => handle(scroll);

         lenis.on('scroll', handler);

         return () => {
            lenis.off('scroll', handler);
            if (timeout) clearTimeout(timeout);
         };
      }

      const onScroll = () => handle(window.scrollY);

      window.addEventListener('scroll', onScroll);

      return () => {
         window.removeEventListener('scroll', onScroll);
         if (timeout) clearTimeout(timeout);
      };
   }, [lenis]);

   return direction;
};
