import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { commentsApi } from '../api/comments';
import { CommentsPage } from '../types/comments.interface';

const useGetComments = (postId: number, limit?: number) => {
   return useInfiniteQuery<
      CommentsPage,
      Error,
      InfiniteData<CommentsPage>,
      [string, number],
      string | undefined
   >({
      queryKey: ['comments', postId],
      queryFn: ({ pageParam }) =>
         commentsApi.getComments({
            postOrParentId: postId,
            cursor: pageParam,
            limit,
         }),
      getNextPageParam: (lastPage) => {
         return lastPage.nextCursor ?? undefined;
      },
      initialPageParam: undefined,
   });
};

export default useGetComments;
