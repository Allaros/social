import ROUTES from '@/shared/constants/routes';
import { authApi } from '@/features/auth/api/auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useMagicMail = () => {
   const { hideLoader, showLoader } = useLoader();
   const router = useRouter();
   return useMutation({
      mutationFn: authApi.sendMagicMail,
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
      onError: (err: AxiosError<ApiErrorResponse>) => {
         if (err.response?.data.statusCode === 400) {
            toast.error('Укажите правильный email');
            return;
         }
         router.push(ROUTES.auth.checkInBox);
      },
      onSuccess: () => {
         router.push(ROUTES.auth.checkInBox);
      },
   });
};
