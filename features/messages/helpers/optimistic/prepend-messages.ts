import {
   MessageResponseType,
   MessagesInfiniteData,
} from '../../types/messages.types';

export const prependMessages = (
   data: MessagesInfiniteData,
   messages: MessageResponseType[]
): MessagesInfiniteData => {
   if (!data.pages.length) {
      return data;
   }

   return {
      ...data,
      pages: data.pages.map((page, index) =>
         index === 0
            ? {
                 ...page,
                 data: [...messages, ...page.data],
              }
            : page
      ),
   };
};
