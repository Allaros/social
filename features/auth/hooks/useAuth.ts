'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ROUTES from '@/shared/constants/routes';
import { useMe } from '@/features/auth/hooks/useMe';
import { toast } from 'sonner';

export const useAuth = () => {
   const router = useRouter();
   const { data: user, isLoading, isError } = useMe();

   useEffect(() => {
      if (isLoading) {
         return;
      }
      if (isError || !user) {
         router.replace(ROUTES.auth.signIn);
         return;
      }
      if (!user.isVerified) {
         router.replace(ROUTES.auth.signIn);
         toast('Email не верифицирован, попробуйте войти снова');
      }
   }, [isLoading, isError, user, router]);

   return { user, isLoading };
};
