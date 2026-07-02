import { useMemo } from 'react';
import {
   MessageResponseType,
   MessageStatusEnum,
} from '../../types/messages.types';

type UseMessagesListParams = {
   messages: MessageResponseType[];
};

export const useMessagesList = ({ messages }: UseMessagesListParams) => {
   const orderedMessages = useMemo(() => [...messages].reverse(), [messages]);

   const firstUnreadIndex = useMemo(() => {
      return orderedMessages.findIndex(
         (message) =>
            !message.isOwn && message.status === MessageStatusEnum.SENT
      );
   }, [orderedMessages]);

   const firstUnreadMessage = useMemo(() => {
      if (firstUnreadIndex === -1) {
         return null;
      }

      return orderedMessages[firstUnreadIndex];
   }, [orderedMessages, firstUnreadIndex]);

   const firstMessage = useMemo(
      () => orderedMessages[0] ?? null,
      [orderedMessages]
   );

   const lastMessage = useMemo(
      () => orderedMessages.at(-1) ?? null,
      [orderedMessages]
   );

   const getMessageById = useMemo(() => {
      const map = new Map<number, MessageResponseType>();

      for (const message of orderedMessages) {
         map.set(message.id, message);
      }

      return (id: number) => map.get(id) ?? null;
   }, [orderedMessages]);

   return {
      orderedMessages,

      firstUnreadIndex,
      firstUnreadMessage,

      firstMessage,
      lastMessage,

      getMessageById,
   };
};
