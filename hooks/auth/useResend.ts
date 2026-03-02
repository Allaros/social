import { authApi } from '@/lib/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useResend = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.resend,
   });
};
