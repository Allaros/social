import { InfiniteData, QueryClient } from '@tanstack/react-query';

import { chatsKeys } from '@/shared/lib/query-keys';

import { GetChatsResponse } from '../types/chats.types';

type ChatDeletedPayload = {
   chatId: number;
};

export const handleChatDeleted = (
   queryClient: QueryClient,
   event: ChatDeletedPayload
) => {
   const queries = queryClient.getQueriesData<InfiniteData<GetChatsResponse>>({
      queryKey: chatsKeys.lists(),
   });

   for (const [queryKey, data] of queries) {
      if (!data) {
         continue;
      }

      let changed = false;

      const pages = data.pages.map((page) => {
         const filtered = page.data.filter((chat) => {
            const keep = chat.id !== event.chatId;

            if (!keep) {
               changed = true;
            }

            return keep;
         });

         return {
            ...page,
            data: filtered,
         };
      });

      if (!changed) {
         continue;
      }

      queryClient.setQueryData<InfiniteData<GetChatsResponse>>(queryKey, {
         ...data,
         pages,
      });
   }
};
