import { InfiniteData } from '@tanstack/react-query';
import { CommentResponse, CommentsPage } from '../types/comments.interface';

export const addCommentToList = (
   data: InfiniteData<CommentsPage> | undefined,
   comment: CommentResponse,
   options?: {
      position?: 'start' | 'end';
      pageIndex?: number;
   }
): InfiniteData<CommentsPage> | undefined => {
   if (!data) return data;

   const position = options?.position ?? 'start';
   const pageIndex = options?.pageIndex ?? 0;

   return {
      ...data,
      pages: data.pages.map((page, idx) => {
         if (idx !== pageIndex) return page;

         const newData =
            position === 'start'
               ? [comment, ...page.data]
               : [...page.data, comment];

         return {
            ...page,
            data: newData,
         };
      }),
   };
};
