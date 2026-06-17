import { useMutation, useQueryClient } from '@tanstack/react-query';

import { messagesApi } from '../../api/messages';
import { messagesKeys } from '@/shared/lib/query-keys';

export type SendMessageInput = {
   text?: string;

   attachments?: {
      storageKey: string;
      mimeType: string;
      size: number;
   }[];

   replyToMessageId?: number;
};

export const useSendMessage = (chatIdentifier: string) => {
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (input: SendMessageInput) => {
         return messagesApi.createMessage(chatIdentifier, {
            text: input.text?.trim() || undefined,

            attachments: input.attachments?.length
               ? input.attachments
               : undefined,
            replyToMessageId: input.replyToMessageId,
         });
      },

      onSuccess: () => {
         queryClient.invalidateQueries({
            queryKey: messagesKeys.list(chatIdentifier),
         });
      },
   });
};
