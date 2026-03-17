import ROUTES from '@/shared/constants/routes';
import { authApi } from '@/features/auth/api/auth';
import { handleApiError } from '@/shared/handlers/axiosErrHandling';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useChangePass = () => {
   const { hideLoader, showLoader } = useLoader();
   const router = useRouter();
   return useMutation({
      mutationFn: authApi.changePass,
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
      onError: (err) => handleApiError(err),
      onSuccess: () => router.replace(ROUTES.auth.signIn),
   });
};
