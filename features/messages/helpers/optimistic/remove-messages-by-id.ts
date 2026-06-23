import { MessagesInfiniteData } from '../../types/messages.types';

export const removeMessagesById = (
   data: MessagesInfiniteData,
   messageIds: number[]
): MessagesInfiniteData => {
   const ids = new Set(messageIds);

   return {
      ...data,
      pages: data.pages.map((page) => ({
         ...page,
         data: page.data.filter((message) => !ids.has(message.id)),
      })),
   };
};
