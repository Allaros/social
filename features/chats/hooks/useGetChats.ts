import { useInfiniteQuery } from '@tanstack/react-query';
import { chatsApi } from '../api/chats';
import { GetMyChatsParams } from '../types/chats.request';
import { chatsKeys } from '@/shared/lib/query-keys';
import { useParams } from 'next/navigation';

export const useGetChats = (params?: Omit<GetMyChatsParams, 'cursor'>) => {
   const routeParams = useParams();
   const activeIdentifier = routeParams?.identifier as string | undefined;

   const mergedParams = {
      ...params,
      includedIdentifiers: activeIdentifier ?? undefined,
   };

   return useInfiniteQuery({
      queryKey: chatsKeys.list(mergedParams),
      queryFn: ({ pageParam }) =>
         chatsApi.getMyChats({
            ...mergedParams,
            cursor: pageParam,
         }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
   });
};
