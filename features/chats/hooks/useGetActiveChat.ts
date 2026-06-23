import { chatsKeys } from '@/shared/lib/query-keys';
import { useQuery } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { ChatDetail } from '../types/chats.types';

export const useGetActiveChat = (identifier?: string | null) => {
   return useQuery<ChatDetail>({
      queryKey: chatsKeys.detail(identifier),
      queryFn: () => chatsApi.getActiveChat(identifier),
      enabled: !!identifier,
   });
};
