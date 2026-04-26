import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../api/comments';
import { toast } from 'sonner';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import {
   optimisticDeleteComment,
   rollbackDeleteComment,
} from '../helpers/DeleteCommentHelper';

export const useDeleteComment = (postId: number) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         commentId,
         repliesCount,
         parentId,
      }: {
         commentId: number;
         repliesCount: number;
         parentId?: number | null;
      }) => commentsApi.deleteComment(commentId),

      onMutate: async ({ commentId, repliesCount, parentId }) => {
         return optimisticDeleteComment({
            queryClient,
            commentId,
            repliesCount,
            postId,
            parentId,
         });
      },

      onError: (err, _vars, context) => {
         rollbackDeleteComment(queryClient, context);
         toast.error(normalizeApiError(err).message);
      },
      onSettled: () => {
         setTimeout(() => {
            queryClient.invalidateQueries({
               queryKey: ['comments', postId],
               type: 'inactive',
            });
         }, 1000);
      },
   });
};
