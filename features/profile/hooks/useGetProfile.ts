import { profileApi } from '@/features/profile/api/profile';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetProfile = (
   username: string
): UseQueryResult<ProfileResponce, Error> => {
   return useQuery({
      queryKey: ['profile', username],
      queryFn: () => profileApi.getProfile({ username }),
      enabled: !!username,
   });
};
