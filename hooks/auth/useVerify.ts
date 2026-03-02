import { authApi } from '@/lib/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useVerify = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.verification,

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['me'] });
      },
   });
};
