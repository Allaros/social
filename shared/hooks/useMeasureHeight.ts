import { useLayoutEffect, useRef, useState } from 'react';

function useMeasureHeight() {
   const ref = useRef<HTMLDivElement>(null);
   const [height, setHeight] = useState(0);

   useLayoutEffect(() => {
      if (!ref.current) return;

      const el = ref.current;

      const observer = new ResizeObserver(() => {
         setHeight(el.scrollHeight);
      });

      observer.observe(el);

      return () => observer.disconnect();
   }, []);

   return { ref, height };
}

export default useMeasureHeight;
