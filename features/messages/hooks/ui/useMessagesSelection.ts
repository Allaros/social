import { useMemo, useState } from 'react';
import { MessageResponseType } from '../../types/messages.types';

export const useMessagesSelection = () => {
   const [selectedMessagesMap, setSelectedMessagesMap] = useState(
      () => new Map<number, MessageResponseType>()
   );

   const isSelectionMode = selectedMessagesMap.size > 0;

   const toggleSelection = (message: MessageResponseType) => {
      setSelectedMessagesMap((prev) => {
         const next = new Map(prev);

         if (next.has(message.id)) {
            next.delete(message.id);
         } else {
            next.set(message.id, message);
         }

         return next;
      });
   };

   const clearSelection = () => {
      setSelectedMessagesMap(new Map());
   };

   const selectedMessages = useMemo(
      () => Array.from(selectedMessagesMap.values()),
      [selectedMessagesMap]
   );

   const selectedMessageIds = useMemo(
      () => selectedMessages.map((message) => message.id),
      [selectedMessages]
   );

   const selectionCount = selectedMessagesMap.size;

   const isSelected = (messageId: number) => {
      return selectedMessagesMap.has(messageId);
   };

   return {
      selectedMessages,
      selectedMessageIds,
      selectionCount,
      isSelectionMode,

      isSelected,
      toggleSelection,
      clearSelection,
   };
};
