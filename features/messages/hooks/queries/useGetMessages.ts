import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { messagesApi } from '../../api/messages';
import { messagesKeys } from '@/shared/lib/query-keys';
import { GetMessagesParams } from '../../types/messages.request';
import { MessagesPage } from '../../types/messages.types';

export const useGetMessages = (
   chatIdentifier: string,
   params?: Omit<GetMessagesParams, 'cursor'>
) => {
   return useInfiniteQuery<
      MessagesPage,
      Error,
      InfiniteData<MessagesPage>,
      any,
      string | undefined
   >({
      queryKey: messagesKeys.list(chatIdentifier, params),

      queryFn: ({ pageParam }) =>
         messagesApi.getMessages(chatIdentifier, {
            ...params,
            cursor: pageParam,
         }),

      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

      enabled: !!chatIdentifier,
   });
};
