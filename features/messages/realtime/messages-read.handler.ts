import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { messagesKeys } from '@/shared/lib/query-keys';

import {
   MessagesInfiniteData,
   MessageStatusEnum,
} from '../types/messages.types';

import { updateMessages } from '../helpers/optimistic/update-messages';
import { RealtimeMessagesReadType } from '../types/message-realtime.types';

export const handleMessagesRead = (
   queryClient: QueryClient,
   payload: RealtimeMessagesReadType
) => {
   const { chatIdentifier, messageIds } = payload;

   if (!chatIdentifier) {
      return;
   }

   queryClient.setQueryData<MessagesInfiniteData>(
      messagesKeys.list(chatIdentifier),
      (old) => {
         if (!old) {
            return old;
         }

         const ids = new Set(messageIds);

         return updateMessages(old, (message) => {
            if (!ids.has(message.id)) {
               return message;
            }

            return {
               ...message,
               status: MessageStatusEnum.READ,
            };
         });
      }
   );
};
