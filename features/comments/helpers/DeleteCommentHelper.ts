import { QueryClient, InfiniteData } from '@tanstack/react-query';
import { CommentsPage } from '../types/comments.interface';
import {
   restoreCommentCaches,
   snapshotCommentCaches,
} from './OptimisticRollback';
import {
   optimisticUpdatePosts,
   rollbackPosts,
} from '@/features/post/helpers/post-optimistic-update';
import { updateCommentInPages } from './UpdateCommentInPage';
import { removeCommentFromPage } from './RemoveCommentInPage';

export const optimisticDeleteComment = async ({
   queryClient,
   commentId,
   repliesCount,
   postId,
   parentId,
}: {
   queryClient: QueryClient;
   commentId: number;
   repliesCount: number;
   postId: number;
   parentId?: number | null;
}) => {
   await Promise.all([
      queryClient.cancelQueries({ queryKey: ['comments'] }),
      queryClient.cancelQueries({ queryKey: ['replies'] }),
   ]);

   const commentSnapshots = snapshotCommentCaches(queryClient);

   const isRoot = !parentId;
   const isSoft = repliesCount > 0;

   const postsContext = await optimisticUpdatePosts({
      queryClient,
      postId,
      updater: (post: any) => ({
         ...post,
         commentsCount:
            isRoot && !isSoft
               ? Math.max(0, post.commentsCount - 1)
               : post.commentsCount,
      }),
   });

   const updater = (old: InfiniteData<CommentsPage> | undefined) => {
      if (!old) return old;

      if (isSoft) {
         return updateCommentInPages(old, commentId, (c) => ({
            ...c,
            content: 'Комментарий удалён',
            isDeleted: true,
         }));
      }

      return removeCommentFromPage(old, commentId);
   };

   queryClient.setQueriesData({ queryKey: ['comments'] }, updater);
   queryClient.setQueriesData({ queryKey: ['replies'] }, updater);

   if (parentId) {
      queryClient.setQueriesData(
         { queryKey: ['comments'] },
         (old: InfiniteData<CommentsPage> | undefined) =>
            updateCommentInPages(old, parentId, (c) => ({
               ...c,
               repliesCount: Math.max(0, (c.repliesCount ?? 0) - 1),
            }))
      );
   }

   return {
      commentSnapshots,
      postsPreviousData: postsContext.previousData,
   };
};

type Snapshot = [readonly unknown[], InfiniteData<CommentsPage> | undefined];

export const rollbackDeleteComment = (
   queryClient: QueryClient,
   context?: {
      commentSnapshots?: Snapshot[];
      postsPreviousData?: [readonly unknown[], unknown][];
   }
) => {
   if (context?.commentSnapshots) {
      restoreCommentCaches(queryClient, context.commentSnapshots);
   }

   if (context?.postsPreviousData) {
      rollbackPosts(queryClient, context.postsPreviousData);
   }
};
