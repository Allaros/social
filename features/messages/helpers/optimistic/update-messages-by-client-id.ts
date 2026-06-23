import {
   MessageResponseType,
   MessagesInfiniteData,
} from '../../types/messages.types';

export const updateMessagesByClientId = (
   data: MessagesInfiniteData,
   updaterMap: Map<
      string,
      (message: MessageResponseType) => MessageResponseType | null
   >
): MessagesInfiniteData => {
   return {
      ...data,
      pages: data.pages.map((page) => ({
         ...page,
         data: page.data.flatMap((message) => {
            const updater = message.clientId
               ? updaterMap.get(message.clientId)
               : undefined;

            if (!updater) {
               return [message];
            }

            const result = updater(message);

            return result ? [result] : [];
         }),
      })),
   };
};

export const patchMessageByClientId = (
   data: MessagesInfiniteData,
   clientId: string,
   patch: Partial<MessageResponseType>
) => {
   return updateMessagesByClientId(
      data,
      new Map([
         [
            clientId,
            (message) => ({
               ...message,
               ...patch,
            }),
         ],
      ])
   );
};
