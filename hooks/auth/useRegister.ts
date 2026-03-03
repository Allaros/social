import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authApi } from '@/lib/api/auth';
import ROUTES from '@/constants/routes';
import { useRouter } from 'next/navigation';

export const useRegister = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.registration,

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['me'] });
         router.push(ROUTES.auth.verify);
      },
   });
};
