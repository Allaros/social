// useHideMessages.ts

import { useMutation } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';

type HideMessagesDto = {
   chatIdentifier: string;
   messageIds: number[];
};

export const useHideMessages = () => {
   return useMutation({
      mutationFn: ({ chatIdentifier, messageIds }: HideMessagesDto) =>
         messagesApi.hideMessages(chatIdentifier, messageIds),
   });
};
