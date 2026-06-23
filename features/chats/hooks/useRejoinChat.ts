import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatsKeys } from '@/shared/lib/query-keys';
import { chatsApi } from '../api/chats';

export const useRejoinChat = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (chatIdentifier: string) =>
         chatsApi.rejoinChat(chatIdentifier),

      onSuccess: (_, chatIdentifier) => {
         queryClient.invalidateQueries({
            queryKey: chatsKeys.list(),
         });

         queryClient.invalidateQueries({
            queryKey: chatsKeys.detail(chatIdentifier),
         });
      },
   });
};
