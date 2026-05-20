import { useInfiniteQuery } from '@tanstack/react-query';
import { friendsApi } from '../api/friends';
import { RelationType } from '../types/friends.interface';

interface UseRelationsParams {
   type: RelationType;
   query?: string;
   limit?: number;
}

export const useRelations = ({
   type,
   query,
   limit = 20,
}: UseRelationsParams) => {
   return useInfiniteQuery({
      queryKey: ['relations', type, query],

      queryFn: ({ pageParam }) =>
         friendsApi.getRelations({
            type,
            query,
            limit,
            cursor: pageParam,
         }),

      initialPageParam: undefined as string | undefined,

      getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
   });
};
