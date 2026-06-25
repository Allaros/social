import { InfiniteData, useInfiniteQuery } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { GetMembersToAddResponse } from '../types/chats.types';

type UseMembersToAddParams = {
   chatIdentifier: string;
   query?: string;
};

export const useGetMembersToAdd = ({
   chatIdentifier,
   query,
}: UseMembersToAddParams) => {
   return useInfiniteQuery<
      GetMembersToAddResponse,
      Error,
      InfiniteData<GetMembersToAddResponse>,
      (string | undefined)[],
      string | undefined
   >({
      queryKey: ['members-to-add', chatIdentifier, query],

      initialPageParam: undefined as string | undefined,

      queryFn: ({ pageParam }) =>
         chatsApi.getMembersToAdd({
            chatIdentifier,
            query,
            cursor: pageParam,
         }),

      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,

      enabled: !!chatIdentifier,
   });
};
