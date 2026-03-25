export type SearchSections = 'profiles';

export interface DropdownItem {
   id: number;
   type: 'profile';
   primary: string;
   secondary: string;
}

export const sectionTitles: Record<SearchSections, string> = {
   profiles: 'Профили',
};

export const sectionOrder: SearchSections[] = ['profiles'];

export type DropdownSearchResponse = Record<SearchSections, DropdownItem[]>;

export interface ProfileItemResponse {
   id: number;
   name: string;
   username: string;
   avatarUrl?: string;
   bio?: string;
}

export interface GlobalSearchMap {
   profiles: ProfileItemResponse[];
}

export type GlobalSearchResponse = GlobalSearchMap;
