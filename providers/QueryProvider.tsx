'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactNode, useState } from 'react';

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
            },
         })
   );

   return (
      <QueryClientProvider client={queryClient}>
         {children}
         {process.env.NODE_ENV === 'development' && (
            <ReactQueryDevtools initialIsOpen={false} />
         )}
      </QueryClientProvider>
   );
};

export default QueryProvider;
