import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { useLoader } from '@/features/loader/hooks/useLoader';
import { toast } from 'sonner';
import {
   optimisticUpdatePosts,
   rollbackPosts,
} from '../helpers/post-optimistic-update';

export const usePostActions = (username: string) => {
   const { hideLoader, showLoader } = useLoader();
   const queryClient = useQueryClient();

   const softDelete = useMutation({
      mutationFn: (postId: number) => postApi.softDelete(postId),
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });
      },
   });

   const hardDelete = useMutation({
      mutationFn: (postId: number) => postApi.hardDeletePost(postId),
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'], exact: false });
      },
   });

   const toggleSaved = useMutation({
      mutationFn: ({
         postId,
         isSaved,
      }: {
         postId: number;
         isSaved: boolean;
      }) => {
         if (isSaved) {
            return postApi.unsavePost(postId);
         } else {
            return postApi.savePost(postId);
         }
      },

      onMutate: async ({ postId }) =>
         optimisticUpdatePosts({
            queryClient,
            postId,
            updater: (post) => ({
               ...post,
               isSaved: !post.isSaved,
            }),
         }),

      onError: (error, _, context) => {
         rollbackPosts(queryClient, context?.previousData);
         toast.error(`Ошибка сохранения: ${error.message}`);
      },
      onSuccess: (_, { isSaved }) => {
         toast(
            `Пост успешно ${isSaved ? 'удалён из сохраненных.' : 'сохранён.'}`
         );
      },
   });

   //    const reportPost = useMutation({
   //       mutationFn: (postId: string) => postApi.report(postId),
   //    });

   return {
      hardDelete,
      softDelete,

      toggleSaved,
   };
};
