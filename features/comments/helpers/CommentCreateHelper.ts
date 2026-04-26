import { QueryClient, InfiniteData } from '@tanstack/react-query';
import { CommentsPage, CommentResponse } from '../types/comments.interface';
import { optimisticUpdatePosts } from '@/features/post/helpers/post-optimistic-update';
import { addCommentToList } from './AddCommentToList';
import { updateCommentInPages } from './UpdateCommentInPage';

type Snapshot = [readonly unknown[], unknown];

export const optimisticCreateComment = async ({
   queryClient,
   variables,
   tempComment,
}: {
   queryClient: QueryClient;
   variables: {
      postId: number;
      parentId?: number | null;
      replyOnId?: number | null;
   };
   tempComment: CommentResponse;
}) => {
   const { postId, parentId } = variables;

   await Promise.all([
      queryClient.cancelQueries({ queryKey: ['comments'] }),
      queryClient.cancelQueries({ queryKey: ['replies'] }),
   ]);

   const commentSnapshots: Snapshot[] = [
      ...queryClient.getQueriesData({ queryKey: ['comments'] }),
      ...queryClient.getQueriesData({ queryKey: ['replies'] }),
   ];

   const isRoot = !parentId;

   const postsContext = await optimisticUpdatePosts({
      queryClient,
      postId,
      updater: (post: any) => ({
         ...post,
         commentsCount: isRoot ? post.commentsCount + 1 : post.commentsCount,
      }),
   });

   const targetKey = isRoot ? ['comments', postId] : ['replies', parentId!];

   const position = isRoot ? 'start' : 'end';

   queryClient.setQueryData(
      targetKey,
      (old: InfiniteData<CommentsPage> | undefined) =>
         addCommentToList(old, tempComment, { position })
   );

   if (!isRoot) {
      queryClient.setQueriesData(
         { queryKey: ['comments'] },
         (old: InfiniteData<CommentsPage> | undefined) =>
            updateCommentInPages(old, parentId!, (c) => ({
               ...c,
               repliesCount: (c.repliesCount ?? 0) + 1,
            }))
      );
   }

   return {
      commentSnapshots,
      postsPreviousData: postsContext.previousData,
   };
};

export const rollbackCreateComment = (
   queryClient: QueryClient,
   context?: {
      commentSnapshots?: Snapshot[];
      postsPreviousData?: [readonly unknown[], unknown][];
   }
) => {
   context?.commentSnapshots?.forEach(([key, data]) => {
      queryClient.setQueryData(key, data);
   });

   if (context?.postsPreviousData) {
      for (const [key, data] of context.postsPreviousData) {
         queryClient.setQueryData(key, data);
      }
   }
};
