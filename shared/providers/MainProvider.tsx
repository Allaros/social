import React from 'react';
import QueryProvider from './QueryProvider';
import ModalsProvider from '@/features/modal/providers/ModalsProvider';
import LoaderProvider from '@/features/loader/providers/LoaderProvider';
import { UIProvider } from '@/features/drawer/provider/drawerProvider';

const MainProvider = ({ children }: { children: React.ReactNode }) => {
   return (
      <QueryProvider>
         <ModalsProvider>
            <LoaderProvider>
               <UIProvider>{children}</UIProvider>
            </LoaderProvider>
         </ModalsProvider>
      </QueryProvider>
   );
};

export default MainProvider;
