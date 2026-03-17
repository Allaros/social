import { authApi } from '@/features/auth/api/auth';
import { useLoader } from '@/features/loader/hooks/useLoader';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

export const useSendRecoveryEmail = () => {
   const { hideLoader, showLoader } = useLoader();
   return useMutation({
      mutationFn: authApi.sendPasswordChangeMail,

      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
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
