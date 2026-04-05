import { useEffect, useRef } from 'react';

const LoadMoreTrigger = ({
   fetchNextPage,
   hasNextPage,
   isFetching,
}: {
   fetchNextPage: any;
   hasNextPage: boolean;
   isFetching: boolean;
}) => {
   const ref = useRef<HTMLDivElement | null>(null);

   useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
         if (entries[0].isIntersecting && hasNextPage && !isFetching) {
            fetchNextPage();
         }
      });

      if (ref.current) observer.observe(ref.current);

      return () => observer.disconnect();
   }, [hasNextPage, isFetching]);

   return <div ref={ref} style={{ height: 1 }} />;
};

export default LoadMoreTrigger;
