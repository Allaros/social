import { useInfiniteQuery } from '@tanstack/react-query';
import { feedApi } from '../api/feed';

export const useGetFeed = (limit: number = 10) => {
   return useInfiniteQuery({
      queryKey: ['feed'],
      queryFn: ({ pageParam }: { pageParam?: string }) =>
         feedApi.getPosts({ limit, cursor: pageParam }),

      getNextPageParam: (lastPage) => {
         return lastPage.nextCursor ?? undefined;
      },

      initialPageParam: undefined,
   });
};
