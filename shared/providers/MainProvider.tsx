import React from 'react';
import QueryProvider from './QueryProvider';
import ModalsProvider from '@/features/modal/providers/ModalsProvider';
import LoaderProvider from '@/features/loader/providers/LoaderProvider';

const MainProvider = ({ children }: { children: React.ReactNode }) => {
   return (
      <QueryProvider>
         <ModalsProvider>
            <LoaderProvider>{children}</LoaderProvider>
         </ModalsProvider>
      </QueryProvider>
   );
};

export default MainProvider;
