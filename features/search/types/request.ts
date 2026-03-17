import { SearchSections } from './responce';

export interface IDropdownSearch {
   query: string;
}

export interface IGetSearchResults {
   query: string;
   type: SearchSections;
   limit: number;
   page: number;
}
