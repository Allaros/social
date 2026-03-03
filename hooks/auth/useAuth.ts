import { useMe } from './useMe';

export const useAuth = () => {
   const { data, isLoading, isError, error } = useMe();

   const isAuthenticated = !!data;
   const isUnauthenticated = isError || (!isLoading && !data);

   return {
      user: data ?? null,
      isAuthenticated,
      isUnauthenticated,
      isLoading,
      error,
   };
};
