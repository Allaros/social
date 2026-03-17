import { authApi } from '@/features/auth/api/auth';
import { useLoader } from '@/features/loader/hooks/useLoader';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useResend = () => {
   const { hideLoader, showLoader } = useLoader();
   return useMutation({
      mutationFn: authApi.sendVerificationCode,
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
   });
};
