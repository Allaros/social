import { QueryClient } from '@tanstack/react-query';
import { ChatListItem, ChatsInfiniteData } from '../types/chats.types';
import { chatsKeys } from '@/shared/lib/query-keys';

export const moveChatToTop = (
   pages: ChatsInfiniteData['pages'],
   chat: ChatListItem
) => {
   const cleanedPages = pages.map((page) => ({
      ...page,

      data: page.data.filter((item) => item.id !== chat.id),
   }));

   return cleanedPages.map((page, index) => ({
      ...page,

      data: index === 0 ? [chat, ...page.data] : page.data,
   }));
};

export const prependChatToCache = (
   chat: ChatListItem,
   queryClient: QueryClient
) => {
   queryClient.setQueriesData<ChatsInfiniteData>(
      {
         queryKey: chatsKeys.list(),
      },

      (oldData) => {
         if (!oldData) return oldData;
         return {
            ...oldData,

            pages: moveChatToTop(oldData.pages, chat),
         };
      }
   );
};
