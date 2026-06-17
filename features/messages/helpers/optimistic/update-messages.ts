import {
   MessageResponseType,
   MessagesInfiniteData,
} from '../../types/messages.types';

export const updateMessages = (
   data: MessagesInfiniteData,
   updater: (message: MessageResponseType) => MessageResponseType | null
): MessagesInfiniteData => {
   return {
      ...data,
      pages: data.pages.map((page) => ({
         ...page,
         data: page.data.flatMap((message) => {
            const result = updater(message);

            return result ? [result] : [];
         }),
      })),
   };
};
