import { passwordRecoveryApi } from '@/lib/api/passwordRecovery';
import { useMutation } from '@tanstack/react-query';

export const useChangePass = () => {
   return useMutation({
      mutationFn: passwordRecoveryApi.changePassword,
   });
};
