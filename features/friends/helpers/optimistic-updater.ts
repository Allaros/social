import { searchKeys } from '@/shared/lib/query-keys';
import { QueryClient } from '@tanstack/react-query';

export function updateProfilesInSearchCache(
   queryClient: QueryClient,
   profileId: number,
   updater: (profile: any) => any
) {
   queryClient.setQueriesData({ queryKey: searchKeys.all }, (oldData: any) => {
      if (!oldData) return oldData;

      return {
         ...oldData,
         data: oldData.data.map((profile: any) =>
            profile.id === profileId ? updater(profile) : profile
         ),
      };
   });
}
