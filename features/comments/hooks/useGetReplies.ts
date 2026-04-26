import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { commentsApi } from '../api/comments';
import { CommentsPage } from '../types/comments.interface';

export const useGetReplies = (
   parentId: number,
   limit = 5,
   isOpen: boolean = true
) => {
   return useInfiniteQuery<
      CommentsPage,
      Error,
      InfiniteData<CommentsPage>,
      [string, number],
      string | undefined
   >({
      queryKey: ['replies', parentId],
      queryFn: ({ pageParam }) =>
         commentsApi.getReplies({
            postOrParentId: parentId,
            cursor: pageParam,
            limit,
         }),
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      initialPageParam: undefined,
      enabled: !!parentId && isOpen,
   });
};
