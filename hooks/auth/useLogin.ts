import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/lib/api/auth';
import { AxiosError } from 'axios';

export const useLogin = () => {
   const queryClient = useQueryClient();

   return useMutation<UserResponse, AxiosError<ApiErrorResponse>, ISignIn>({
      mutationFn: authApi.authorization,

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['me'] });
      },
   });
};
