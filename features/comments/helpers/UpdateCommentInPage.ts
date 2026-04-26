import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { CommentResponse, CommentsPage } from '../types/comments.interface';

export const updateCommentInPages = (
   data: InfiniteData<CommentsPage> | undefined,
   commentId: number,
   updater: (comment: CommentResponse) => CommentResponse
): InfiniteData<CommentsPage> | undefined => {
   if (!data) return data;

   return {
      ...data,
      pages: data.pages.map((page) => ({
         ...page,

         data: page.data.map((c) => (c.id === commentId ? updater(c) : c)),

         replies: Object.fromEntries(
            Object.entries(page.replies ?? {}).map(([key, comments]) => [
               key,
               (comments ?? []).map((c) =>
                  c.id === commentId ? updater(c) : c
               ),
            ])
         ),
      })),
   };
};

export const updateCommentInAllCaches = (
   queryClient: QueryClient,
   commentId: number,
   updater: (c: CommentResponse) => CommentResponse
) => {
   const apply = (old: InfiniteData<CommentsPage> | undefined) =>
      updateCommentInPages(old, commentId, updater);

   queryClient.setQueriesData({ queryKey: ['comments'] }, apply);

   queryClient.setQueriesData({ queryKey: ['replies'] }, apply);
};
