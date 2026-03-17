import ROUTES from '@/shared/constants/routes';
import { authApi } from '@/features/auth/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useVerify = () => {
   const { hideLoader, showLoader } = useLoader();
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.verification,
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });
         queryClient.refetchQueries({
            queryKey: ['auth', 'me'],
         });
         router.push(ROUTES.home);
      },
   });
};
