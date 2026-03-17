'use client';

import { useEffect } from 'react';

export default function GlobalDropHandler() {
   useEffect(() => {
      const preventDefault = (e: DragEvent) => {
         e.preventDefault();
      };

      window.addEventListener('dragover', preventDefault);
      window.addEventListener('drop', preventDefault);

      return () => {
         window.removeEventListener('dragover', preventDefault);
         window.removeEventListener('drop', preventDefault);
      };
   }, []);

   return null;
}
