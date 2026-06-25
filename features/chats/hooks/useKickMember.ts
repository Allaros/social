import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatsKeys } from '@/shared/lib/query-keys';
import { chatsApi } from '../api/chats';

export const useKickMember = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         restrictedUntil,
         targetProfileId,
         chatIdentifier,
      }: {
         targetProfileId: number;
         restrictedUntil: string | null;
         chatIdentifier: string;
      }) =>
         chatsApi.kickMember({
            chatIdentifier,
            restrictedUntil,
            targetProfileId,
         }),
      onSuccess: (_, variables) => {
         queryClient.invalidateQueries({
            queryKey: chatsKeys.detail(variables.chatIdentifier),
         });

         queryClient.invalidateQueries({
            queryKey: chatsKeys.list(),
         });
      },
   });
};
