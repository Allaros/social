import ROUTES from '@/constants/routes';
import { authApi } from '@/lib/api/auth';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useVerify = () => {
   const router = useRouter();
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: authApi.verification,

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['me'] });
         router.push(ROUTES.home);
      },
   });
};
