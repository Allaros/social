import {
   InfiniteData,
   useMutation,
   useQueryClient,
} from '@tanstack/react-query';
import { commentsApi } from '../api/comments';
import { toast } from 'sonner';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { CommentsPage } from '../types/comments.interface';

export const useEditComment = (postId: number) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ commentId, body }: { commentId: number; body: string }) =>
         commentsApi.editComment({ body, commentId, postId }),

      onMutate: async ({ commentId, body }) => {
         await queryClient.cancelQueries({ queryKey: ['comments', postId] });

         const previousData = queryClient.getQueryData(['comments', postId]);

         queryClient.setQueryData(
            ['comments', postId],
            (oldData: InfiniteData<CommentsPage> | undefined) => {
               if (!oldData) return oldData;

               return {
                  ...oldData,
                  pages: oldData.pages.map((page: CommentsPage) => {
                     const updatedData = page.data.map((comment) =>
                        comment.id === commentId
                           ? { ...comment, content: body, isEdited: true }
                           : comment
                     );

                     const updatedReplies: Record<number, any> = {};

                     Object.entries(page.replies).forEach(([key, comments]) => {
                        const parentId = Number(key);

                        updatedReplies[parentId] = comments.map((comment) =>
                           comment.id === commentId
                              ? { ...comment, content: body, isEdited: true }
                              : comment
                        );
                     });

                     return {
                        ...page,
                        data: updatedData,
                        replies: updatedReplies,
                     };
                  }),
               };
            }
         );

         return { previousData };
      },

      onSuccess: () => {
         toast('Комментарий успешно изменен');
      },

      onError: (err, _variables, context) => {
         if (context?.previousData) {
            queryClient.setQueryData(
               ['comments', postId],
               context.previousData
            );
         }

         const error = normalizeApiError(err);
         toast.error(error.message);
      },
      onSettled: () => {
         queryClient.invalidateQueries({
            queryKey: ['comments', postId],
         });
      },
   });
};
