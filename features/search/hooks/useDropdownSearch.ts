import { useQuery } from '@tanstack/react-query';
import { searchApi } from '../api/search';

export const useDropdownSearch = (query: string) => {
   const normalizedquery = query.trim();
   return useQuery({
      queryKey: ['dropdown-search', query],
      queryFn: ({ signal }) =>
         searchApi.dropdownSearch({ query: normalizedquery }, signal),
      enabled: query.trim().length >= 2,
      staleTime: 1000 * 30,
   });
};
