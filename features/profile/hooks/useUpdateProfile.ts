import { useMutation, useQueryClient } from '@tanstack/react-query';
import { profileApi } from '../api/profile';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useUpdateProfile = (username: string) => {
   const { hideLoader, showLoader } = useLoader();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (formData: FormData) => profileApi.updateProfile(formData),

      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },

      onSuccess: (data) => {
         queryClient.invalidateQueries({ queryKey: ['profile', username] });
         queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
      },
      onError: (err) => {
         const normalized = normalizeApiError(err);

         toast.error(normalized.message);
      },
   });
};
