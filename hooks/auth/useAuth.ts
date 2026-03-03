'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useMe } from './useMe';

export const useAuth = () => {
   const queryClient = useQueryClient();
   const query = useMe();

   useEffect(() => {
      if (query.error) {
         queryClient.setQueryData(['me'], null);
      }
   }, [query.error, queryClient]);

   return {
      user: query.data ?? null,
      isLoading: query.isLoading,
   };
};
