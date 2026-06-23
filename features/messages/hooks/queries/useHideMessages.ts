// useHideMessages.ts

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { messagesKeys } from '@/shared/lib/query-keys';
import { MessagesInfiniteData } from '../../types/messages.types';
import { removeMessagesById } from '../../helpers/optimistic/remove-messages-by-id';

type HideMessagesDto = {
   chatIdentifier: string;
   messageIds: number[];
};

export const useHideMessages = () => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: ({ chatIdentifier, messageIds }: HideMessagesDto) =>
         messagesApi.hideMessages(chatIdentifier, messageIds),

      onMutate: async ({ chatIdentifier, messageIds }) => {
         const queryKey = messagesKeys.list(chatIdentifier);

         const previous =
            queryClient.getQueryData<MessagesInfiniteData>(queryKey);

         queryClient.setQueryData(queryKey, (old: MessagesInfiniteData) =>
            old ? removeMessagesById(old, messageIds) : old
         );

         return { previous, queryKey };
      },

      onError: (_error, _variables, context) => {
         if (!context) return;

         queryClient.setQueryData(context.queryKey, context.previous);
      },
   });
};
