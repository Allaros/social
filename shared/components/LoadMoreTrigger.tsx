import { useEffect, useRef } from 'react';

type Props = {
   fetchNextPage: () => Promise<unknown>;
   hasNextPage?: boolean;
   isFetching?: boolean;
   root?: HTMLElement | null;
   rootMargin?: string;
};

const LoadMoreTrigger = ({
   fetchNextPage,
   hasNextPage = false,
   isFetching = false,
   root = null,
   rootMargin = '150px',
}: Props) => {
   const ref = useRef<HTMLDivElement | null>(null);
   const lockRef = useRef(false);

   useEffect(() => {
      const node = ref.current;
      if (!node) return;

      const observer = new IntersectionObserver(
         (entries) => {
            const entry = entries[0];

            if (!entry.isIntersecting) return;
            if (!hasNextPage || isFetching || lockRef.current) return;

            lockRef.current = true;

            fetchNextPage().finally(() => {
               lockRef.current = false;
            });
         },
         {
            root, // 💥 ключевая часть
            rootMargin,
         }
      );

      observer.observe(node);

      return () => observer.disconnect();
   }, [fetchNextPage, hasNextPage, isFetching, root, rootMargin]);

   return <div ref={ref} style={{ height: 1 }} />;
};

export default LoadMoreTrigger;
