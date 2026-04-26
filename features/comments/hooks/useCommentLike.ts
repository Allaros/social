import { useMutation, useQueryClient } from '@tanstack/react-query';
import { commentsApi } from '../api/comments';
import { CommentsPage } from '../types/comments.interface';
import { updateCommentInAllCaches } from '../helpers/UpdateCommentInPage';
import {
   restoreCommentCaches,
   snapshotCommentCaches,
} from '../helpers/OptimisticRollback';

export const useCommentLike = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         commentId,
         isLiked,
      }: {
         commentId: number;
         isLiked: boolean;
      }) => {
         if (isLiked) {
            commentsApi.unlikeComment(commentId);
         } else {
            commentsApi.likeComment(commentId);
         }
      },

      onMutate: async ({ commentId, isLiked }) => {
         await queryClient.cancelQueries({ queryKey: ['comments'] });
         await queryClient.cancelQueries({ queryKey: ['replies'] });

         const snapshots = snapshotCommentCaches(queryClient);

         updateCommentInAllCaches(queryClient, commentId, (c) => ({
            ...c,
            isLiked: !isLiked,
            likesCount: isLiked ? c.likesCount - 1 : c.likesCount + 1,
         }));

         return { snapshots };
      },

      onError: (_err, _vars, context) => {
         if (context?.snapshots) {
            restoreCommentCaches(queryClient, context.snapshots);
         }
      },
   });
};
