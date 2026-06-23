import { useMutation, useQueryClient } from '@tanstack/react-query';

import { messagesApi } from '../../api/messages';
import { messagesKeys } from '@/shared/lib/query-keys';
import { useProfile } from '@/features/profile/hooks/useProfile';
import {
   MessagesInfiniteData,
   MessageStatusEnum,
} from '../../types/messages.types';
import { toMessageAttachments } from '../../utils/to-message-attachments';
import { AttachmentItem } from './useAttachments';
import { createOptimisticMessage } from '../../helpers/optimistic/create-optimistic-messages';
import { prependMessages } from '../../helpers/optimistic/prepend-messages';
import {
   patchMessageByClientId,
   updateMessagesByClientId,
} from '../../helpers/optimistic/update-messages-by-client-id';

export type SendMessageInput = {
   text?: string;

   attachments?: AttachmentItem[];

   replyToMessageId?: number;

   clientId: string;
};

export const useSendMessage = (chatIdentifier: string) => {
   const profile = useProfile();
   const queryClient = useQueryClient();
   return useMutation({
      mutationFn: async (input: SendMessageInput) => {
         return messagesApi.createMessage(chatIdentifier, {
            text: input.text?.trim() || undefined,

            attachments: input.attachments
               ? toMessageAttachments(input.attachments)
               : undefined,
            replyToMessageId: input.replyToMessageId,

            clientId: input.clientId,
         });
      },

      onMutate: async (variables) => {
         if (!profile) return;

         const previous = queryClient.getQueryData<MessagesInfiniteData>(
            messagesKeys.list(chatIdentifier)
         );

         const optimisticMessage = createOptimisticMessage({
            clientId: variables.clientId,
            text: variables.text,
            attachments: variables.attachments,
            profile,
         });

         queryClient.setQueryData(
            messagesKeys.list(chatIdentifier),
            (old: MessagesInfiniteData) =>
               old ? prependMessages(old, [optimisticMessage]) : old
         );

         return {
            previous,
         };
      },

      onSuccess: (message) => {
         queryClient.setQueryData(
            messagesKeys.list(chatIdentifier),
            (old: MessagesInfiniteData) =>
               old
                  ? patchMessageByClientId(old, message.clientId, {
                       id: message.id,
                       createdAt: message.createdAt,
                       status: MessageStatusEnum.SENT,
                    })
                  : old
         );
      },
      onError: (_, variables) => {
         queryClient.setQueryData(
            messagesKeys.list(chatIdentifier),
            (old: MessagesInfiniteData) =>
               old
                  ? patchMessageByClientId(old, variables.clientId, {
                       status: MessageStatusEnum.FAILED,
                    })
                  : old
         );
      },
   });
};
