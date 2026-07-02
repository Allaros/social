import { RefObject, useCallback, useEffect, useRef } from 'react';

type UseMessagesPaginationParams = {
   containerRef: RefObject<HTMLDivElement | null>;

   hasNextPage: boolean;
   isFetching: boolean;

   fetchNextPage: () => Promise<unknown>;

   savePosition: () => void;
   restorePosition: () => void;

   initialScrollCompleted: boolean;

   threshold?: number;
};

export const useMessagesPagination = ({
   containerRef,

   hasNextPage,
   isFetching,

   fetchNextPage,

   savePosition,
   restorePosition,

   initialScrollCompleted,

   threshold = 200,
}: UseMessagesPaginationParams) => {
   const pendingRestore = useRef(false);

   const loadMore = useCallback(async () => {
      if (!hasNextPage || isFetching) {
         return;
      }

      savePosition();

      pendingRestore.current = true;

      await fetchNextPage();
   }, [fetchNextPage, hasNextPage, isFetching, savePosition]);

   useEffect(() => {
      if (!pendingRestore.current) {
         return;
      }

      if (isFetching) {
         return;
      }

      requestAnimationFrame(() => {
         restorePosition();

         pendingRestore.current = false;
      });
   }, [isFetching, restorePosition]);

   useEffect(() => {
      const container = containerRef.current;

      if (!container) {
         return;
      }

      const handleScroll = () => {
         if (
            container.scrollTop > threshold ||
            isFetching ||
            !hasNextPage ||
            !initialScrollCompleted
         ) {
            return;
         }

         void loadMore();
      };

      container.addEventListener('scroll', handleScroll);

      return () => {
         container.removeEventListener('scroll', handleScroll);
      };
   }, [
      containerRef,
      threshold,
      hasNextPage,
      isFetching,
      loadMore,
      initialScrollCompleted,
   ]);

   return {
      loadMore,
   };
};
