import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/lib/api/auth';

export const useRegister = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.registration,

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['me'] });
      },
   });
};
