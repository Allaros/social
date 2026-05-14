import { ProfileListItem } from '@/features/profile/types/profile.interface';

export type SearchSections = 'profiles' | 'posts';

export interface DropdownItem {
   id: number;
   type: 'profile' | 'post';
   primary: string;
   secondary: string;
   avatarUrl?: string;
}

export const sectionTitles: Record<SearchSections, string> = {
   profiles: 'Профили',
   posts: 'Посты',
};

export const sectionOrder: SearchSections[] = ['profiles', 'posts'];

export type DropdownSearchResponse = Record<SearchSections, DropdownItem[]>;

export interface GlobalSearchMap {
   profiles: ProfileListItem[];
}

export type GlobalSearchResponse = GlobalSearchMap;
