import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CommentsPage } from '../types/comments.interface';
type Snapshot = [readonly unknown[], InfiniteData<CommentsPage> | undefined];

export const snapshotCommentCaches = (queryClient: QueryClient): Snapshot[] => {
   return [
      ...queryClient.getQueriesData<InfiniteData<CommentsPage>>({
         queryKey: ['comments'],
      }),
      ...queryClient.getQueriesData<InfiniteData<CommentsPage>>({
         queryKey: ['replies'],
      }),
   ];
};

export const restoreCommentCaches = (
   queryClient: QueryClient,
   snapshots: Snapshot[]
) => {
   snapshots.forEach(([key, data]) => {
      queryClient.setQueryData(key, data);
   });
};
