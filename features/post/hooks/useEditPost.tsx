import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';

export const useEditPost = (username: string) => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         postId,
         formData,
      }: {
         postId: number;
         formData: FormData;
      }) => postApi.editPost(postId, formData),

      onError: (error, _, context) => {
         const normalized = normalizeApiError(error);
         toast.error(normalized.message);
      },

      onSuccess: () => {
         toast('Пост успешно изменен');

         queryClient.invalidateQueries({
            queryKey: ['posts', 'profile', username],
         });
      },
   });
};
