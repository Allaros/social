import { useQuery } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { UnreadChatsStateType } from '../types/chats.types';
import { chatsKeys } from '@/shared/lib/query-keys';

export const useUnreadState = () => {
   return useQuery<UnreadChatsStateType>({
      queryKey: chatsKeys.unreadState(),
      queryFn: chatsApi.getUnreadChatsState,
      staleTime: Infinity,
   });
};
