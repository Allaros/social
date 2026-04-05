import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { useLoader } from '@/features/loader/hooks/useLoader';
import { toast } from 'sonner';

export const usePostActions = () => {
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
         queryClient.invalidateQueries({ queryKey: ['posts', 'my'] });
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
         queryClient.invalidateQueries({ queryKey: ['feed'] });
      },
   });

   const savePost = useMutation({
      mutationFn: (postId: number) => postApi.savePost(postId),
      onSuccess: () => {
         toast.success('Пост успешно сохранен');
      },
   });

   const unsavePost = useMutation({
      mutationFn: (postId: number) => postApi.unsavePost(postId),
      onSuccess: () => {
         toast.success('Пост удален из избранного');
         queryClient.invalidateQueries({ queryKey: ['saved'] });
      },
   });

   //    const reportPost = useMutation({
   //       mutationFn: (postId: string) => postApi.report(postId),
   //    });

   return {
      hardDelete,
      softDelete,
      savePost,
      unsavePost,
   };
};
