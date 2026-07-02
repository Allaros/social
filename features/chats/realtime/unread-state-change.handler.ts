import { QueryClient } from '@tanstack/react-query';
import { UnreadChatsStateChangedType } from '../types/chats.types';
import { chatsKeys } from '@/shared/lib/query-keys';

export const handleUnreadStateChanged = (
   queryClient: QueryClient,
   payload: UnreadChatsStateChangedType
) => {
   console.log(payload);
   queryClient.setQueryData(
      chatsKeys.unreadState(),
      (
         old:
            | {
                 unreadChatsCount: number;
                 unreadMutedChatsCount: number;
              }
            | undefined
      ) => {
         if (!old) {
            return old;
         }

         return {
            unreadChatsCount:
               old.unreadChatsCount + payload.unreadChatsCountDelta,

            unreadMutedChatsCount:
               old.unreadMutedChatsCount + payload.unreadMutedChatsCountDelta,
         };
      }
   );
};
