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
