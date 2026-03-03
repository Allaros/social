import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/lib/api/auth';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import ROUTES from '@/constants/routes';
import { handleApiError } from '@/lib/handlers/axiosErrHandling';

export const useLogin = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation<UserResponse, AxiosError<ApiErrorResponse>, ISignIn>({
      mutationFn: authApi.authorization,

      onSuccess: (data) => {
         queryClient.setQueryData(['me'], data);
         router.push(ROUTES.home);
      },
      onError: (error: AxiosError<ApiErrorResponse>) => {
         const code = error.response?.data.code;

         if (code === 'EMAIL_NOT_VERIFIED') {
            router.push(ROUTES.auth.verify);
         }

         handleApiError(error);
      },
   });
};
