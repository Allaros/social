import { messagesKeys } from '@/shared/lib/query-keys';
import { QueryClient } from '@tanstack/react-query';
import { removeMessagesById } from '../helpers/optimistic/remove-messages-by-id';
import { MessagesInfiniteData } from '../types/messages.types';
import { RealtimeMessagesDeletedType } from '../types/message-realtime.types';

export const handleMessagesDeleted = (
   queryClient: QueryClient,
   payload: RealtimeMessagesDeletedType
) => {
   const { chatIdentifier, chatId, messageIds } = payload;

   if (!chatIdentifier) {
      return;
   }

   queryClient.setQueryData<MessagesInfiniteData>(
      messagesKeys.list(chatIdentifier),
      (old) => {
         if (!old) {
            return old;
         }

         return removeMessagesById(old, messageIds);
      }
   );
};
