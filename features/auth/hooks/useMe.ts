import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/features/auth/api/auth';

export const useMe = () => {
   return useQuery<MeResponce>({
      queryKey: ['auth', 'me'],
      queryFn: authApi.me,
      retry: false,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
   });
};
