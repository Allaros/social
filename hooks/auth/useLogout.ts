import { authApi } from '@/lib/api/auth';
import { triggerLogout } from '@/lib/handlers/sessionHandler';
import { useMutation } from '@tanstack/react-query';

export const useLogout = () => {
   return useMutation({
      mutationFn: authApi.logout,
      onSuccess: () => {
         triggerLogout();
      },
      onError: () => {
         triggerLogout();
      },
   });
};
