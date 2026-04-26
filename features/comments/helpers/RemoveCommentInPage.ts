import { InfiniteData } from '@tanstack/react-query';
import { CommentsPage } from '../types/comments.interface';

export const removeCommentFromPage = (
   data: InfiniteData<CommentsPage> | undefined,
   commentId: number
): InfiniteData<CommentsPage> | undefined => {
   if (!data?.pages) return data;

   return {
      ...data,
      pages: data.pages.map((page) => {
         const safeReplies =
            page.replies && typeof page.replies === 'object'
               ? page.replies
               : {};

         return {
            ...page,
            data: (page.data ?? []).filter((c) => c.id !== commentId),
            replies: Object.fromEntries(
               Object.entries(safeReplies).map(([key, comments]) => [
                  key,
                  (comments ?? []).filter((c) => c.id !== commentId),
               ])
            ),
         };
      }),
   };
};
