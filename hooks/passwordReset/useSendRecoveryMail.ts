import { passwordRecoveryApi } from '@/lib/api/passwordRecovery';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSendRecoveryEmail = () => {
   return useMutation({
      mutationFn: passwordRecoveryApi.sendRecoveryMail,
      onError: (err) => {
         toast.success(
            'Если email зарегистрирован, ссылка для сброса пароля отправлена'
         );
      },
      onSuccess: () => {
         toast.success(
            'Если email зарегистрирован, ссылка для сброса пароля отправлена'
         );
      },
   });
};
