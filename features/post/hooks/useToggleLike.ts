import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { toast } from 'sonner';
import { GetFeedResponse } from '@/features/feed/types/feed.response';

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
         await queryClient.cancelQueries({ queryKey: ['feed'] });

         const previousFeed = queryClient.getQueryData(['feed']);

         queryClient.setQueryData(['feed'], (old: any) => {
            if (!old) return old;

            return {
               ...old,
               pages: old.pages.map((page: GetFeedResponse) => ({
                  ...page,
                  posts: page.posts.map((post) => {
                     if (post.id !== postId) return post;

                     const isLiked = post.isLiked;

                     return {
                        ...post,
                        isLiked: !isLiked,
                        likesCount: isLiked
                           ? post.likesCount - 1
                           : post.likesCount + 1,
                     };
                  }),
               })),
            };
         });

         return { previousFeed };
      },

      onError: (error, _, context) => {
         if (context?.previousFeed) {
            queryClient.setQueryData(['feed'], context.previousFeed);
         }

         toast.error(`Ошибка лайка: ${error.message}`);
      },

      onSettled: () => {
         queryClient.invalidateQueries({
            queryKey: ['feed'],
            refetchType: 'active',
         });
      },
   });
};
