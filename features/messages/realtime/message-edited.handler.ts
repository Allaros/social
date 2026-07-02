import { QueryClient } from '@tanstack/react-query';
import { messagesKeys } from '@/shared/lib/query-keys';
import { updateMessages } from '../helpers/optimistic/update-messages';
import { MessagesInfiniteData } from '../types/messages.types';
import { RealtimeMessageEditedType } from '../types/message-realtime.types';

export const handleMessageEdited = (
   queryClient: QueryClient,
   payload: RealtimeMessageEditedType
) => {
   const { messageId, newText, chatIdentifier } = payload;

   console.log('Message edited', payload);

   if (!chatIdentifier) {
      return;
   }

   const cached = queryClient.getQueryData<MessagesInfiniteData>(
      messagesKeys.list(chatIdentifier)
   );

   if (!cached) {
      return;
   }

   queryClient.setQueryData<MessagesInfiniteData>(
      messagesKeys.list(chatIdentifier),
      (old) => {
         if (!old) {
            return old;
         }

         return updateMessages(old, (message) => {
            if (message.id !== messageId) {
               return message;
            }

            return {
               ...message,
               content: {
                  text: newText,
               },
               editedAt: new Date(),
            };
         });
      }
   );
};
