import ROUTES from '@/shared/constants/routes';
import { authApi } from '@/features/auth/api/auth';
import { handleGlobalError } from '@/shared/handlers/handleGoabalError';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useLoader } from '@/features/loader/hooks/useLoader';

export const useConfirmMagic = () => {
   const { hideLoader, showLoader } = useLoader();
   const router = useRouter();
   return useMutation({
      mutationFn: authApi.confirmMagic,
      onMutate: () => {
         showLoader();
      },

      onSettled: () => {
         hideLoader();
      },
      onError: (err) => {
         handleGlobalError(err);
      },
      onSuccess: () => {
         router.replace(ROUTES.home);
      },
   });
};
