import { useQuery } from '@tanstack/react-query';
import { IGetSearchResults } from '../types/request';
import { searchApi } from '../api/search';

export const useGetSearchResults = ({
   query,
   page,
   limit,
   type,
}: IGetSearchResults) => {
   return useQuery({
      queryKey: ['search-results', query, type, page, limit],
      queryFn: ({ signal }) =>
         searchApi.searchResults({ query, limit, page, type }, signal),
      staleTime: 60 * 1000,
      placeholderData: (prev) => prev,
   });
};
