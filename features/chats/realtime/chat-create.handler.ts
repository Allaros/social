import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { chatsKeys } from '@/shared/lib/query-keys';

import { ChatListItem, GetChatsResponse } from '../types/chats.types';

export const handleChatCreated = (
   queryClient: QueryClient,
   event: ChatListItem
) => {
   const queries = queryClient.getQueriesData<InfiniteData<GetChatsResponse>>({
      queryKey: chatsKeys.lists(),
   });

   console.log('Chat created');

   for (const [queryKey, data] of queries) {
      if (!data || data.pages.length === 0) {
         continue;
      }

      const exists = data.pages.some((page) =>
         page.data.some((chat) => chat.id === event.id)
      );

      if (exists) {
         continue;
      }

      const [firstPage, ...restPages] = data.pages;

      queryClient.setQueryData<InfiniteData<GetChatsResponse>>(queryKey, {
         ...data,
         pages: [
            {
               ...firstPage,
               data: [event, ...firstPage.data],
            },
            ...restPages,
         ],
      });
   }
};
