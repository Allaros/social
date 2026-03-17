import { api } from '@/shared/api/axios';
import { IDropdownSearch, IGetSearchResults } from '../types/request';

export const searchApi = {
   dropdownSearch: async (userData: IDropdownSearch, signal?: AbortSignal) => {
      const { data } = await api.get(`search/dropdown`, {
         params: { q: userData.query },
         signal,
      });
      return data;
   },

   searchResults: async (userData: IGetSearchResults, signal?: AbortSignal) => {
      const { data } = await api.get(`search`, {
         params: {
            q: userData.query,
            type: userData.type,
            limit: userData.limit,
            page: userData.page,
         },
         signal,
      });
      return data;
   },
};
