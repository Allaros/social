import { profileKeys, searchKeys } from '@/shared/lib/query-keys';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { friendsApi } from '../api/friends';
import { updateProfilesInSearchCache } from '../helpers/optimistic-updater';

export const useToggleFollow = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: async ({
         profileId,
         isFollowed,
      }: {
         profileId: number;
         isFollowed: boolean;
      }) =>
         isFollowed
            ? friendsApi.unfollowUser(profileId)
            : friendsApi.followUser(profileId),

      onMutate: async ({ profileId, isFollowed }) => {
         await queryClient.cancelQueries();

         const snapshot = queryClient.getQueriesData({
            queryKey: searchKeys.all,
         });

         updateProfilesInSearchCache(queryClient, profileId, (profile) => ({
            ...profile,
            isFollowed: !isFollowed,
            followersCount:
               (profile.followersCount ?? 0) + (isFollowed ? -1 : 1),
         }));

         return { snapshot };
      },

      onError: (_err, _vars, ctx) => {
         ctx?.snapshot?.forEach(([key, data]) => {
            queryClient.setQueryData(key, data);
         });
      },

      onSettled: () => {
         queryClient.invalidateQueries({
            queryKey: profileKeys.all,
         });
      },
   });
};
