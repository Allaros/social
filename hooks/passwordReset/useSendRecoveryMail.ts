import { passwordRecoveryApi } from '@/lib/api/passwordRecovery';
import { useMutation } from '@tanstack/react-query';

export const useSendRecoveryEmail = () => {
   return useMutation({
      mutationFn: passwordRecoveryApi.sendRecoveryMail,
   });
};
