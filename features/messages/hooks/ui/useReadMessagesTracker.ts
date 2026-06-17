'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetReadMessages } from '../queries/useSetReadMessages';

type PendingReadState = {
   messageIds: number[];
   lastMessageId: number | null;
};

export const useReadMessagesTracker = ({
   chatIdentifier,
}: {
   chatIdentifier: string;
}) => {
   const { mutate } = useSetReadMessages(chatIdentifier);

   const pendingIdsRef = useRef(new Set<number>());

   const [pendingRead, setPendingRead] = useState<PendingReadState>({
      messageIds: [],
      lastMessageId: null,
   });

   const enqueue = useCallback((messageId: number) => {
      if (pendingIdsRef.current.has(messageId)) return;

      pendingIdsRef.current.add(messageId);

      setPendingRead((prev) => ({
         messageIds: Array.from(pendingIdsRef.current),
         lastMessageId:
            !prev.lastMessageId || messageId > prev.lastMessageId
               ? messageId
               : prev.lastMessageId,
      }));
   }, []);

   useEffect(() => {
      if (!pendingRead.messageIds.length || !pendingRead.lastMessageId) {
         return;
      }

      const timeout = setTimeout(() => {
         mutate(
            {
               messageIds: pendingRead.messageIds,
               lastMessageId:
                  pendingRead.lastMessageId ??
                  pendingRead.messageIds[pendingRead.messageIds.length - 1],
            },
            {
               onSuccess: () => {
                  pendingIdsRef.current.clear();

                  setPendingRead({
                     messageIds: [],
                     lastMessageId: null,
                  });
               },
            }
         );
      }, 700);

      return () => clearTimeout(timeout);
   }, [pendingRead, mutate]);

   return {
      enqueue,
   };
};
