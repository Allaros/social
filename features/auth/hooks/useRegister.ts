import ROUTES from '@/shared/constants/routes';
import { authApi } from '@/features/auth/api/auth';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useRegister = () => {
   const { hideLoader, showLoader } = useLoader();
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.registration,

      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },

      onSuccess: async () => {
         await queryClient.fetchQuery({
            queryKey: ['auth', 'me'],
            queryFn: authApi.me,
         });

         router.replace(ROUTES.auth.verify);
      },
   });
};
