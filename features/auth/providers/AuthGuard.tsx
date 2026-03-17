'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Loader from '@/features/loader/components/Loader';
import ROUTES from '@/shared/constants/routes';
import { useMe } from '@/features/auth/hooks/useMe';
import { toast } from 'sonner';

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   const { data: user, isLoading, isError } = useMe();

   const toastShown = useRef(false);

   useEffect(() => {
      if (isLoading) return;

      if (isError || !user) {
         router.replace(ROUTES.auth.signIn);
         return;
      }

      if (!user.isVerified) {
         if (!toastShown.current) {
            toast('Повторите авторизацию, чтобы продолжить');
            toastShown.current = true;
            setTimeout(() => {
               router.replace(ROUTES.auth.signIn);
            }, 100);
         }

         router.replace(ROUTES.auth.signIn);
      }
   }, [isLoading, isError, user, router]);

   if (isLoading) return null;

   if (isError || !user || !user.isVerified) return null;

   return <>{children}</>;
};

export default AuthGuard;
