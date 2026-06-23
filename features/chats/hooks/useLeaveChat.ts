// useLeaveChat.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { chatsKeys } from '@/shared/lib/query-keys';
import { chatsApi } from '../api/chats';

export const useLeaveChat = () => {
   const queryClient = useQueryClient();

   return useMutation({
      mutationFn: (chatIdentifier: string) =>
         chatsApi.leaveChat(chatIdentifier),

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
