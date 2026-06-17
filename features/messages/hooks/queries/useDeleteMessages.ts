// useDeleteMessages.ts

import { useMutation } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';

type DeleteMessagesDto = {
   chatIdentifier: string;
   messageIds: number[];
};

export const useDeleteMessages = () => {
   return useMutation({
      mutationFn: ({ chatIdentifier, messageIds }: DeleteMessagesDto) =>
         messagesApi.deleteMessages(chatIdentifier, messageIds),
   });
};
