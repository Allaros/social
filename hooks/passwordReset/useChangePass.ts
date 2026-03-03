import ROUTES from '@/constants/routes';
import { passwordRecoveryApi } from '@/lib/api/passwordRecovery';
import { handleApiError } from '@/lib/handlers/axiosErrHandling';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useChangePass = () => {
   const router = useRouter();
   return useMutation({
      mutationFn: passwordRecoveryApi.changePassword,
      onError: (err) => handleApiError(err),
      onSuccess: () => router.replace(ROUTES.auth.signIn),
   });
};
