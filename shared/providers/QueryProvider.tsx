'use client';

import { handleGlobalError } from '@/shared/handlers/handleGoabalError';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
   MutationCache,
   QueryCache,
   QueryClient,
   QueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode, useEffect, useState } from 'react';
import { registerLogoutHandler } from '@/shared/handlers/sessionHandler';

const QueryProvider = ({ children }: { children: ReactNode }) => {
   const [queryClient] = useState(
      () =>
         new QueryClient({
            defaultOptions: {
               queries: {
                  retry: false,
                  refetchOnWindowFocus: false,
                  staleTime: 1000 * 60,
               },
               mutations: {
                  retry: false,
               },
            },
            mutationCache: new MutationCache({
               onError: (error) => {
                  handleGlobalError(error);
               },
            }),
            queryCache: new QueryCache({
               onError: (error) => {
                  handleGlobalError(error);
               },
            }),
         })
   );

   useEffect(() => {
      registerLogoutHandler(() => {
         window.location.href = '/sign-in';
      });
   }, [queryClient]);

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         {/* {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
         )} */}
      </QueryClientProvider>
   );
};

export default QueryProvider;
