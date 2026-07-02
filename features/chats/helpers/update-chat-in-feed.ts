import { InfiniteData } from '@tanstack/react-query';
import { ChatListItem, GetChatsResponse } from '../types/chats.types';

export type ChatsInfiniteData = InfiniteData<GetChatsResponse>;

export function updateChatInFeed(
   data: ChatsInfiniteData,
   chatId: number,
   updater: (chat: ChatListItem) => ChatListItem,
   moveToTop = false
): ChatsInfiniteData {
   const allChats = data.pages.flatMap((page) => page.data);

   const index = allChats.findIndex((chat) => chat.id === chatId);

   if (index === -1) {
      return data;
   }

   const updatedChat = updater(allChats[index]);

   allChats[index] = updatedChat;

   if (moveToTop) {
      allChats.splice(index, 1);
      allChats.unshift(updatedChat);
   }

   let offset = 0;

   const pages = data.pages.map((page) => {
      const slice = allChats.slice(offset, offset + page.data.length);

      offset += page.data.length;

      return {
         ...page,
         data: slice,
      };
   });

   return {
      ...data,
      pages,
   };
}
