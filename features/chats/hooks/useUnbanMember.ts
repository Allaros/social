import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatsKeys } from '@/shared/lib/query-keys';
import { chatsApi } from '../api/chats';

export const useUnbanMember = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: ({
         chatIdentifier,
         targetProfileId,
      }: {
         chatIdentifier: string;
         targetProfileId: number;
      }) => chatsApi.addMember({ chatIdentifier, targetProfileId }),

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
