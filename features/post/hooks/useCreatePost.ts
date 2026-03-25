import { useLoader } from '@/features/loader/hooks/useLoader';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postApi } from '../api/post';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';

export const useCreatePost = () => {
   const { hideLoader, showLoader } = useLoader();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (formData: FormData) => postApi.createPost(formData),

      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
      onError: (err) => {
         const normalized = normalizeApiError(err);

         toast.error(normalized.message);
      },
   });
};
