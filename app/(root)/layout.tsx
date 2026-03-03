'use client';

import Loader from '@/components/common/loader';
import ROUTES from '@/constants/routes';
import { useAuth } from '@/hooks/auth/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
   const { isUnauthenticated, isLoading } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (isUnauthenticated) {
         router.replace(ROUTES.auth.signIn);
      }
   }, [isUnauthenticated]);

   if (isLoading) return <Loader isPending={isLoading} />;
   if (isUnauthenticated) return null;
   return <div>{children}</div>;
};

export default MainLayout;
