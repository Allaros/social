import { RefObject, useEffect, useRef } from 'react';
import { useAddView } from '../hooks/useAddView';

const ViewTracker = ({
   postId,
   viewedRef,
   delay = 5000,
}: {
   postId: number;
   viewedRef: RefObject<boolean>;
   delay?: number;
}) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const timerRef = useRef<NodeJS.Timeout | null>(null);

   const { mutate } = useAddView();

   useEffect(() => {
      if (!ref.current) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            if (viewedRef.current) return;

            if (entry.intersectionRatio >= 0.6) {
               timerRef.current = setTimeout(() => {
                  if (viewedRef.current) return;

                  mutate(postId);
                  viewedRef.current = true;
               }, delay);
            } else {
               if (timerRef.current) {
                  clearTimeout(timerRef.current);
               }
            }
         },
         {
            threshold: [0.6],
         }
      );

      observer.observe(ref.current);

      return () => {
         observer.disconnect();
         if (timerRef.current) clearTimeout(timerRef.current);
      };
   }, [postId, delay, mutate]);

   return <div ref={ref} className="w-full h-px" />;
};

export default ViewTracker;
