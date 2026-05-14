import { profileApi } from '@/features/profile/api/profile';
import { profileKeys } from '@/shared/lib/query-keys';
import { useQuery, UseQueryResult } from '@tanstack/react-query';

export const useGetProfile = (
   username: string
): UseQueryResult<ProfileResponce, Error> => {
   return useQuery({
      queryKey: profileKeys.detail(username),
      queryFn: () => profileApi.getProfile({ username }),
      enabled: !!username,
   });
};
