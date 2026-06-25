import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';

import { chatsApi } from '../api/chats';
import { chatsKeys } from '@/shared/lib/query-keys';
import { ChatParticipant, GetParticipantsResponse } from '../types/chats.types';

export const useParticipants = (chatIdentifier: string, limit = 10) => {
   const query = useInfiniteQuery<
      GetParticipantsResponse,
      Error,
      InfiniteData<GetParticipantsResponse>,
      ReturnType<typeof chatsKeys.participants>,
      string | undefined
   >({
      queryKey: chatsKeys.participants(chatIdentifier),
      queryFn: ({ pageParam }) =>
         chatsApi.getParticipants(chatIdentifier, {
            cursor: pageParam,
            limit,
         }),
      initialPageParam: undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      enabled: !!chatIdentifier,
   });

   const participants: ChatParticipant[] =
      query.data?.pages.flatMap((page) => page.data) ?? [];

   return {
      ...query,
      participants,
   };
};
