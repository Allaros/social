import { authApi } from '@/lib/api/auth';
import { useQuery } from '@tanstack/react-query';

export const useMe = () => {
   return useQuery({
      queryKey: ['me'],
      queryFn: authApi.me,
      staleTime: 2 * 60 * 1000,
      retry: false,
   });
};
