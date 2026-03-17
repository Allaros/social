import ROUTES from '@/shared/constants/routes';
import { authApi } from '@/features/auth/api/auth';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useLogout = () => {
   const { hideLoader, showLoader } = useLoader();
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.logout,
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
         queryClient.removeQueries({ queryKey: ['auth'] });

         router.replace(ROUTES.auth.signIn);
      },
   });
};
