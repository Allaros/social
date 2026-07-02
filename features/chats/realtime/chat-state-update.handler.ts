import { QueryClient } from '@tanstack/react-query';

import {
   ChatListItem,
   ChatStateUpdatedType,
   ChatStateUpdateType,
} from '../types/chats.types';

import { chatsKeys } from '@/shared/lib/query-keys';
import { MessagesTypeEnum } from '@/features/messages/types/messages.types';

export const handleChatStateUpdated = (
   queryClient: QueryClient,
   payload: ChatStateUpdatedType
) => {
   const queries = queryClient.getQueriesData({
      queryKey: chatsKeys.lists(),
   });

   console.log(payload);

   for (const [queryKey, data] of queries) {
      if (!data) continue;

      const typed = data as {
         pages: {
            data: ChatListItem[];
         }[];
      };

      const flat = typed.pages.flatMap((page) => page.data);

      const chatIndex = flat.findIndex((chat) => chat.id === payload.chatId);

      if (chatIndex === -1) {
         continue;
      }

      const chat = flat[chatIndex];

      const updated: ChatListItem = {
         ...chat,
         unreadCount: payload.unreadCount,
         lastMessage: {
            createdAt: payload.lastMessagePayload?.createdAt ?? null,
            type: payload.lastMessagePayload?.type ?? MessagesTypeEnum.DEFAULT,
            text: payload.lastMessagePayload?.textPreview,
            senderName: payload.lastMessagePayload?.senderName,
         },
      };

      let result = [...flat];

      switch (payload.type) {
         case ChatStateUpdateType.READ: {
            result[chatIndex] = { ...chat, unreadCount: updated.unreadCount };
            break;
         }

         case ChatStateUpdateType.CREATE: {
            result.splice(chatIndex, 1);
            result.unshift(updated);
            break;
         }

         case ChatStateUpdateType.EDIT:
         case ChatStateUpdateType.HIDE: {
            result[chatIndex] = updated;
            break;
         }

         case ChatStateUpdateType.DELETE: {
            result[chatIndex] = updated;

            result.sort((a, b) => {
               const aTime = a.lastMessageAt
                  ? new Date(a.lastMessageAt).getTime()
                  : 0;

               const bTime = b.lastMessageAt
                  ? new Date(b.lastMessageAt).getTime()
                  : 0;

               return bTime - aTime;
            });

            break;
         }
      }

      let cursor = 0;

      const newPages = typed.pages.map((page) => {
         const count = page.data.length;

         const slice = result.slice(cursor, cursor + count);

         cursor += count;

         return {
            ...page,
            data: slice,
         };
      });

      queryClient.setQueryData(queryKey, {
         ...typed,
         pages: newPages,
      });
   }
};
