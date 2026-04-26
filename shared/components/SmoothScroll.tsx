'use client';

import Lenis from 'lenis';
import { useEffect, useRef } from 'react';

export default function SmoothScroll() {
   const lenisRef = useRef<Lenis | null>(null);

   useEffect(() => {
      const lenis = new Lenis({
         duration: 1.2,
         smoothWheel: true,
         allowNestedScroll: true,
      });

      lenisRef.current = lenis;

      function raf(time: number) {
         lenis.raf(time);
         requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);

      const observer = new MutationObserver(() => {
         const isLocked =
            document.body.getAttribute('data-scroll-locked') === '1';

         if (isLocked) {
            lenis.stop();
         } else {
            lenis.start();
         }
      });

      observer.observe(document.body, {
         attributes: true,
         attributeFilter: ['data-scroll-locked'],
      });

      return () => {
         observer.disconnect();
         lenis.destroy();
      };
   }, []);

   return null;
}
