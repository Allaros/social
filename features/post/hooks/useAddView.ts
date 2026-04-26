import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
   optimisticUpdatePosts,
   rollbackPosts,
} from '../helpers/post-optimistic-update';
import { postApi } from '../api/post';

export const useAddView = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (postId: number) => postApi.addView(postId),

      onMutate: async (postId) => {
         const result = await optimisticUpdatePosts({
            queryClient,
            postId,
            updater: (post) => ({
               ...post,
               viewsCount: (post.viewsCount ?? 0) + 1,
            }),
         });

         return result;
      },

      onError: (_err, _postId, context) => {
         rollbackPosts(queryClient, context?.previousData);
      },
   });
};
