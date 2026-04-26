import { useInfiniteQuery } from '@tanstack/react-query';
import { feedApi } from '../api/feed';

export const useGetSavedFeed = (limit?: number) => {
   return useInfiniteQuery({
      queryKey: ['posts', 'saved'],
      queryFn: ({ pageParam }: { pageParam?: string }) =>
         feedApi.getSavedPosts({ limit, cursor: pageParam }),

      getNextPageParam: (lastPage) => {
         return lastPage.nextCursor ?? undefined;
      },

      initialPageParam: undefined,
   });
};
