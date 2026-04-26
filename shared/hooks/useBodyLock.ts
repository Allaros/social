import { useEffect } from 'react';

function useBodyLock(active: boolean) {
   useEffect(() => {
      if (!active) return;

      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      return () => {
         document.body.style.overflow = original;
      };
   }, [active]);
}

export default useBodyLock;
