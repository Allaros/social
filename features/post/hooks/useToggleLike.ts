import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { toast } from 'sonner';
import {
   optimisticUpdatePosts,
   rollbackPosts,
} from '../helpers/post-optimistic-update';
import { PostResponse } from '../types/post.responce';

export const useToggleLike = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         postId,
         isLiked,
      }: {
         postId: number;
         isLiked: boolean;
      }) => {
         if (isLiked) {
            return postApi.unlikePost(postId);
         } else {
            return postApi.likePost(postId);
         }
      },

      onMutate: async ({ postId }) => {
         return optimisticUpdatePosts({
            queryClient,
            postId,
            updater: (post: PostResponse) => {
               const isLiked = post.isLiked;

               return {
                  ...post,
                  isLiked: !isLiked,
                  likesCount: isLiked
                     ? post.likesCount - 1
                     : post.likesCount + 1,
               };
            },
         });
      },

      onError: (error, _, context) => {
         rollbackPosts(queryClient, context?.previousData);

         toast.error(`Ошибка лайка: ${error.message}`);
      },

      onSettled: () => {
         queryClient.invalidateQueries({
            queryKey: ['posts'],
            refetchType: 'active',
         });
      },
   });
};
