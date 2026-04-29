import { useInfiniteQuery } from '@tanstack/react-query';
import { feedApi } from '../api/feed';

type Options = {
   enabled?: boolean;
};

export const useGetProfileFeed = (
   username: string,
   targetProfileId: number,
   limit?: number,
   options?: Options
) => {
   return useInfiniteQuery({
      queryKey: ['posts', 'profile', username],
      queryFn: ({ pageParam }: { pageParam?: string }) =>
         feedApi.getProfilePosts({ targetProfileId, limit, cursor: pageParam }),
      getNextPageParam: (lastPage) => {
         return lastPage.nextCursor ?? undefined;
      },
      initialPageParam: undefined,
      enabled: options?.enabled ?? true,
   });
};
