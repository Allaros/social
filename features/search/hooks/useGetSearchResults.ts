import { useQuery } from '@tanstack/react-query';
import { IGetSearchResults } from '../types/request';
import { searchApi } from '../api/search';
import { searchKeys } from '@/shared/lib/query-keys';

export const useGetSearchResults = ({
   query,
   page,
   limit,
   type,
}: IGetSearchResults) => {
   return useQuery({
      queryKey: searchKeys.results({ limit, page, query, type }),
      queryFn: ({ signal }) =>
         searchApi.searchResults({ query, limit, page, type }, signal),
      staleTime: 60 * 1000,
      placeholderData: (prev) => prev,
   });
};
