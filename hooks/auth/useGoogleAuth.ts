import { useCallback } from 'react';
import { authApi } from '@/lib/api/auth';

export const useGoogleAuth = () => {
   const loginWithGoogle = useCallback(() => {
      authApi.googleOAuth();
   }, []);

   return { loginWithGoogle };
};
