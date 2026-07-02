import { InfiniteData, QueryClient } from '@tanstack/react-query';
import { RealtimeMessageCreatedType } from '../types/message-realtime.types';
import {
   MessageResponseType,
   MessagesPage,
   MessageStatusEnum,
} from '../types/messages.types';
import { prependMessages } from '../helpers/optimistic/prepend-messages';
import { messagesKeys } from '@/shared/lib/query-keys';

export type MessagesCache = InfiniteData<MessagesPage, string | undefined>;

export const handleMessageCreated = (
   queryClient: QueryClient,
   payload: RealtimeMessageCreatedType
) => {
   console.log('Realtime message arrived');
   console.log(payload);
   const { message, chatIdentifier, chatId } = payload;

   if (!chatIdentifier) return;

   // 1. получаем текущий кеш сообщений
   const cached = queryClient.getQueryData<MessagesCache>(
      messagesKeys.list(chatIdentifier)
   );

   if (!cached) {
      return;
   }

   // 2. не добавляем дубликаты (на всякий случай)
   const exists = cached.pages.some((page) =>
      page.data.some((m) => m.clientId === message.clientId)
   );

   if (exists) {
      return;
   }

   // 3. проверяем — это наше сообщение или чужое

   const normalizedMessage: MessageResponseType = {
      ...message,
      isOwn: false,
      status: MessageStatusEnum.SENT,
   };

   // 4. обновляем кеш
   queryClient.setQueryData<MessagesCache>(
      messagesKeys.list(chatIdentifier),
      (old) => {
         if (!old) return old;

         return prependMessages(old, [normalizedMessage]);
      }
   );
};
