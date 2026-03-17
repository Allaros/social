import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth';
import { useRouter } from 'next/navigation';
import ROUTES from '@/shared/constants/routes';
import { normalizeApiError } from '@/shared/handlers/normalizeApiErrors';
import { toast } from 'sonner';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useLogin = () => {
   const { showLoader, hideLoader } = useLoader();
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.authorization,

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

         router.replace(ROUTES.home);
      },
      onError: (error) => {
         const normalized = normalizeApiError(error);

         if (normalized.code === 'EMAIL_IS_NOT_VERIFIED') {
            router.replace(ROUTES.auth.verify);
            return;
         }

         toast.error(normalized.message);
      },
   });
};
